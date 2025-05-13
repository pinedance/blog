---
layout: post
title:  "WSL git에서 username과 password 관리하기"
categories: [코딩삽질기]
tags: ['bash', 'git', 'WSL']
---


## 배경

git remote address가 ssh가 아니라 https로 되어 있는 경우, push나 pull을 해야 할 때 usename과 password를 입력하여 사용자 인증을 해야 한다.

그런데 최근 github에서는 이러한 사용자 인증 때 password 대신 PAC(Personal access code)를 쓰도록 정책을 변경하였다. 문제는 password와 달리 PAC는 암기할 수 없다는 점이다. 어딘가에 저장해 두고 붙여넣기를 계속 해야 한다. 불편하다.

git에서는 내부적으로 username과 password를 암호화 해서 저장하는 keychain을 지원하고 있다. 그런데, keychian 기술 자체는 git에 포함된 것이 아니라 Mac이나 windows과 같은 OS에서 제공하는 기술이다. git은 이것을 연결해서 지원하고 있을 뿐이다.

## 방법

OS에 따라 아래와 같이 git의 설정을 바꾸어 두면, 최초에 입력한 username과 password가 OS에 암호화되어 저장된 다음 이후로 별도의 입력 없이 사용되게 된다.

### Mac

```bash
git config --global credential.helper osxkeychain
```

### Windows

```cmd
git config --global credential.helper wincred
```

### Linux (Ubuntu)

Linux의 경우에는 별도의 keychain 서비스가 존재하지 않기 때문에 `libsecret`라는 관련 프로그램을 설치해 주어야 한다. 아래와 같이 따라해 보자.

```bash
sudo apt-get install libsecret-1-0 libsecret-1-dev
cd /usr/share/doc/git/contrib/credential/libsecret
sudo make
git config --global credential.helper /usr/share/doc/git/contrib/credential/libsecret/git-credential-libsecret
```

### WSL

안타깝게도 `libsecret`을 이용한 위의 방법이 WSL(Windows Subsystem for Linux)에서는 작동하지 않는다. 이를 적용하면 다음과 같은 에러를 만나게 된다.

```bash
could not connect to Secret Service: Cannot autolaunch D-Bus without X11 $DISPLAY
```

WSL에서 linux 기능을 전부 사용할 수 없기 때문에 나타나는 문제로 보인다. WSL2로 업데이트 하면 문제가 해결될 것 같다. 하지만 WSL2는 filesystem 속도 이슈가 해결되지 않고 있기 때문에 아직 쓰지 못하고 있다.

그렇다면 어떻게 해야 할까. 2가지 해결책이 있다.

첫째는, 로그인 정보를 암호화 하지 않고 그냥 파일에 저장하여 사용하는 방법이다. 아래와 같이 설정하면 된다.

```cmd
git config --global credential.helper store
```

다음으로는 편법으로, windows 용 git에 탑재되어 있는 `git-credential-manager`를 사용하는 방법이다. 이를 위해서는 windows에 windows용 git 프로그램이 설치되어 있어야 한다. 즉, WSL과 windows 양쪽에 git을 설치해야 한다. 그리고 나서 WSL git에 다음과 같이 설정해 준다.

```bash
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager.exe"
# check current git config
# git config --list
```

보안을 생각했을 때 후자의 방법이 좋을 것 같다.

## REF

* [7.14 Git 도구 - Credential 저장소](https://git-scm.com/book/k/v2/Git-%EB%8F%84%EA%B5%AC-Credential-%EC%A0%80%EC%9E%A5%EC%86%8C)
* [Is there a way to cache GitHub credentials for pushing commits?](https://stackoverflow.com/a/5343146)
* [Libsecret - remember Git credentials in Linux Mint and Ubuntu securely](https://www.softwaredeveloper.blog/git-credential-storage-libsecret)
* [How to use Git credential store on WSL (Ubuntu on Windows)?](https://stackoverflow.com/questions/45925964/how-to-use-git-credential-store-on-wsl-ubuntu-on-windows)
