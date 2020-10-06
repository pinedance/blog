---
layout: post
title: "Vue에서 대용량 데이터 다루기"
categories: [코딩삽질기]
tags: ["vue", "javascript"]
---

## 들어가며

갈수록 데이터의 중요성이 커지고 있다. SPA(single page application)의 경우, 데이터를 정리하여 사용자에게 보여주는 목적으로 만들어 지기도 한다. 이런 경우에는 Vue project에서 많은 양의 데이터를 가져와 다루어야 한다.

그러나 이렇게 되면 메모리 사용량이 크게 증가하여 브라우저 속도를 저하시킬 수 있다. 어떻게 해야 할까? 이 글은 [대용량 데이터의 처리 방법과 성능 최적화 방법](https://kdydesign.github.io/2019/04/10/vuejs-performance.html#introduction)을 깊이 참조하였다.

## Vue의 감지 대상에서 제거하기

핵심은 대용량 데이터를 Vue의 감지 대상에서 제거하는 것이다. Vue는 데이터 변화를 감지하기 위해 선언된 데이터에 대해 `Observe`를 생성한다. ( 데이터에서 `__Ob__`를 확인해 보라. ) 데이터의 개수가 1만개라면 1만개에 해당하는 `__Ob__`가 선언되므로 그 양이 매우 방대해진다. 대용량 데이터를 감지 대상에서 해제하면 그만큼의 메모리를 절약할 수 있다.

### Object.freeze

어떻게 해야 하나. javasctipt에서 [데이터를 immutable하게](https://ko.wikipedia.org/wiki/%EB%B6%88%EB%B3%80%EA%B0%9D%EC%B2%B4) 만들어주는 [`Object.freeze()` 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)를 이용하면 Vue가 데이터에 `__Ob__`를 선언할 수 없게 된다.

만약 원격 서버로부터 ajax를 통해 데이터를 가지고 오는 것을 시작으로 한다면, 대략 다음과 같이 적용할 수 있다.

```html
<script>
    export default {
        data() {
            return {
                data1: [],
                data2: [],
                data3: [],
            }
        },
        /* ... */
        created() {
            const ajax1 = axios.get(data_url1)
            const ajax2 = axios.get(data_url2)
            const ajax3 = axios.get(data_url3)

            Promise.all([ajax1, ajax2, ajax3])
                .then((res) => {
                    this.data1 = Object.freeze(res[0].data)
                    this.data2 = Object.freeze(res[1].data)
                    this.data3 = Object.freeze(res[2].data)
                })
                .catch((errors) => {
                    alert("Failed to fetch app data !!!")
                })
        },
    }
</script>
```

### freeze & deepFreeze

`Object.freeze`는 shallow freeze이다. 즉, 속성값이 다시 객체로 되어 있을 때에, 그 하위 객체까지는 영향을 주지 않는다는 것이다. 따라서 위와 같이 처리했다고 해도 원래 데이터가 다음과 같다면 메모리 이슈를 해결할 수 없게 된다. `appdata`의 value가 object로 선언되어 있기 때문이다.

```js
var mydata = {
    src: "https//data-src.com",
    appdata: {
        title: "appdata",
        member: [
            { name: "name1", group: "a" },
            { name: "name2", group: "b" },
            /* ... */
            { name: "name10230", group: "d" },
        ],
    },
}

Object.freeze(mydata)

// Immutable!
mydata.src = "https//new-data-src.com" // false
console.log(mydata.src) // output: "https//data-src.com"

// Mutable!!!
mydata.appdata.member[0].name = "newname" // success
console.log(mydata.appdata.member[0].name) // output: "newname"
```

이런 경우에는 하위 단계까지 얼려 주어야 한다. 이를 위해서는 재귀함수를 만들어 적용시켜주어야 한다.

```html
<script>
    function deepFreeze(object) {
        // 객체에 정의된 속성명을 추출
        var propNames = Object.getOwnPropertyNames(object)
        // 스스로를 동결하기 전에 속성을 동결
        for (let name of propNames) {
            let value = object[name]
            object[name] =
                value && typeof value === "object" ? deepFreeze(value) : value
        }
        return Object.freeze(object)
    } // REF: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

    export default {
        data() {
            return {
                data1: [],
                data2: [],
                data3: [],
            }
        },
        /* ... */
        created() {
            const ajax1 = axios.get(data_url1)
            const ajax2 = axios.get(data_url2)
            const ajax3 = axios.get(data_url3)

            Promise.all([ajax1, ajax2, ajax3])
                .then((res) => {
                    this.data1 = deepFreeze(res[0].data)
                    this.data2 = deepFreeze(res[1].data)
                    this.data3 = deepFreeze(res[2].data)
                })
                .catch((errors) => {
                    alert("Failed to fetch app data !!!")
                })
        },
    }
</script>
```

### clone & deepClone

요약하면, 대용량 데이터가 Vue 내부로 들어가기 전에 immutable 하게 고정해 주면 Vue가 변화를 주시하지 못하게 되어 메모리를 절약할 수 있다.

그러나 이렇게 되면 데이터를 수정할 수 없게 된다. 새로운 속성값을 더한다든가 개체를 추가 삭제 할 때 문제가 된다. 이렇게 단순히 읽고 참조하는 용도 이외에 데이터의 값을 수정해야 할 때는 사본을 만들어 사용해야 한다. 이 때는 clone이라고 하는 특수한 방법을 사용해야 한다. 앞에서 deepFreeze에서 보았듯이 clone 역시 deep과 shallow의 문제가 존재하므로 정신건강을 위해 [lodash](https://lodash.com/)에서 제공하고 있는 [cloneDeep 함수](https://lodash.com/docs/4.17.15#cloneDeep)를 사용하자.

```javascript
import lodash from "lodash"

let tmp = this.data1.filter((x) => x.group == "a")
this.data_by_groupA = lodash.cloneDeep(tmp)
// re-freeze or delete after doing something
```

## Issue

이렇게 데이터를 immutable 하게 처리하여 Vue에서 관찰하지 않게 되면 data 변화에 따라 DOM을 변화시키는 Vue의 장점을 활용할 수 없게 된다. 또한 예기치 못한 에러들도 마주하게 된다. 따라서 어디까지 Immutable data를 적용할 것인지 잘 판단해야 한다.

## ETC

참고로 브라우저 메모리 상황을 보려면 Windows Chrome의 경우 `shift + Esc`를 누르면 된다.
