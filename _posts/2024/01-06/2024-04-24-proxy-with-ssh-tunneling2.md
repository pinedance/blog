---
layout: post
title:  "SSH tunneling을 통해 proxy 사용하기2"
categories: 코딩삽질기
tags: ['proxy', 'SSH']
---

## 배경

[지난 글]({{ site.baseurl }}/2023/12/14/proxy-with-ssh-tunneling)에서 SSH tunneling의 개념, SSH tunneling 연결하는 방법, 이를 바탕으로 internet browser에서 proxy를 설정하여 네트워크에 접속하는 방법에 대해 알아보았다.

이번에는 SSH tunneling을 이용하는 여러 가지 방법에 대해 알아보고자 한다. (여기에서는 `socks5` 프로토콜을 기준으로 설명한다)

## 일반적인 SSH tunneling 사용 방법

보통 2가지 단계를 거치게 된다. 첫번째 단계는 네트워크에서 SSH tunneling를 설정하는 단계이고, 두번째는 네트워크를 사용할 때 SSH tunneling으로 만들어진 Proxy 서버를 이용하여 연결하는 단계이다. 즉, Client와 Server 사이에 새로운 길을 만드는 것이 첫번째 단계이고, 네트워크를 이용할 때 새로 만들어진 길로 정보를 보내고 받는 것이 두번째 단계이다. 따라서 첫번째 단계는 네트워크 설정에 대한 문제이고 두번째 단계는 어플리케이션 사용에 대한 문제이다.

첫번째 단계에서는 주로 아래와 같은 명령어를 시스템 설정(`.bashrc`, `.bash_profile` 등)에 저장해 놓는다. 이렇게 하면 따로 챙길 필요 없이 bash 세션이 시작될 때마다 SSH tunneling이 연결된다.

```bash
# in ~/.bashrc or ~/.bash_profile
ssh -D 8282 -f -C -N username@my.remote-server.io -p 9292
```

이 단계에서 어려운 점은 연결을 임시로 설정하기 힘들다는 점이다. 좀더 유연하게 연결을 관리하고 싶을 때가 있다.

두번째 단계에서는 어플리케이션에서 네트워크를 이용할 때 proxy를 통해 연결하라고 알려주어야 한다. 예를 들어 curl을 이용한다고 한다면 `-x` 혹은 `--proxy` 옵션을 이용해서 다음과 같이 실행시켜 주어야 한다.

```bash
curl -x socks5h://localhost:8282 <Target URL>
# curl --proxy socks5h://localhost:8282 <Target URL>
```

이 단계에서 어려운 점은 사용하고자 하는 어플리케이션(프로그램)에 따라 proxy 설정 방법이 다르다는 점이다. 아예 proxy 설정을 지원하지 않는 경우도 있다.

## ［첫번째 단계］ SSH tunneling 관리 전용 프로그램

이제 각각의 단계를 더 편리하게 해 주는 방법을 알아보자. 먼저 첫번째 단계이다.

### autossh

autossh는 SSH 연결이 끊어질 때 자동으로 재연결을 시도하는 유틸리티입니다. `openssh`를 이용하면 접속 시간이나 네트워크 사용량에 따라 SSH tunneling 연결이 자동으로 끊어질 수 있다. 이 연결을 자동으로 유지해 주기 위해 SSH 서버의 설정을 바꾸어야 한다. 하지만 Client에서 `autossh`를 사용하면 SSH tunneling가 끊어졌을 때 자동으로 다시 연결해 준다.

```bash
# 설치
sudo apt-get install autossh
# 연결 및 proxy 설정
autossh -M 0 -o -f "ServerAliveInterval 30" -o "ServerAliveCountMax 3" -L 8282:localhost:9292 username@my.remote-server.io
# -o "ServerAliveInterval 30" : 30초마다 서버에 생존 확인 신호 보냄
# -o "ServerAliveCountMax 3" : 서버가 3번 연속으로 응답하지 않으면 연결을 종료하고 재연결 시도
# -L [로컬포트]:[로컬호스트]:[원격포트] : 로컬 포트 포워딩 설정
# -f : autossh를 백그라운드에서 실행하고자 할 때
# -i : SSH Key file 경로가 필요할 때
```

system service로 등록해 두면 아래와 같이 더 편리하게 이용할 수 있다. 방법은 [여기](https://blog.1day1.org/615)를 참고하라.

```bash
systemctl enable autossh
systemctl start autossh
systemctl stop autossh
```

자세한 사용 방법은 [autossh 공식 홈페이지](https://github.com/Autossh/autossh)를 참고하시라.

## ［두번째 단계］ Proxy 관리 전용 프로그램

`openssh`나 `autossh`를 이용하여 첫번째 단계를 자동화 해 두고 필요에 따라 proxy 연결을 사용하고 싶을 때도 있다. 이때 curl 같은 client 어플리케이션에서 매번 proxy 설정을 해야 한다. 하지만 사용하고자 하는 어플리케이션에서 proxy 연결을 지원하지 않거나 방법을 잘 모르겠다면 어떻게 해야 할까? bash script를 사용하여 여러 어플리케이션을 사용해야 하는 경우에는 어떻게 해야 할까?

어플리케이션 수준이 아니라 그 이전 수준에서 프록시 서버를 통해 모든 네트워크 연결을 전송한다면 문제가 단순해 진다. `tsocks`나 `proxychains`을 이용해 이를 수행할 수 있다.

### tsocks

현재 더이상 지원되지 않는 것 같아. 아래 proxychains을 사용하자.

```bash
# 설치
sudo apt-get install tsocks
```

`/etc/tsocks.conf` 파일을 다음과 같이 설정해 준다.

```bash
# nano /etc/tsocks.conf
server = localhost
server_port = 8282
server_type = 5 # SOCKS5
```

사용 방법은 아래와 같다. 특정 작업에서만 proxy를 사용하도록 해 준다.

```bash
tsocks curl <Target URL>
# 아래 방법과 동일한 효과를 가진다. (어플리케이션 수준에서 proxy 이용)
# curl --proxy socks5h://localhost:8282 <Target URL>
```

자세한 사용 방법은 [tsocks 공식 홈페이지](ttps://github.com/zouguangxian/tsocks)를 참고하시라.

### proxychains

proxychains도 tsocks와 비슷한 역할을 해 준다. 다만 proxychains는 여러 프록시를 통해 트래픽을 연쇄적으로 전송하는 __프록시 체인__을 지원해 준다. 여러 단계의 프록시 서버를 이용하면 익명성을 높일 수 있다. tsocks보다 더 다양한 기능을 지원하므로 고급 사용에 적합하다.

proxychains을 기반으로 proxychains4, [proxychains-ng](https://github.com/rofl0r/proxychains-ng) 등도 있다. 기능이 추가된 library인 듯하다.

```bash
# sudo apt-get install proxychains  # 3.x 버전만 지원한다. 아래 proxychains-ng를 사용하자. 
# sudo apt-get install proxychains4
sudo apt-get install proxychains-ng
```

`/etc/proxychains.conf` 파일을 다음과 같이 설정해 준다.

```bash
# sudo nano /etc/proxychains.conf
socks5 127.0.0.1 8282
```

사용 방법은 아래와 같다.

```bash
proxychains curl <Target URL>
# 아래 방법과 동일한 효과를 가진다. (어플리케이션 수준에서 proxy 이용)
# curl --proxy socks5h://localhost:8282 <Target URL>
```

자세한 사용 방법은 [proxychains 공식 홈페이지](https://github.com/haad/proxychains)를 참고하시라.

### Python PySocks

python 프로그램에서는 어떨까. `requests`와 같은 package에서는 자체적으로 proxy 설정이 가능하지만, proxy를 지원하지 않는 package도 있다. 이때는 `PySocks`를 이용하여 스크립트 안에서 일어나는 모든 네트워크 연결이 proxy 서버를 통하도록 설정할 수 있다.

```bash
# package 설치
pip install PySocks
```

```python
import socks
import socket
socks.set_default_proxy(socks.SOCKS5, "localhost", 8282)
# 사용자 인증이 필요한 경우
# socks.set_default_proxy(socks.SOCKS5, "localhost", 8282, username='사용자이름', password='비밀번호')
socket.socket = socks.socksocket
# ...
```

자세한 사용 방법은 [PySocks 공식 홈페이지](https://github.com/Anorov/PySocks)를 참고하시라.

## ［첫번째 + 두번째 단계］ 2가지 모두

첫번째와 두번째 단계를 한번에 설정하고 싶을 때도 있다. SSH tunneling를 연결하고 동시에 모든 네트워크 트래픽을 그쪽으로(proxy) 보내준다면 필요할 때마다 proxy 서버를 사용하는 효과를 거둘 수 있다. 물론 두번째 단계에서 사용하는 프로그램에 따라 proxy 설정을 신경쓸 필요도 없다.

### sshuttle

sshuttle은 SSH를 사용하여 트래픽을 터널링하는 도구로 클라이언트와 서버 사이에 VPN 같은 환경을 구성해준다.

```bash
# 설치
sudo apt-get install sshuttle
# SSH tunneling 연결 및 proxy 설정
sshuttle -r username@my.remote-server.io -e 'ssh -p 9292' 0.0.0.0/0
# local 네트워크의 모든 트레픽을 username@my.remote-server.io (9292 port)로 연결해줌
# -D (--daemon) : background에서 작동하게 할 때 
# curl <Target URL>
# 따로 proxy 설정을 할 필요가 없음
```

자세한 사용 방법은 [sshuttle 공식 문서](https://sshuttle.readthedocs.io/en/stable/)를 참고하시라.
