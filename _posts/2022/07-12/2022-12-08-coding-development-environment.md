---
layout: post
title:  "코딩 개발 환경 갖추기 feat OS, SSH, Tools"
categories: 코딩삽질기
tags: ['Ubuntu', 'Linux', 'vscode', 'WSL']
---

## 배경

코딩을 하려고 할 때 의외의 복병은 개발 환경을 갖추는 일이다. 경험을 바탕으로 여기에 대해 대략적으로 정리해 본다.

## OS on your machine

### 리눅스 Linux

Linux는 현대 OS의 시조이다. 개발 도구를 만드는 입장에서 가장 먼저 고려하는 OS이다. 개인용 PC에서는 비중이 작지만 서버는 대부분 Linux를 OS로 사용하기 때문에 각종 프로그래밍 언어 및 개발 도구들은 리눅스를 우선 고려한다. 그러므로 개발 도구들 가운데 Windows용이나 Mac용 설치 버전이 없는 경우는 있지만 Linux용 설치 버전이 없는 경우는 거의 없다. 따라서 개발 환경에 가장 적합한 OS라고 할 수 있다.

하지만 개인 개발자의 입장에서 Ubuntu와 같은 Linux 배포판을 메인 컴퓨터의 OS로 사용하기는 쉽지 않다. 윈도우나 맥에서 자동으로 관리해주는 기능들을 사용자가 수동으로 해야 하는 일이 많다. 시스텝 업데이트를 했다가 기존에 사용하던 앱들이 작동하지 않는 경우도 생겨날 수 있다. 이렇게 개발 환경을 구축하기에는 좋지만 시스템을 관리해야 하는 어려움도 뒤따른다. 개인 PC에 리눅스를 설치하고 개발 환경을 구축하라고 권하기 어려운 까닭이다.

### 맥 Mac OS

개발 환경으로 사용하기 가장 좋은 OS라고 생각한다. OS 자체의 관리도 편리하고 Linux와 유사하기 때문에 개발 도구들도 예상 밖의 에러를 발생시키지 않는다. 때문에 해외 개발자들은 Mac을 가장 많이 사용한다. 하지만 우리나라에서 Mac을 메인 PC의 OS로 사용하려면 여러가지 불편함을 감수해야 한다. 한국에서 만들어진 웹과 앱은 주로 윈도우 환경을 상정하고 있기 때문이다. 따라서 최소한 1대의 윈도우 PC를 가지고 있을 수 밖에 없다. 만약 당신이 별도의 윈도우 머신이 있고 주머니 사정이 넉넉하다면 맥을 구입해서 개발 머신으로 사용하는 방법이 가장 좋다.

### 윈도우 Windows

윈도우. 업무용 PC의 OS로서 윈도우는 매우 만족스럽다. 엑셀과 같은 아름다운 앱도 존재한다. 그리고 한국에서 일처리를 하려면 윈도우가 있어야 한다! 하지만 개발 환경 OS로는 권장하지 않는다. 한글을 사용하는 우리나라의 경우, 알파벳이 아닌 한글은 때때로 여러가지 에러를 야기할 수 있다. 윈도우는 UTF-8 기반의 시스템이 아니기 때문이다. 이런 문제는 시스템 레벨, 앱 레벨, 라이브러리 레벨 등 다양한 층차에서 일어날 수 있기 때문에 당신의 정신 건강에 좋지 않은 영향을 미칠 수 있다. 게다가 이런 문제들은 영미권 사용자들에게 문제가 되지 않기 때문에 검색을 해도 해결 방법이 잘 나오지 않는다. 이런 경험 때문에 나는 기본적으로 윈도우용 개발 도구들은 거의 사용하지 않는다.

### WSL on Windows

개발자들이 윈도우를 떠나는 현상을 마이크로소프트 회사에서도 인지한 모양이다. 몇 해 전부터 WSL이라는 서브 시스템을 제공하고 있다. 즉, 윈도우OS에 독립적으로 돌아가는 Linux 시스템을 제공하고 있다. 윈도우에서 WSL을 사용하는 방법은 [공식문서](https://learn.microsoft.com/ko-kr/windows/wsl/install)를 참고하자. 이렇게 이제 윈도우에서 WSL(리눅스)를 설치하고, WSL에 리눅스용 개발 환경을 구축하면 윈도우에서도 리눅스에서처럼 개발을 진행할 수 있다.

문제라면 사실상 OS가 2가지 돌아가고 있는 형국이기 때문에 시스템 자원을 많이 필요로 한다는 점이다. 특히 WSL2의 경우 시스템 자원을 매우 많이 사용하기 때문에 저전력 노트북과 같은 머신에서는 사용하기 쉽지 않다. CPU 성능과 RAM이 넉넉한 데스크톱 머신을 사용한다면 윈도우에 WSL을 설치하여 개발을 진행하는 방법을 추천한다.

### 정리

개발 환경을 구축할 머신의 OS에 대해 적어 보았다. 이상의 내용을 정리해 보자.

* 시스템 관리 능력이 있다 => Ubuntu와 같은 Linux 배포판
* 시스템 관리 능력이 없다 => 별도의 업무용 윈도우 머신이 있고 주머니 사정이 좋다 => Mac
* 윈도우 머신이 있어야 한다. => 시스템 사양이 좋은 PC를 사용하고 있다. => WSL on Windows
* 윈도우 머신이 있어야 한다. => 시스템 사양이 어중간한 PC를 사용하고 있다. => .... 아래 글을 더 읽자.

한국에 사는 일반적인 유저는 대부분 마지막 경우에 해당한다. 그러면 어떻게 해야 할까. 2가지 선택지가 있다. PC 스팩을 높혀 3번째 경우로 올라가는 방법, 그리고 시스템 관리 능력을 배양하여 외부에 개발 서버를 하나 만들어 두는 방법이다. 당신이 꾸준히 코딩을 해 나갈 생각이라면 후자를 권장한다. 이유는 다음과 같다.

* 윈도우를 버리지 않는 한 별도의 시스템이 불가피하다. 같은 로컬 머신에서 동작하는 WSL이든, 별도의 머신에서 동작하는 외부 개발 서버든.
* 개발 환경 설치든, 코딩이든 모두 기본적으로 OS 시스템 위에서 동작한다. 따라서 처음에는 몰라도 되지만 언젠가는 리눅스 시스템에 대해 어느 정도 알아야 한다.
* 딥러닝 같은 작업을 하지 않는 이상 개발 환경의 머신 스팩은 그다지 높지 않아도 좋다. 그러므로 고사양 PC에 윈도우와 WSL을 설치하여 사용하는 것보다 작업용 PC(어중간한 스팩) + 개발 서버(낮은 성능의 Linux 머신)를 사용하는 편이 가성비가 더 좋다.

## 개발 도구 Dev Tools

여기에서는 앞에서 설명한 마지막 경우, 즉 작업용 PC(어중간한 스팩) + 개발 서버(낮은 성능의 Linux 머신)를 사용에 대해 적어보겠다.

예를 들어 당신이 대학생이고 메인 PC로 휴대가 간편한 저전력 노트북에 윈도우를 설치하여 사용하고 있다고 가정해 보자. 당신 집에는 인터넷이 가능하고, 당신은 공유기를 통해 집의 내부 네트워크 설정을 어느정도 할 수 있다. 이제 저전력 CPU가 달린 작은 컴퓨터(개발 서버)를 구입한 뒤 이를 집 공유기에 LAN선으로 연결하자. 윈도우를 기준으로 사양을 생각하지 말자. Ubuntu 특히 서버용 Ubuntu는 더 적은 사양으로도 충분한 성능을 낼 수 있다. 예를 들어 고성능 연산이 필요하지 않은 개인 개발자라면 [Dell Wyse 5060](https://icecat.biz/en/p/dell+wyse/tm60v/thin+clients-5397063950515-5060-35611540.html) 정도의 사양으로도 시작할 수 있다.

아래와 같은 모양으로 개발은 진행된다.

```
메인 PC ( 학교? 카페? 어디든 이동 가능 )
  ↑↓ 외부 네트워크 SSH
공유기 (집, 고정)
  ↑↓ 내부 네트워크 SSH
개발 서버 (집, 고정)
```

### 메인 PC (저전력 노트북)

당신은 이 PC를 이용해 코딩을 할 것이다. 인터넷이 연결되어 있는 한 어디에서든 개발이 가능하다. 당신이 해야할 일은 그저 이 컴퓨터에 [VS Code](https://code.visualstudio.com/)를 설치하는 일이다.

### 개발 서버 (저사양 PC)

메인 PC에서 SSH를 이용하여 이 개발 서버에 접속하여 코딩을 해 나갈 것이다. Ubuntu와 같은 Linux 배포한을 설치하자. 특별한 일이 없다면 Server용 버전을 설치하자. 용량이 작고 자원을 더 적게 필요로하기 때문이다. OS를 설치하면 SSH가 자동으로 설치되지만, 설치되지 않았다면 SSH Server를 설치하자. 방법은 [이 글](https://codechacha.com/ko/ubuntu-install-openssh/)을 참고하자.

### 공유기

외부에서 들어오는 SSH 통신을 내부 네트워크로 연결해 주어야 한다. 공유기의 포트포워딩 기능을 이용하자.

### 다시 메인 PC

이제 SSH를 통해 메인 PC에서 집에 있는 개발 서버에 접근해 보자. 대부분의 기능은 VS Code에서 제공하고 있으므로 [공식 문서](https://code.visualstudio.com/docs/remote/ssh)와 [이 글]({{ site.baseurl }}/2020/09/30/vscode)을 참고하자. 막막하다고 느껴진다면 좀 길지만 공식 문서를 천천히 읽어보기를 권장한다. 그만한 가치가 있다.

## Good Luck

사실 설명이 좀 불친절했다. 어느 정도의 삽질력(삽질 경험)이 있어야 이해할 수 있는 글이다. 하지만 자세히 설명하려면 하나하나 적지 않은 분량이기 때문에 오늘은 이정도로 하려고 한다. 나이가 들어 뒷힘이 딸린다. 이 글을 읽는 이들에게 행운이 함께하기를.
