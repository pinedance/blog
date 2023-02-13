---
layout: post
title:  "SSH로 서버의 파일을 관리해보자 (feat SSH, SFTP, winSCP, SSHFS, networkdrive)"
categories: [코딩삽질기]
tags: ['SSH', 'SFTP', 'winSCP', 'SSHFS', 'networkdrive']
---

## 배경

현재 일터에서 동료들 사이에 파일을 공유하기 위해 리눅스 서버를 운영 중이다. 처음에는 이 서버에 [CMS(Content management system)](https://en.wikipedia.org/wiki/Content_management_system)를 설치해서 사용했었는데 관리에 여러가지 어려움이 있었다. 시행착오 끝에 [samba file server](https://ubuntu.com/server/docs/samba-file-server)를 설치하고, 작업자 컴퓨터의 원도우OS에서 [네트워크-드라이브](https://support.microsoft.com/ko-kr/windows/windows%EC%97%90%EC%84%9C-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EB%93%9C%EB%9D%BC%EC%9D%B4%EB%B8%8C-%EC%97%B0%EA%B2%B0-29ce55d1-34e3-a7e2-4801-131475f9557d)를 생성하여 각자의 로컬 컴퓨터에서 파일을 관리하는 방식으로 사용하게 되었다. 이렇게 하면 로컬 컴퓨터에서 서버의 파일을 마치 자기 컴퓨터에 있는 것처럼 사용할 수 있다. 설정과 사용 방법은 [Ubuntu 20.04 에 Samba 설치하여 Windows에서 연결하기](https://devji.tistory.com/entry/Ubuntu-2004-%EC%97%90-Samba-%EC%84%A4%EC%B9%98%ED%95%98%EC%97%AC-Windows%EC%97%90%EC%84%9C-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0)를 참고하자. 

하지만 여기에도 문제가 있다. 먼저 파일을 삭제하거나 수정하고 나면 복구할 수 없기 때문에 작업자가 소수이고 서로 신뢰할 수 있어야만 가능한 방식이다. 또 다른 문제는 samba가 보안에 취약하다는 점이다. 로컬 컴퓨터가 [랜섬웨어](https://ko.wikipedia.org/wiki/%EB%9E%9C%EC%84%AC%EC%9B%A8%EC%96%B4)에 감염되었을 경우 로컬 컴퓨터 뿐만 아니라 samba로 연결된 네트워크의 모든 저장소에 문제가 생길 수 있다. 우리에게 후자가 큰 이슈로 부각되었다. 이에 우리는 다른 방법을 찾아보기로 했다. 

## 방법

파일을 다루는 방법으로 ftp, sftp 등의 선택지가 있다. 보안 문제를 고려해야 하므로 sftp가 더 유리하다. 이에 여기에서는 리눅스 서버에 sftp 서버를 가동시키고, 작업자의 로컬 컴퓨터에서 sftp 클라이언트를 이용하거나 네트워크-드라이브를 통해 연결하는 방법을 대략 설명하고자 한다. 

### install sftp server ( ssh server )

사실 sftp server라고 하지만 ssh server를 설치하면 된다. sftp가 ssh를 이용하기 때문이다. 포트도 ssh의 22번 포트를 사용한다. ssh에 대해서는 Opentutorials의 [SSH](https://opentutorials.org/module/432/3738), [원격제어(ssh)](https://opentutorials.org/module/2538/14447), [SSH Key - 비밀번호 없이 로그인](https://opentutorials.org/module/432/3742) 등을 참고하자. 보통 ubuntu에 ssh 서버가 설치되어 있는 경우가 있지만, 설치되어 있지 않다면 [Ubuntu 20.04 - SSH 설치와 접속 방법](https://codechacha.com/ko/ubuntu-install-openssh/)을 참고하자. 참고로 ssh 서버 설정 파일은 주로 `/etc/ssh/sshd_config`에 위치해 있다. 설정 변경을 원한다면 관련 글을 찾아보기 바란다. 

여기에서는 주요 실행 구문만 요약하여 적어 본다. 

```bash
# install ssh server
sudo apt update
sudo apt install openssh-server

# open filewall
sudo ufw allow ssh

# control ssh server
sudo service ssh status
sudo service ssh start
sudo service ssh restart
sudo service ssh stop
```

참고로 클라이언트 쪽 사용법도 간략히 적어둔다.

```bash
# install ssh client
sudo apt-get install openssh-client

# connet with ssh
ssh username@192.123.456.789 -p 22
```

### manage files with winSCP

GUI 환경에서 sftp 서버의 파일을 관리하고 싶다면 [winSCP](https://winscp.net/)라는 훌륭한 프로그램을 사용하면 된다. 이 프로그램을 통해 마치 윈도우OS의 폴더창처럼 sftp 서버에 있는 파일을 관리할 수 있다. winSCP의 사용법은 [여기](https://codedosa.com/1050)를 참고하자. 

### map networkdrive on windows OS

윈도우OS에는 편리한 네트워크드라이브라는 기능이 있다. 이 기능을 이용하면 네트워크로 연결되어 있는 드라이브를 로컬에 있는 드라이브처럼 사용할 수 있다. 대표적으로 samba 프로토콜을 지원하지만, 우리는 sftp를 이용하여 연결해 보고자 한다. 윈도우는 이를 직접 지원하지 않으므로 서드파티 프로그램의 도움을 받아야 한다. 여기에 대한 내용은 [How to map SFTP as a drive on Windows 10](https://sftptogo.com/blog/how-to-map-sftp-as-a-windows-10-drive/)을 참고하였다. 

우선 sftp server ( ssh server )가 정상적으로 동작하고 있다면, 클라이언트(작업자의 로컬 컴퓨터)에 아래 프로그램을 모두 설치한다. 

* [WinFsp](https://github.com/billziss-gh/winfsp/releases/latest?utm_source=crazyantlabs&utm_medium=blog)
* [SSHFS-Win](https://github.com/billziss-gh/sshfs-win/releases/latest?utm_source=crazyantlabs&utm_medium=blog)
* [SSHFS-Win manager](https://github.com/evsar3/sshfs-win-manager/releases/latest?utm_source=crazyantlabs&utm_medium=blog)

설치를 마쳤다면 마지막 SSHFS-Win manager를 실행하고 새로운 연결을 생성한다. 연결 방법이 ssh 연결과 같으므로 이에 준하여 설정하면 된다. 

연결이 성공하면 새로운 네트워크-드라이브가 생성된 것을 볼 수 있다. 이제 로컬 드라이브처럼 서버의 파일들을 관리해보자. 

