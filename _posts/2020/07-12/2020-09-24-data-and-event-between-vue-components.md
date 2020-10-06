---
layout: post
title: "Vue component 사이의 data 및 event의 전달"
categories: [코딩삽질기]
tags: ["vue", "javascript"]
---

## 들어가며

front-end framework인 [Vue](https://vuejs.org/)는 코드의 재사용성을 늘리고 대형 프로젝트를 수행할 수 있도록 component를 권장하고 있다. 즉, 기능을 하나의 component로 묶어 만들어 두었다가 블록처럼 필요한 곳에 끼워 넣어 사용하자는 것이다.

그러나 이렇게 되면 component 사이에 data나 event를 주고 받는 일을 고민해야 한다. 이 부분이 Vue를 사용하면서 가장 주의해야 하는 점 가운데 하나일 것이다. 여기에 대한 경험을 기록해 둔다.

## 잠깐! 대규모 프로젝트의 경우

대규모 프로젝트의 경우 [Vuex](https://vuex.vuejs.org/)를 사용하자.

아래는 기본 개념에 대한 것이다.

## Vue component 사이의 data 및 event의 전달

component(이하 `CP`) 사이에 data나 event 교환은 다음의 몇가지 종류가 있다.

1. 부모CP → 자식CP 데이터 : 부모 html에서 `v-bind` property로 입력하고, 자식에서 script에서 `props`로 선언해줌
2. 부모CP → 자식CP 이벤트 : 별도의 방법 없음. 데이터로 전달함
3. 자식CP → 부모CP 데이터 : 별도의 방법 없음. 이벤트로 전달함
4. 자식CP → 부모CP 이벤트 : 자식에서 emit으로 발생시키고, 부모 html에서 `v-on` property로 선언해줌
5. 형제CP → 형제CP 데이터 : event bus 사용
6. 형제CP → 형제CP 이벤트 : event bus 사용

1번, 4번, 5번, 6번의 경우가 전형적인 경우이다. 이 내용들은 Vue를 사용하려면 반드시 알아야 하는 개념이다. 글로 설명하려면 어렵기도 하고 기존에 정리된 자료들이 많으니 여기서는 생략하겠다. [Vue CLI 3으로 투두리스트 만들기](https://www.youtube.com/playlist?list=PLZzSdj89sCN1RJ6KYX_Vej-sCdcmAQprD)와 같은 동영상을 보시라.

2번, 3번의 경우도 종종 발생하지만 별도의 방법이 없다는 사실은 잘 설명되어 있지 않다. 이 글에서는 여기에 대해 기록해 둔다.

## 2. 부모CP → 자식CP 이벤트 전달

부모에서 자식으로 이벤트를 전달하기 위한 특별한 방법은 없다. 따라서 다음과 같은 우회적인 방법을 택해야 한다.

1. 부모CP에서 자식CP로 데이터 전달을 통해 event를 알려주기
2. 부모CP에서 자식CP의 method를 직접 호출하기

### 부모CP에서 자식CP로 데이터 전달을 통해 event를 알려주기

event라는 것이 결국은 어떤 사건의 발생을 알려주는 일이다. 따라서 부모CP에서 데이터를 변경시키고 이를 자식CP에 전달해 주면, 자식CP는 props를 통해 데이터를 공유하고 있다가 데이터의 변경 상태를 보고 event 발생을 알 수 있다. 이는 `부모CP → 자식CP 데이터` 전달 방법을 응용한 방식이다.

아래는 부모CP에서 ajax 통신이 끝난 event를 받아 자식CP에서 input box를 활성화시키는 예시이다. 예시에서는 편의를 위해 `watch`를 사용하였으나 새로운 데이터를 생성해야 하는 경우라면 `computed`를 사용할 수도 있다.

```html
<!-- Parent_Component.vue -->
<template>
    <ChildComponent :data="data" :dataReady="dataReady" />
</template>

<script>
    import ChildComponent from "../components/Child_Component.vue"

    export default {
        components: { ChildComponent },
        data() {
            return {
                data: null,
                dataReady: false,
            }
        },
        created() {
            axios
                .get("https://MY-DATA-URL/data.json")
                .then((res) => {
                    this.data = res.data
                    this.dataReady = true
                })
                .catch((err) => {
                    alert("Failed to fetch data")
                })
        },
    }
</script>
```

```html
<!-- Child_Component.vue -->
<script>
    export default {
        props: ["data", "dataReady"],
        watch: {
            dataReady() {
                if (this.dataReady) {
                    // do something
                }
            },
        },
    }
</script>
```

### 부모CP에서 자식CP의 method를 직접 호출하기

두 번째 방법은 부모CP에서 자식CP의 method를 직접 호출하는 방법이다. 이 방법은 잘 설명되어 있지 않은데, 알아 두면 유용하다. 자식 CP에 `ref` attribute를 설정하면 `this.$refs`로 해당 CP의 method를 호출할 수 있다. 자세한 것은 [공식문서](https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements)를 보자.

이 방법으로 위의 예시를 수행하는 코드를 짜보면 아래와 같다.

```html
<!-- Parent_Component.vue -->
<template>
    <ChildComponent ref="mychild" :data="data" />
</template>

<script>
    import ChildComponent from "../components/Child_Component.vue"

    export default {
        components: { ChildComponent },
        data() {
            return {
                data: null,
            }
        },
        created() {
            axios
                .get("https://MY-DATA-URL/data.json")
                .then((res) => {
                    this.data = res.data
                    this.$refs.mychild.doit()
                })
                .catch((err) => {
                    alert("Failed to fetch data")
                })
        },
    }
</script>
```

```html
<!--Child_Component.vue -->
<script>
    export default {
        props: ["data"],
        methods: {
            doit() {
                // do something
            },
        },
    }
</script>
```

## 3. 자식CP → 부모CP 데이터 전달

자시CP에서 부모CP로 데이터를 전달하려면 event에 데이터를 담아 전달하면 된다. 자식CP를 클릭 했을 때 부모 CP로 데이터를 전달한다고 하였을 때 아래와 같이 하면 된다.

```html
<!-- Parent_Component.vue -->
<template>
    <ChildComponent @goodnews="excute" />
</template>

<script>
    import ChildComponent from "../components/Child_Component.vue"

    export default {
        components: { ChildComponent },
        data() {
            return {
                dataFromChild: null,
            }
        },
        methods: {
            excute(data) {
                this.dataFromChild = data
            },
        },
    }
</script>
```

```html
<!-- Child_Component.vue -->
<tempate>
    <div>
        <input v-model="message" placeholder="여기를 수정해보세요" />
        <button @click="makeGoodNews"></button>
    </div>
</tempate>

<script>
    export default {
        data (){
            return {
                message: ""
            }
        }
        props: ["data", "dataReady"],
        methods: {
            makeGoodNews(){
                this.$emit( "goodnews", this.message )
            }
        }
    }
</script>
```

## 마치며

사실 이 글에서는 data와 event를 구분하고 있지만 크기 보면 데이터나 이벤트나 같은 것이다. 이벤트에 데이터를 담아 전달하면 데이터를 전달하는 일이 되고, 데이터를 전달하고 전달된 데이터에 따라 함수를 동작시키면 이벤트를 전달하는 일이 되기 때문이다.
