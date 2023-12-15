---
layout: post
title:  "ssh tunneling을 통해 proxy 사용하기"
categories: 코딩삽질기
tags: ['proxy', 'SSH']
---

## 배경

간혹 내부망에서 보안이나 기타 이유로 특정 사이트의 접속을 막아 놓는 경우가 있다. 물론 내부망 안에서 작업을 해야 한다면 정책을 따라야 하지만 부득이 회피해야 문제가 해결되는 경우가 있다. 

여기에서는 ssh tunneling을 이용해 proxy 서버 역할을 수행하게 하고, 브라우저에서 프록시 설정을 통해 접속하는 방법을 알아보자. 

## SSH tunneling 소개

SSH는 로컬 머신(L)에서 원격 서버(R)를 컨트롤 할 때 가장 많이 사용하는 통신 방법이다. 그런데 만약 원격 서버(R) 뒤에 DB 서버(D) 등 다른 서버가 존재한다고 해보자. 그런데 이 DB 서버(D)는 보안상의 이유로 원격 서버(R)에만 연결되어 있고 다른 외부 연결은 모두 막혀 있다고 해보자. 이는 매우 일반적인 상황이다. 그렇다면 관리자는 로컬 머신에서 어떻게 DB 서버를 관리할 수 있을까?

이런 문제를 해결하기 위해 SSH에서는 tunneling이라는 방안을 마련해 두었다. 즉, 원격 서버(R)에서 DB 서버(D)로 이어진 길을 통해 로컬 머신(L)의 연결을 보내주는 것이다. 이렇게 하면 DB 서버(D)를 외부 네트워크에 노출하지 않고도 관리할 수 있다. 

SSH tunneling에는 Local Forwarding, Remote Forwarding, Dynamic port forwarding 방식 등이 있다. Local Forwarding과 Remote Forwarding은 port를 고정해야 하므로 proxy로 사용하기 위해서는 Dynamic port forwarding 방식을 이용해야 한다.  

더 자세한 사항은 [여기](https://www.ssh.com/academy/ssh/tunneling), [여기](https://www.ssh.com/academy/ssh/tunneling-example), [여기](https://hbase.tistory.com/328)를 참고하자. 

## 방법

### 원격 서버(SSH 서버) 마련하기 

SSH tunneling를 이용하기 위해서는 당연히 SSH로 연결된 원격 서버가 필요하다. 서버라고는 하지만 내부망 밖에 위치한 컴퓨터이다. 우리는 그 원격 서버를 중계자 삼아 네트워크 통신을 할 예정이다. 

### 로컬 머신(SSH 클라이언트) 셋팅하기 

브라우저를 열어 웹서핑을 할 내 앞의 컴퓨터가 곧 로컬 머신이다. 이 컴퓨터에서는 당연히 SSH를 통해 앞에서 마련해 두었던 원격 서버에 접속할 수 있어야 한다. 

만약 로컬 머신에서 아래와 같은 명령을 통해 원격 서버로 접속할 수 있다고 해보자. 

```bash
ssh username@my.remote-server.io -p 8282
```

Dynamic port forwarding을 이용하려면 위의 연결 명령어를 아래와 같이 바꿔준다. 

```bash
ssh -D 8282 -f -C -N username@my.remote-server.io -p 8282
```

이제 로컬 머신에서 원격 서버로 SSH tunneling이 만들어졌다. 

이제 로컬 머신에서 `127.0.0.1:8282`로 연결되는 통신은 SSH tunneling을 통해 원격 서버로 연결되게 된다. 

### 웹브라우저 설정하기

웹브라우저에서 proxy 기능을 이용하기 위해서는 웹브라우저 설정에서 proxy 설정이 가능해야 한다. 그러나 크롬 등 크로미움 기반의 웹브라우저에서는 proxy 설정을 단독으로 할 수 없고 OS 설정을 따르도록 되어 있다. 만약 OS 차원에서 proxy를 구성해 준다면 웹브라우저 뿐만 아니라 OS에서 동작하는 모든 네트워크가 proxy 설정의 영향을 받는다. 

다행히 웹브라우저 설정에서 proxy 설정이 가능한 웹브라우저가 있다. [firefox](https://www.mozilla.org/en-US/firefox/new/)이다. 로컬 머신에 firefox 웹브라우저를 설치해 준 뒤에 firefox 브라우저 설정으로 이동해 proxy를 설정해 주자.

설정은 매우 간단하다 
* `firefox 설정 > 네트워크 > 인터넷 프록시`(Configure Proxy Access to the Internet)로 찾아간다. 
* `수동 프록시 설정`을 선택하고 다음과 같이 설정한다.
  - SOCKS 호스트에 `127.0.0.1` 입력
  - 포트에 `8282`를 입력
  - `SOCKS_v5`를 선택

이제 firefox 브라우저에서는 다음과 같이 연결이 이루어진다. 

```
# Request to www.google.com 
→ local machine / firefox web browser
→ local machine / ssh client (127.0.0.1:8282)
→ SSH tunneling (SSH tunneling)
→ remote server / ssh server
→ www.google.com 

# Response from www.google.com 
→ www.google.com 
→ remote server / ssh server
→ SSH tunneling (SSH tunneling)
→ local machine / ssh client (127.0.0.1:8282)
→ local machine / firefox web browser
```

[이 글](https://www.lesstif.com/software-architect/ssh-port-forwarding-proxy-100205379.html)에 그림과 함께 설명되어 있으므로 참고하자. 

## REF

* [SSH Tunneling](https://www.ssh.com/academy/ssh/tunneling)
* [SSH Tunneling: Examples, Command, Server Config](https://www.ssh.com/academy/ssh/tunneling-example)
* [A6K 개발노트 / SSH tunneling](https://hbase.tistory.com/328)
* [ssh 로 포트 포워딩(port forwarding)해서 Proxy 서버로 사용하기](https://www.lesstif.com/software-architect/ssh-port-forwarding-proxy-100205379.html)
