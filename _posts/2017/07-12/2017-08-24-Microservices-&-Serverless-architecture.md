---
layout: post
title:  "Microservices & Serverless architecture"
categories: 코딩삽질기
description: Microservices, Serverless architecture, AWS lambda, Google apps script
---

Microservices, Serverless architecture, AWS lambda, Google apps script

## ♬

웹을 활용하다 보면, 대부분 static하게 정해진 부분들이다. 그래서static page로 만들 여지가 생각보다 많다. 사용자의 요구에 반응해야 하는 경우라면 front end에서 javascript를 사용하여 이를 상당부분 충족시킬 수 있다. 

그러나 데이터와 연동하여 결과를 출력하는 경우에는 서버를 만들지 않을 수 없다. 물론 [firebase](https://firebase.google.com)나 [mlab](https://mlab.com/) 같은 서비스들을 이용하면 데이터와 관련된 부분도 모듈화 하여 front end만으로 서비스를 할 수 있다. 하지만 속도나 연산의 효율성 문제, 서비스의 목적에 따라 그렇게 하면 더 복잡해 지는 경우도 분명 존재한다. 

나 역시 사용자를 고려한 대규모 서비스를 만들기 보다는 단순하지만 반복적인 작업들을 함수로 만들고 이를 웹에 구현하여 필요할 때 쓰고자 하는 목적으로 개인 혹은 연구용 API를 만들어 사용하고 있다. 문제는 해당 함수의 단순함에 비해 유지해야할 서버 자원이 크고 또 관리하기도 귀찮다는 점이다. 게다가 linux machine의 library를 활용해야 하는 경우에는 버전 문제로 인해 서버를 분리해야 하는 문제도 생긴다. 

요컨대 물리적인 서버 자원은 낭비되고, 관리자는 그 나름대로 피곤하다는 것이다. 이런 문제는 최근 유행하고 있는 [docker](https://www.docker.com/)가 탄생한 배경 가운데 하나이기도 하다. 

## ♬

한편, 웹서버와 웹클라이언트 사이에 request, response는 function에서의 parameter와 return과 병치된다. 

따라서 이론적으로 서버에 종속된 기능이 아니라면 함수 단위로 따로 독립시켜 서비스로서 운용하면 서버를 만들 때 해당 기능을 다시 중복 개발하지 않고 `연결`해서 사용하면 된다. 일반 코딩에서 강조되는 [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)와 동일한 맥락이다. 이렇게 시스템을 구현하면 이른바 `Microservice`의 집합체가 된다. 


## ♬

microservice를 활용하자면 서버 자원이 더 비효율적으로 관리되는 모순에 직면하게 된다. 물론 microservice를 한 데 모아 큰 서버 안에서 돌릴 수도 있지만, 개발자와 사용자가 여려명이고 library 의존성 문제가 중요하다면 그렇게 하기 어려운 경우도 많다. 

이런 문제를 해결하기 위해 최근 관심 받고 있는 분야가 serverless이다. 해당 microservice들을 cloud에 올리되, 전통적인 방식처럼 OS를 설치하고 서버를 돌리는 것이 아니라 해당 회사가 이미 구현해 놓은 자원 위에 사용자는 코드만 올리는 형태이다. 사실상 서버를 만들고 관리하지 않고 코딩만 하면 되는 것이다. 

이렇게 microservice들을 연결해 backend 역할을 하게 하고 frontend에서는 통신을 통해 데이터를 가져와 사용할 수 있게 된다. cloud 운영회사에 따라 api가 달라 코드를 거기에 맞춰야 하는 문제가 있지만, 상당히 많은 자원을 절약할 수 있다. 

대표적인 서비스는 AWS lambda이고, Google apps script로도 비슷한 효과를 볼 수 있다. 이 두 서비스들은 최초에 각각 AWS 및 Google service를 자동화 하기 위해 만들어졌다고 한다. 하지만 곧 그 가능성이 확인되어 웹 환경을 변화시키고 있다. 


## ♬

[AWS lambda](https://aws.amazon.com/ko/lambda/details/)

* 소개 : AWS Lambda와 API Gateway를 통한 Serverless Architecture 특집 (윤석찬) :: AWS 월간 웨비나 [YOUTUBE](https://www.youtube.com/watch?v=pJNXS_BYEUU), [SLIDE](https://goo.gl/LMzDqv)
* Library : [Cloudia.js](https://claudiajs.com/), [Serverless.js](https://serverless.com/), [up](https://medium.freecodecamp.org/up-b3db1ca930ee)

[Google apps script](https://developers.google.com/apps-script/)

* [Google apps as a web app](https://developers.google.com/apps-script/guides/web)
* [생활코딩 강좌](https://opentutorials.org/course/67/3843)

