---
layout: post
title:  "Git, Pull/Push할 때 id password 묻지 않게 하기"
categories: [코딩삽질기]
tags: ['git']
---

## 배경

git을 사용하다보면 github, bitbucket 등의 remote repository를 사용하게 된다. 이 때 remote repo의 주소가 ssl로 되어 있다면 상관 없지만, https로 되어 있는 경우에는 clone, push, pull 등 동작마다 remote repo에 접근하기 위한 로그인 정보를 입력해 주어야 한다. 관리해야할 repo가 많거나, 어플리케이션을 통해 컨트롤 해야 하는 경우에 이러한 과정을 생략하고 싶을 때가 있다.

## 방법 1. 쉽지만 위험한 방법

이런 경우 remote repo 주소 자체에 접속 정보를 직접 넣어줄 수 있다. 아래와 같이 하면 별도로 접속 정보를 입력하지 않아도 된다.

```bash
git clone https://<ID>:<PASSWORD>@myrepo.github.com/coolproject.git
```

이 방법을 사용하면 password가 그대로 노출되게 되므로 위험할 수 있다. 만약 그래도 사용해야 한다면 [personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)을 생성하여 `<PASSWORD>` 대신 사용하자.


## 방법 2. 안전하고 공식적인 방법

git에서는 이런 문제를 도와주기 위해 `credential`이라는 기능을 제공하고 있다. 이 기능을 사용하면 로그인 정보를 저장해 두었다가 다시 입력하지 않아도 사용할 수 있게 해 준다. 크게 `cache`와 `store` 두 가지 방법이 있다.

### Git Credential / cache

만약 id와 password를 짧은 시간 동안 반복적으로 입력하는 일을 피하고 싶다면 `credential.helper`를  `cache`로 설정할 수 있다. ( ☞[git-credential-cache](https://git-scm.com/docs/git-credential-cache) )

```bash
# git config 업데이트
git config --global credential.helper cache
# git config --global --list
# ☞ credential.helper=cache
```

이렇게 하면 ID와 PASSWORD 같은 인증정보를 Disk에 저장하지는 않고 메모리에서 15분 까지만 유지한다. 한 번 입력된 인증 정보는 15분 동안 다시 묻지 않는다.

시간을 연장하려면 다음과 같이 옵션을 준다. 

```bash
git config credential.helper 'cache --timeout=300'
```


### Git Credential / store

사용자이름과 암호 같은 인증정보를 Disk에 저장하고 계속 유지하고 싶을 때도 있다. 이 때는 `credential.helper`를 `store`로 지정한다. 아래와 같이 옵션을 수정해 주면 한 번 로그인 된 정보는 자동으로 저장되어 다음부터 묻지 않는다. 로그인 정보는 `~/.git-credentials`에 저장되게 된다.

```bash
# git config 업데이트
git config --global credential.helper store
# git config --global --list
# ☞ credential.helper=store
```

### Git Credential / Keychain

`credential.helper`를 `store`로 지정했을 때의 문제는 파일에 로그인 정보가 그대로 저장된다는 점이다. 이를 좀 더 안전하게 사용하려면 OS 자체에서 지원한는 Keychain 시스템을 이용하면 된다. mac이나 windows에는 OS 자체에서 제공하는 Keychain 시스템이 있다. git credential 정보를 이곳에 저장할 수 있다.

```bash
# for windows
git config --global credential.helper wincred
# git config --global --list
# ☞ credential.helper=wincred
```

※ 이 정보는 windows의 ["자격 증명 관리자(Credential Manager)"](https://support.microsoft.com/ko-kr/help/4026814/windows-accessing-credential-manager)에서 확인할 수 있다. 만약 remote repo의 비밀번호를 수정하였다면 이 "자격 증명 관리자"에서 해당 정보를 삭제해 주어야 한다.

<!---
windows의 경우 microsoft에서 제공하는 [windows 용 GCM](https://github.com/Microsoft/Git-Credential-Manager-for-Windows)를 먼저 설치해야 하는 방법도 있다. 설치를 마치면 `~/.git-credentials`에 로그인 정보가 그대로 저장되지 않고 OS 자체에서 token을 부여 받아 해당 token을 저장하게 된다.
--->


```bash
# for Mac
git config --global credential.helper osxkeychain
```

### 설정 상태 확인

현재 설정 상태를 확인해고 싶다면 아래와 같이 할 수 있다.

```bash
# local 설정
git config  --list
# Global 설정
git config --global --list
```

## REF

* [git-scm.com/7.14 Git 도구 - Credential 저장소](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-Credential-%EC%A0%80%EC%9E%A5%EC%86%8C)
* [Git-Credential-Manager-for-Windows](https://github.com/Microsoft/Git-Credential-Manager-for-Windows)
* [stackoverflow/Username and password in command for git push](https://stackoverflow.com/questions/29776439/username-and-password-in-command-for-git-push/29776651)
* [stackoverflow/How to save username and password in GIT?](https://stackoverflow.com/a/35942890)
* [github help/Caching your GitHub password in Git](https://help.github.com/en/articles/caching-your-github-password-in-git)
* [github help/Updating credentials from the OSX Keychain](https://help.github.com/en/articles/updating-credentials-from-the-osx-keychain)
