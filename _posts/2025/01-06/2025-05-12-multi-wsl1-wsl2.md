---
layout: post
title:  "복수의 WSL 사용하기 (feat. Windows & WSL)"
categories: 코딩삽질기
tags: ['Windows', 'WSL']
---

## 문제 : WSL2와 Windows의 file system

Windows에 WSL(Windows Subsystem for Linux)이 생겨난 뒤로 코딩 환경이 크게 개선되었다. 현재는 일반 GUI 작업은 윈도우 측에서 수행하고, 코딩이나 개발 관련된 작업은 WSL 측에서 수행한다. WSL에 대한 세부적인 내용은 [WSL에 대한 공식 문서](https://learn.microsoft.com/en-us/windows/wsl/)를 참조하자.

그러나 다음과 같은 현실적인 문제가 있다.

* SSH, Git과 같이 윈도우와 WSL 양쪽 모두에서 사용해야 하는 경우는 부득이 양쪽 모두에 설치할 수 밖에 없다.
  * 이 경우 설정값을 동기화 하면 편리한데, App에 따라 그렇게 할 수도 있고 못 할 수도 있다. SSH에 대해서는 [이 글](https://pinedance.github.io/blog/2025/05/09/ssh), Git에 대해서는 [이 글](https://pinedance.github.io/blog/2021/02/07/WSL-git-keychain)을 참고하자.
* WSL에는 기능 제한이 있다.
  * WSL1(WSL version1)의 경우, kernel 접근이 제한되므로 docker 등을 사용할 수 없다.
  * WSL2(WSL version2)의 경우, kernel까지 완전히 접근 가능하여 사실상 Linux 그대로라고 할 수 있다. 그러나 윈도우 file system이 아닌 linux file system을 사용한다. 때문에  WSL2에서 윈도우 파일 시스템에 접근하거나 그 반대의 경우 속도가 느려진다. 사실상 작업을 하기 어렵다. 따라서 Microsoft에서는 윈도우 관련 파일은 윈도우 file system 안에서, WSL 관련 파일은 WSL 안에 있는 linux file system 안에서 사용할 것을 권장하고 있다.

나는 보통 윈도우 환경에서 VS Code(Visual Studio Code)를 실행시키고, VS Code 안에서 WSL에 접근한 다음, 코딩을 하거나 개발 작업을 수행한다. VS Code는 윈도우에서 동작하지만, 개발 자체는 WSL에서 작업하는 것이다. VS Code에서는 이미 이런 방식을 상정하고 기능을 제공하고 있다. 구체적인 방법은 공식 홈페이지의 글 "[Developing in WSL](https://code.visualstudio.com/docs/remote/wsl)"를 참고하자.

문제는 여기서 발생한다. 나의 경우 주요 작업 파일들을 윈도우 파일 시스템에 만들어 놓고, WSL에서 여기에 접근하여 작업을 하는 방식을 택하고 있다. 그 이유는 다음과 같다.

* GUI 파일 탐색기를 지원한는 윈도우 쪽에서 파일을 다루는 것이 CLI 기반의 WSL에서 파일을 다루는 것보다 더 편리하다.
* 파일은 윈도우 파일 시스템에 두면 윈도우와 WSL에서 모두 쉽게 접근할 수 있지만, WSL쪽에 두면 Windows에서 접근하기에 직관적이지 않다.
* 가장 중요한 이유이다. 주요 작업 파일은 안전을 위해 OS가 설치되어 있지 않은 별도의 물리 드라이브에 두고 백업을 설정해 둔다. 하지만 WSL 쪽에 작업 파일을 나누어 두면
  * 파일을 Windows 측에 두었는지 WSL 측에 두었는지 찾아야 할 때가 있다.
  * 또 외부로 백업이 어렵고
  * Windows OS에 문제가 생겼을 때 WSL Linux file system에 있던 파일에 접근하거나 이를 되살리기 어려워진다.

그래서 나의 경우 다음과 같이 운용하고 있다.

* 작업 파일 위치 : Windows 측 (e.g. Windows File System `D:\Projects`)
* 개발 도구 실행 : Windows 측 (e.g. VS Code in WSL )
* 개발 관련 라이브러리 사용 및 실행 : WSL 측 (e.g. python, git, nodejs ... )

현재 Microsoft에서는 WSL2 사용을 권장하고 있다. 하지만 위와 같은 나의 상황 때문에 file system 사이의 접근이 느린 WSL2를 전적으로 사용하기 어렵다.

## 방법: 복수의 WSL 설치

이 문제를 다음과 같이 해결해 보았다.

* 윈도우에 복수의 WSL distro를 설치한다. 즉, WSL1 기반의 Ubuntu(이하 Ubuntu-WSL1)와 WSL2 기반의 Ubuntu(이하 Ubuntu-WSL2)를 각각 설치한다.
* Ubuntu-WSL1을 기본으로 사용하고,
* docker와 같이 kernel을 이용해야 할 부분만 Ubuntu-WSL2에 설치하여 사용한다.

이를 정리하면 다음과 같다.

* 작업 파일 위치 : Windows 측 (e.g. Windows File System `D:\Projects`)
* 개발 도구 실행 : Windows 측 (e.g. VS Code in WSL )
* 개발 관련 라이브러리 사용 및 실행 : WSL1 측 (e.g. python, git, nodejs ... )
* linux kernel이 필요한 라이브러리 사용 및 실행 : WSL2 측 (e.g. docker ... )

이제 구체적인 설치 방법을 살펴보자.  

WSL 설치에 대해서는 [공식 문서](https://learn.microsoft.com/ko-kr/windows/wsl/install)에 잘 설명되어 있으므로 명령어 중심으로 정리하겠다. Windows Powershell에서 작업하는 것인지, WSL shell에서 작업하는 것인지 유념하자. Windows Powershell은 관리자 권한으로 실행시켜서 명령을 수행해야 한다.

### 1st WSL 설치 (WSL2)

첫번째 WSL 설치. 다음 몇 가지 명령이면 쉽게 설치가 가능하다. 윈도우11에서는 WSL2로 기본 설치 된다.

```
# Windows Powershell
# 옵션: 설치 가능한 distro의 정보를 알아보자. 
wsl --list --online
```

```
# Windows Powershell
# distro 이름을 기준으로 'Ubuntu-24.04'를 설치한다면 ...
# 추후에 WSL을 구분하기 위해 이름을 설정하자.
wsl --install Ubuntu-24.04 --name Ubuntu2404-WSL2
```

```
# Windows Powershell
# 설치가 잘 되었는지 확인하자. 
wsl --list -v
# 설치한 WSL을 실행시키자. 
wsl -d Ubuntu2404-WSL2
```

자, 이렇게 첫번째 WSL 설치가 완료되었다. 이처럼 WSL을 하나만 설치하는 것은 매우 쉽다.

### 2nd WSL 설치 (WSL1)

이재 두번째 WSL을 설치하고 WSL version 1으로 바꿔보자. 다음과 같은 과정이 필요하다.

* 설치할 Ubuntu file을 다운로드 하여 local PC에 저장한다.
* 다운로드 한 file을 바탕으로 WSL을 설치한다.
* WSL의 version을 2에서 1으로 바꾼다.
* default WSL을 교체한다.
* 추가 설정을 수행한다.

두번째 WSL도 `wsl --install Ubuntu-24.04 --name Ubuntu2404-WSL1`처럼 하여 설치할 수 있다면 좋겠지만, 현재는 동작하지 않는다.

번거롭지만 Ubuntu 파일을 local PC에 저장하고 이를 바탕으로 설치를 진행해야 한다. 이에 대해서는 [여기](https://learn.microsoft.com/ko-kr/windows/wsl/install-manual#downloading-distributions)를 참고하자. Ubuntu 24.04의 경우 [이 링크](https://wslstorestorage.blob.core.windows.net/wslblob/Ubuntu2404-240425.AppxBundle)에서 다운로드 할 수 있다. 접속해서 적당한 폴더에 다운로드 하자.

문제는 이 파일이 `.AppxBundle`이라는 생소한 형식의 파일이라는 점이다. 설치 파일을 하나로 묶어 둔 패키징이라고 생각하면 된다. 사실 압축 파일이다. 압축을 푸는 App(e.g. [7zip](https://www.7-zip.org/), [반디집](https://kr.bandisoft.com/bandizip/) 등)에서 이 파일을 열고 압축을 풀어야 한다. 단, 해당 App에서 압축 파일로 인식하지 않기 때문에 "전체 파일 보기" 옵션으로 파일을 찾아 풀어주어야 한다. 이 파일의 압축을 풀면 다시 몇가지 `.appx` 파일이 나타난다. 이 역시 압축 파일이므로 동일한 방식으로 압축을 풀면 된다. 예를 들어 위의 `Ubuntu2404-240425.AppxBundle` 속에는 다음 파일들이 포함되어 있다.

```bash
# Ubuntu2404-240425.AppxBundle
Ubuntu_2404.0.5.0_x64.appx
Ubuntu_2404.0.5.0_ARM64.appx
...
```

우리가 필요한 것은 `Ubuntu_2404.0.5.0_x64.appx`이다. 이를 다시 위와 같은 방법으로 압축 해제하면 다음과 같은 파일들이 나타난다.

```bash
# Ubuntu_2404.0.5.0_x64.appx
ubuntu2404.exe
install.tar.gz
...
```

우리가 필요한 파일은 바로 `install.tar.gz` 파일이다.

이제 다음과 같이 로컬에 있는 파일을 바탕으로 WSL을 설치해보자.

```
# Windows Powershell
wsl --install --enable-wsl1 --name Ubuntu2404-WSL1 --from-file C:<PATH>\Ubuntu2404-240425\Ubuntu_2404.0.5.0_x64\install.tar.gz
```

```
# Windows Powershell
# 설치가 잘 되었는지 확인하자. 
wsl --list -v
```

설치는 문제 없이 되지만, WSL2로 설치되었을 것이다. 이제 WSL1으로 바꿔주고, 기본(default) WSL도 여기로 옮겨주자.

```
# Windows Powershell
# WSL2 → WSL1
wsl --set-version Ubuntu2404-WSL1 1
# 기본 distro 변경
wsl --set-default Ubuntu2404-WSL1
```

`wsl --list -v`로 설치 결과를 다시 확인하자.

### Ubuntu2404-WSL1 설정

나중에 설치한 WSL의 경우, 약간의 추가 설정이 필요하다. WSL을 실행시키면 Root로 그대로 진입하기 때문이다. 다음과 같이 따라하자.

```
# Windows Powershell
# Ubuntu2404-WSL1 켜기 (동작시키기)
wsl -d Ubuntu2404-WSL1
# 끄기는 아래와 같이 
# wsl -t Ubuntu2404-WSL1
```

이제 WSL Root로 진입했을 것이다. 아래와 같이 하여 user를 추가하고 비밀번호 등을 설정하자.

```bash
# Ubuntu2404-WSL1 Bash Shell / # as root
adduser <wsl username>
# 'sudo'를 쓰기 위해 sudo group에 넣기
# 이 과정을 생략하면 root 권한을 쓸 수 없게 된다. 아래 "Root 권한 사용 불가" 부분을 참고하자.
usermod -a -G sudo <wsl username>
```

자 이제 아래와 같이 WSL에서 빠져나와 WSL을 종료하자.

```bash
# Ubuntu2404-WSL1 Bash Shell
# linux shell에서 빠져나오기
exit
```

```
# Windows Powershell
# Ubuntu2404-WSL1 끄기 (종료하기)
wsl -t Ubuntu2404-WSL1
```

다시 `wsl -d Ubuntu2404-WSL1`로 동작해도 root로 실행된다. 아래와 같이 기본 사용자를 새로 지정해 주자.

```
# Windows Powershell
# Ubuntu2404-WSL1의 기본 사용자 지정
wsl --manage Ubuntu2404-WSL1 --set-default-user <wsl username>
```

이제 모두 끝났다. 이제 `wsl -d Ubuntu2404-WSL1`로 동작하면 `wsl username`으로 진입하게 될 것이다.

## Tip

### link folders

나의 주요 작업 폴더가 윈도우 기준 `D:Working`라고 해보자. WSL1에서 이곳에 `~/Working`으로 접근하고 싶다면 어떻게 해야 할까?

다음과 같이 심볼릭 링크를 걸어주면 된다.

```bash
# Ubuntu2404-WSL1
ln -s /mnt/d/Working /home/<wsl username>/Working
```

### Windows와 app 설정 공유

다음 글을 참고하자.

* SSH: [이 글](https://pinedance.github.io/blog/2025/05/09/ssh)
* Git: [이 글](https://pinedance.github.io/blog/2021/02/07/WSL-git-keychain)

### Root 권한 사용 불가

만약 WSL에서 `sudo` 권한을 쓰려고 할 때 "user is not in the sudoers file."이라는 메시지와 함께 root 권한에 접근할 수 없다면? 현재 user에서 sudo 권한이 없다는 의미이다. 다음과 같이 해결한다.

```
# Windows Powershell
# WSL에 root 권한으로 로그인 
# wsl -l -v
wsl -d <WSL name> -u root
```

```bash
# WSL Bash Shell / # as root
# 'sudo'를 쓰기 위해 기본 user를 sudo group에 넣기
usermod -a -G sudo <wsl username>
```
