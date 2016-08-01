---
layout: post
title:  "Safari는 아직 let을 지원하지 않는다~!!!"
categories: 코딩삽질기
---

> Safari는 아직 `let`을 지원하지 않는다~!!! (주인장)

최근 간단한 SPA(single page app)를 만들었는데, 아이패드에서 정상적으로 작동하지 않았다. 이상하다 싶어 맥으로 콘솔을 열어 보니 변수가 선언되지 않았다는 에러를 볼 수 있었다. 

최근 ES6에서 도입된 `let`이 문제였다. 

아직 Safari는 이 키워드를 지원하지 않았던 것이다. scope이 명료해서 사용했던 것이 화근. IE도 지원해서 방심했는데, Safari가 지원하지 않았을 줄이야....

결국 `let`을 `var`로 바꾼 뒤에야 문제를 해결할 수 있었다. 

`let` 브라우저 호환성 (2016년 8월 1일 현재)

![Desktop]({{ site.url }}/assets/img/2016-08-01/desktop.png)
![Mobile]({{ site.url }}/assets/img/2016-08-01/mobile.png)
※ 출처 : mozilla developer network

자세한 내용은 다음을 참고하자. 

* [let / mozilla developer network](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let)
* [const / mozilla developer network](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/const)

그러나 const는 지원한다고 한다.