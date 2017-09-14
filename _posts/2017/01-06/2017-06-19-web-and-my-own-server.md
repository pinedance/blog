---
layout: post
title:  "Web 바다를 항해하기 위한 돋단배, 개인 Server"
categories: 코딩삽질기
---

> Digital Nomad의 시작, private cloud server 

Web은 정말 멋진 세계이다. 어떠한 진입장벽도 없이(?) 누구나 자신의 의견을 내 놓을 수 있고 다른 사람들의 의견을 볼 수 있다. 

Web이라는 바다를 더 자유롭게 항해하기 위해서는 Daum이나 Naver 등 Vendor들이 제공하는 서비스에 벗어나야 한다. 

그러기 위해서는 가장 좋은 첫걸음은 자기만의 Server를 운영하는 것이다. 

Cloud가 보편화 되어 물리 장치 없이도 개인이 서버를 운영하는 일이 쉬워졌다. 

문제는 소프트웨어다. ubuntu 등 linux 계열의 서버를 다루는 일은 쉽지 않다. 

일반적인 작업에서 가장 골치아픈 것은 library 의존성 문제이다. 새로 어플리케이션 B를 설치한다고 가정해 보자. 설치 중에 app B가 의존하고 있는 library의 버전이 낮아 업데이트를 해야 했다. app B는 정상적으로 작동된다. 그러나 이제 이미 설치되었던 app A가 오작동을 일으키기 시작한다. app A에게는 업데이트한 library가 너무 높은 버전이었던 것이다. 그래서 Windows에서 하던 대로 최신 버전의 library를 쓰자는 순진한 생각에 `apt-get upgrade`를 실행하면 큰 낭패를 볼 수 있다. 

무언가를 공식적으로 서비스하는 서버라면 처음 설치한 환경을 순결하게 그대로 유지하는 편이 가장 좋다.  실력이 충분하지 않은 상태라면, 내가 무엇을 하는지
 충분히 이해하지 못한 상태에서 blog 등의 글을 따라하기 쉽다. 그렇게 무언가 만지고 또 만지기를 반복하면 나중에 복구할 수 있는 길이 사라지게 된다. 

따라서 이상적으로는 DB, 기능별 app들을 모두 독립된 server에 module화 해서 만들고 이들을 서로 연결지어 전체 서비스 흐름을 완성하는 편이 좋다. 이 때 각각의 독립된 server 들은 해당 DB나 app에 필요한 최소한의 library들만 설치한다. 

그러나 이 역시 문제가 없는 것은 아니다. resource가 많은 만큼, 관리해 주어야 할 대상이 많아지게 된다. 

이런 문제들 때문에 DB를 위해서는 [firebase](https://www.firebase.com)나 [mLab](https://mlab.com/), app을 위해서는 [Heroku](https://www.heroku.com/)나 [Elasticbeanstalk](https://aws.amazon.com/ko/elasticbeanstalk) 등의 서비스가 나와 있다. 써 보면 확실히 편하다. 특히 mLab이나 Heroku 같은 경우에는 개발자의 need를 잘 파악한 서비스라고 생각한다. 다만 유료로 갔을 때는 유지비가 좀 든다. 

현재 나는 cloud server에 cloud9을 설치해 운영하고, 나머지 app 들은 [github page](https://pages.github.com/), [google apps script](https://www.google.com/script/start/), heroku test 버전 등 최대한 유지비가 들지 않는 방식으로 운영 중이다. 

github page는 static web page를 운영하는데 부족함이 없다. github page를 frontend로 삼고 firebase와 연결한다면 개인이 원하는 대부분의 작업을 할 수 있다. 더 복잡한 작업이 필요하다면 backend에 api server를 두고 ajax로 통신할 수도 있다. 

google app script는 간단한 node server를 운영하는 효과를 볼 수 있다. 물론 node library를 사용할 수 없다는 단점이 있다. 대신 google drive의 자원들을 연결할 수 있기 때문에 업무 자동화에 상당히 효과적인 툴을 만들 수 있다. 

heroku는 사용자에게는 git remote repo의 의미를 가지기 때문에 친숙하고 사용하기도 쉽다. deploy 하려면 git으로 push하면 끝이다. 필요하다면 remote server console에 접근도 가능하다. 단순하면서 자요도도 높다. 상당히 좋은 서비스이다. 불행히 cloud 치고는 사용료가 좀 비싸다. 무료 test server를 할당해 주는 것에 만족하고 있다. 

mLab은 mongoDB의 cloud 버전이다. mongoDB를 사용해 보았다면 어려움 없이 쓸 수 있다. remote DB에 접근할 수 있으면 시스템 구조를 훨씬 자유롭게 할 수 있다. 이 서비스 역시 편하지만 사용료는 좀 비싸다. 

