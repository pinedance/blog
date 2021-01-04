---
layout: post
title: "Windows WSL에서 git ssh 사용하기"
categories: [코딩삽질기]
tags: ["git", "ssh", "wsl", "windows"]
---

## 배경

Git의 remote repository의 주소는 ssh와 https 2가지 이다. ssh 쪽이 속도나 인증 면에서 더 편리하다. 그러나 windows의 WSL을 사용할 경우, Windows 상의 Git과 WSL 상의 Git 양자에서 ssh를 함께 사용하려면 어떻게 해야 할까?

## 방법

물론 네트워크는 복잡한 문제이므로, remote repo의 https 주소를 사용하는 것도 하나의 방법이다. 하지만 ssh를 사용하고 싶다면 크게 2가지 해법이 있다.

WSL의 Linux( 보통 ubuntu )에는 git이 기본적으로 설치되어 있다. 따라서 우선 Windows에 git을 설치해 주자. 이렇게 하면 윈도우에 ssh 전송에 필요한 파일들이 설치되게 된다.

Windows 상의 Git에서 SSH로 remote repo에서 clone이나 pull/push가 문제 없이 진행되는지 확인해 보자.

확인이 끝나면 윈도우의 ssh 정보를 wsl에 복사하거나 soft link 형태로 연결해 주면 된다.

### COPY

Windows의 SSH 정보는 보통 윈도우 경로는 `c:\Users\<username>\.ssh`, wsl 경로로는 `/mnt/c/Users/<username>/.ssh`에 생성되어 있다. 

잠깐, 폴더가 존재하지 않는다고? 그렇다면 ssh를 다른 폴더에 설치했거나 처음부터 생성하지 않은 것이다. 다른 폴더에 설치했다면 자신에게 맞는 폴더 경로를 적용하자. 만약 ssh를 생성하지 않았다면 [설치법](https://git-scm.com/book/ko/v2/Git-%EC%84%9C%EB%B2%84-SSH-%EA%B3%B5%EA%B0%9C%ED%82%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0)을 보고 먼저 설치하자. 

이제 이 폴더 자체를 WSL의 `~/`폴더 아래로 복사하여 `~/.ssh`에 정보가 저장되도록 하자. 그런 다음 보안을 위해 파일 mode를 변경시킨다. 방법은 아래와 같다.

```bash
# wsl bash
USERNAME="YOURNAME"
cp -r "/mnt/c/Users/${USERNAME}/.ssh" ~/
chmod 600 ~/.ssh/id_rsa
```

그러나 이렇게 해 두면 윈도우의 ssh 정보가 변경되었을 때, 동일한 작업을 다시 해야 한다. 물론 그럴 일은 별로 없지만 말이다.

### LINK

보다 유연한 방법은 soft link를 이용하는 것이다. 이렇게 하면 윈도우의 ssh 정보가 변경되더라도 wsl에서도 이를 직접 참조하게 된다. 이미 `~/.ssh`가 있는 경우에는 에러가 발생하므로 미리 정리해 둔다.

```bash
# wsl bash
# 필요하다면 : rm -rf ~/.ssh
USERNAME="YOURNAME"
ln -s "/mnt/c/Users/${USERNAME}/.ssh" "~/.ssh"
```

단 WSL2를 사용하는 경우에는 서로 다른 file system을 사용하기 때문에 soft link가 생성되지 않을 수 있다. 이럴 때는 앞의 방법을 사용하자.

## REF

-   [Sharing SSH keys between Windows and WSL 2](https://devblogs.microsoft.com/commandline/sharing-ssh-keys-between-windows-and-wsl-2/)
-   [SSH key and the Windows Subsystem for Linux](https://florianbrinkmann.com/en/ssh-key-and-the-windows-subsystem-for-linux-3436/)
