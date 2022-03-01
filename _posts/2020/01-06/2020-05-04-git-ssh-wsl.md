---
layout: post
title: "Windows WSL에서 git ssh 사용하기"
categories: [코딩삽질기]
tags: ["git", "ssh", "wsl", "windows"]
---

## 배경

Git의 remote repository의 주소는 SSH와 HTTPS 두 가지이다. 전자는 로컬 컴퓨터에서 공개키를 생성하고 이를 Git 서버에 등록하여 인증을 한다. 후자는 Git 서버에 등록된 User name과 password를 입력하여 인증을 한다. Windows의 WSL을 사용할 경우, WSL 상의 Git에서 SSH와 HTTPS로 편리하게 인증하려면 어떻게 해야 할까? 자세한 내용은 Micro Soft 공식 문서 가운데 [Get started using Git on Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-git#git-credential-manager-setup)에 잘 정리되어 있다. 여기에서는 이를 짧게 적어본다. 

결론부터다. Windows에 Git을 설치하고, WSL에도 Ubuntu용 Git을 설치해 두자. WSL Git의 인증 정보를 Windows용 Git의 인증 정보와 링크시켜 준다. WSL의 Git은 Windows용 Git의 인증 정보를 사용하게 된다. 

## SSH의 경우

윈도우의 SSH정보를 WSL에 복사하거나 soft link 형태로 연결해 주면 된다.

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

보다 유연한 방법은 soft link를 이용하는 것이다. 이렇게 하면 윈도우의 SSH 정보가 변경되더라도 WSL에서도 이를 직접 참조하게 된다. WSL에 이미 `~/.ssh`가 있는 경우에는 에러가 발생하므로 미리 정리해 둔다.

```bash
# wsl bash
# 필요하다면 : rm -rf ~/.ssh
USERNAME="YOURNAME"
ln -s "/mnt/c/Users/${USERNAME}/.ssh" "~/.ssh"
```

단 WSL2를 사용하는 경우에는 서로 다른 file system을 사용하기 때문에 soft link가 생성되지 않을 수 있다. 이럴 때는 앞의 방법을 사용하자.

## HTTPS의 경우

WSL 환경에서 아래와 같이 설정을 추가해 준다. 의미는 WSL에 설치된 git의 credential로 하여금 윈도우에 설치된 Git의 credential을 참고하게 하겠다고 선언해 주는 것이다. 이렇게 해 두면 Windows이든 WSL이든 일단 한 번 로그인 된 정보는 이 곳에 저장되므로 다시 물어보지 않는다. 

```bash
# WSL
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/libexec/git-core/git-credential-manager-core.exe"
```

## REF

-   [Sharing SSH keys between Windows and WSL 2](https://devblogs.microsoft.com/commandline/sharing-ssh-keys-between-windows-and-wsl-2/)
-   [SSH key and the Windows Subsystem for Linux](https://florianbrinkmann.com/en/ssh-key-and-the-windows-subsystem-for-linux-3436/)
