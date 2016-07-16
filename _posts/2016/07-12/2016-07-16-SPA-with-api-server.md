---
layout: post
title:  "angularjs의 CORS issue와 client side에서 file donwload"
categories: 코딩삽질기
---

인생은 삽질이다. 코딩도 삽질이다. `(주인장)` 
==================================

Background
--------------

나중에 간단한 app들을 만들어 사용할 목적으로 web service를 기획할 때 API를 만들어 두었다. 이번에 이 API를 이용하여 server에 있는 데이터를 다운로드 받을 수 있는 간단한 single page app을 만들어 보기로 했다. 

single page app은 [angularjs 1.5x](https://www.angularjs.org/) 를 사용했고, ajax에는 angularjs의 [`$http` service](https://docs.angularjs.org/api/ng/service/$http)를 이용했다.

디자인까지 하루 이틀이면 될 것 같았는데, 의외의 복병을 만나 4일이나 소요되었다. 

삽질의 결과물은 [한의학고전DB 고의서 원문 배포 서비스](https://kmongoing.github.io/apps/dist-texts/app.html)이다.

Mission 
---------

API Server에서 json 형식의 데이터를 가져와 client side에서 정리하고 txt file로 다운로드 하는 web app을 만들어자. 

TASK
------

이 작업에서 크게 발목을 잡은 것은 CORS issue와 file download 부분이었다. 

### Ajax로 데이터를 Server에서 가져오라

#### 삽질 : CORS issue를 처리하라

CORS issue는 전부터 알고 있었던 일이고, 이미 server side에 이 문제가 일어나지 않토록 `Access-Control-Allow-Origin` header를 이미 설정해 둔 상태였다. ( CORS issue에 대해서는 [CORS 크로스 도메인 이슈](http://ooz.co.kr/232)를 참고하시라)

그런데, 다시 CORS issue가 발생하였다. 

```js
// console에 뜨는 CORS 오류 메시지
XMLHttpRequest cannot load http://localhost:5000. 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
Origin 'https://my.server.org/api' is therefore not allowed access.
```

더 이해할 수 없었던 점은 OPTIONS(method)에서는 문제가 없었는데 이어지는 GET에서만 문제가 발생했다는 것이다. 

이번에 알게된 사실인데, ajax로 GET을 요청하더라도 그 전에 OPTIONS를 보내 서버 상태를 확인한다고 한다. GET만 실행 시켜도 사실상 OPTIONS와 GET 2번의 요청을 server에 보내게 된다는 뜻이다. 

CORS issue가 발생한다면 둘 다 발생해야 할 것 같은데, OPTIONS에서는 발생하지 않고 GET에서만 발생했다. 

서버 관리자에게 문의해 봤지만, server 문제가 아니었기 때문에 해결책을 찾지 못했다. 

답답해서 ajax 부분만 jquery로 바꾸어 봤더니 잘 되는 것이 아닌가. 

이건 뭔가 angularjs `$http` service 자체의 문제가 아닌가 싶었다. 하지만 원인과 해결책은 여전히 알 수 없었다. 

구글신께 문의하고 코드를 바꾸고 테스트 하기를 3일. 드디어 원인을 알 수 있었다. 

angularjs `$http` service는 header에 Content-type을 지정해 놓아도 `data`를 전송하지 않으면 요청할 때 header의 Content-type를 전송하지 않는다고 한다. 

GET method를 사용했기 때문에 data를 따로 지정해 두지 않았는데, 이런 정책 때문에 Content-type이 server에 전송되지 않았고, 서버에서는 올바른 header를 실어 응답하지 못했던 것이다. ( 참고 : [Content-Type header not being set with Angular $http](http://stackoverflow.com/a/24896363))

해결 방법은 매우 간단했다. `$http` service에 `{'data': ""}`라는 값을 추가했을 뿐이다. 

```js
var conf = {
	headers : {
		"Authorization": "************************",
		"Content-Type": "application/json"
	},
	data: "" // 이게 없으면 Content-Type이 설정되지 않음
}

$http.get("https://my.server.org/api", conf ).then( successCallbackFunction, failCallbackFunction )
```

### client side(browser)에서 file을 만들어 local machine에 download 하라

#### 삽질 : download attribute 호환성

보통은 server에서 file을 전달받아 local에 download 하지만, 가끔씩 client side에서 생성한 데이터를 local로 바로 download 시켜야 하는 경우가 있다. 

브라우저에서 이런 기능을 제공하지는 않기 때문에 다음과 같이 편법으로 `<a href="...." download="donwload.txt">` element를 임시로 생성해 클릭하고 다시 없애는 방식을 택한다. (참고 : [Javascript: Create and save file](http://stackoverflow.com/a/30832210))

이것을 function으로 표현하면 아래와 같다. 

```js
function downloadTxt(content, filename){
	let blob = new Blob([content], { type:"text;charset=utf-8;" });
	let address = (window.URL || window.webkitURL).createObjectURL( blob );
	let a = angular.element("<a>").attr("href", address).attr("download", filename).appendTo("body");
	a[0].click();
	a.remove();
}
```

주로 chrome을 선호하기 때문에 문제 없이 수행할 수 있었다. 

그런데 문득 IE(internet explorer)에서는 잘 될까 확인해 보고 싶어졌다. 최근 IE도 좋아졌기 때문에 문제가 없겠지 싶었지만, 불길한 예감은 적중하는 법인가, error가 생겨 download되지 않았다. 

구글신께 문의해 보니, IE는 `<a>`의 `download` attribute를 허용하지 않는다고 한다.(Safari도 안된단다) 즉, 임시 element를 생성하고 click까지는 되지만, download attribute를 인식하지 않기 때문에 다운로드 되지 않는 것이다.


| Feature | Chrome | Firefox (Gecko)	| Internet Explorer | Opera | Safari|
|:---------:|:----------:|:-----------:|:------------:|:--------:|:-------:|
| download | 14 | 20.0 (20.0) | Edge 13 | 15 | No support |

출처 : [The HTML Anchor Element `<a>`](https://developer.mozilla.org/en/docs/Web/HTML/Element/a)

이 문제는 간단히 해결할 수 없을 것 같아 외부 library를 사용하기로 했다. 찾아보니 어떤 훌륭한 분께서 이런 문제를 아시고 [FileSaver.js](https://github.com/eligrey/FileSaver.js)라는 library를 만들어 두셨다. 감사감사. 

FileSaver.js 설명이다. 

> Saving generated files on the client-side

위의 코드에 FileSaver.js를 적용하면 다음과 같이 된다

```js
function downloadTxt(content, filename){
	let blob = new Blob([content], { type:"text;charset=utf-8;" });
	saveAs(blob, filename)
}
```

FileSaver에 대한 post도 있다. [Saving generated files on the client-side](https://developers.google.com/web/updates/2011/08/Saving-generated-files-on-the-client-side)


참고
-----

### angularjs에 FileSaver.js 적용하기

FileSaver를 angularjs에서 바로 호출해도 되지만, angularjs 내로 가져다 쓰는 방법이 더 좋겠다. 다음과 같이 FileSaver module을 만들어 준 다음에 MyApp module에 include 시켜주자.

```js
// assumes FileSaver.js has already been loaded on the page
angular.module('FileSaver', []).factory('saveAs', ['$window', function($window) {
  return $window.saveAs; 
}]);

angular.module("MyApp", ['FileSaver'])
// ...
```


### file의 용량이 클 때 

browser가 허용하는 용량 이상, 메모리가 작은 경우 file system을 이용한 [StreamSaver.js](https://github.com/jimmywarting/StreamSaver.js)을 활용할 수 있다고 한다. 사용해 보지 않아 자세한 내용은 모르겠다.
