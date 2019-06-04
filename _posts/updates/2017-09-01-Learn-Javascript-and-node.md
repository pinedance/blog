---
layout: post
title:  "Javascript 배우기"
categories: 코딩삽질기
---

## 작업 환경

machine에 node를 바로 설치하기 보다는 버전 관리자를 통해 설치하는 편이 더 좋다. (특정 환경을 만들어 테스트 해야 하는 경우에는 docker를 사용하는 것도 좋다. )

node의 버전관리자로는 [nvm(Node Version Manager)](https://github.com/nvm-sh/nvm)이 있다. nvm은 아래와 같이 설치 스크립트를 내려 받아 설치할 수 있다.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

설치 후에 바로 `nvm`이라고 하면 명령을 인식하지 못한다. 작업 환경에 환경변수가 아직 갱신되지 않았기 때문이다. bash 창을 새로 열거나 `source ~/.bashrc`를 통해 환경변수를 갱신해 주어야 한다.

설치 후에 `nvm`을 쳐보면 대략적인 사용 방법을 알 수 있다.

만약 ssl 인증 문제로 `nvm` 설치 후 node를 설치할 수 없다면 아래와 같이 환경변수를 추가해 준 뒤에 실행시키면 해결할 수 있다.

```bash
export NVM_NODEJS_ORG_MIRROR=http://nodejs.org/dist
nvm install 10.15.3
```


## 자료 목록

Javascript를 더 깊이 사용하기 위해 도움이 되는 자료 목록을 정리해 둔다.


Javascript 배우기

* [eloquent javascript](http://eloquentjavascript.net/)

* [Top 10 ES6 features by example](https://blog.pragmatists.com/top-10-es6-features-by-example-80ac878794bb)


Cheatsheet : [Modern JavaScript Cheatsheet](https://github.com/mbeaudru/modern-js-cheatsheet/blob/master/readme.md), [ES2015+ cheatsheet](https://devhints.io/es6)


regular express : [regexly](https://regexly.chipto.io/)


Async

* [Await and Async Explained with Diagrams and Examples](http://nikgrozev.com/2017/10/01/async-await/)