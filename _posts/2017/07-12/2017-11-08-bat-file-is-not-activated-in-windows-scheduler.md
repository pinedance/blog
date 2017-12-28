---
layout: post
title:  "Windows Task Scheduler에서 BAT file이 실행되지 않는다면"
categories: 생활자동화
---

Windows에서는 예약기능을 자동으로 처리하기 위해 `Task Scheduler`라는 편리한 기능을 제공하고 있다. 윈도우에 설치되는 프로그램 가운데 예약기능이 있는 것들은 모두 이곳에 등록시켜 실행된다. 

주로 예약종료 같은 간단한 기능을 사용하지만, 조금 복잡한 기능을 이용할 경우에는 `.bat` file을 만들어 실행시키는 것이 편리하다. 

그런데 실행시킬 스크립트를 등록했는데 실행되지 않는 경우가 있다. 

만약 내가 실행시킬 스크립트가 `c:\user\mybatchfile.bat`라고 해보자. 

scheduler task 동작에서 `프로그램/스크립트`에 `c:\user\mybatchfile.bat`를 찾아 넣었을 때 동작하지 않았다면 

다음과 같이 바꾸어 넣어 보자. 

* 프로그램/스크립트 : `mybatchfile.bat`
* 시작 위치(옵션) : `c:\user`

자세한 과정은 [이 글](http://egloos.zum.com/skbronze/v/5313338)에 그림과 함께 설명되어 있다. 


