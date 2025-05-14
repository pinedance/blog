---
layout: post
title:  "linux의 profile과 bashrc ( feat. source )"
categories: 코딩삽질기
tags: ['Ubuntu', 'Linux', 'WSL']
---

## profile과 bashrc

Ubuntu와 같은 linux system에는 설정 파일을 `.profile`과 `.bashrc` 등으로 관리할 수 있다. 이 2가지를 어떻게 사용하면 좋을지 생각해 보자.

`/etc` 아래 전역 설정에도 이들이 있지만, 여기서는 user가 관리할 수 있는 `~/.prpfile`과 `~/.bashrc`만 다루겠다. 특별한 경우가 아니라면 sudo 권한은 쓰지 않는 편이 좋다.

양자는 모두 사용자 환경 설정에 중요한 역할을 하지만, 실행되는 시점과 적용 범위에 차이가 있다.

## profile

먼저 `~/.profile`는 사용자(user) 전용 환경 설정 파일이다. 사용자에 종속되어 있다. 사용자가 터미널을 통해 로그인할 때 단 한 번 실행되므로 주로 사용자 환경에 필요한 설정을 담는다. 가장 많이 사용하는 예는 다음과 같다.

* 시스템 전체에 영향을 주는 중요한 환경 변수들을 설정 e.g. `PATH`
* 어떤 종류의 터미널을 사용하는지 설정 e.g. bash, zsh, fish
* 로그인 후 자동으로 실행하고 싶은 프로그램 등록 e.g. 시작프로그램

`~/.profile`는 shell이 열리기 전에 실행되므로 여기서 설정한 환경은 로그인 후 실행되는 모든 셸(bash뿐만 아니라 다른 셸도 포함)에 영향을 미친다.

## bashrc

다음으로 `~/.bashrc`는 bash shell 전용 환경 설정 파일이다. bash에 종속되어 있다. 새로운 bash 셸이 시작될 때마다 실행되므로 주로 bash 셸에서만 사용되는 편리한 기능들을 설정합니다. 가장 많이 사용하는 예는 다음과 같다.

* 별칭(alias) 설정: 자주 사용하는 명령어를 짧은 별칭으로 만들어 편리하게 사용할 수 있다. e.g. `alias ll='ls -al'`
* 함수(function) 정의: 복잡한 명령어들을 묶어 함수로 정의하여 재사용성을 높일 수 있다.
* 프롬프트(prompt) 설정: 터미널 프롬프트의 모양을 정의한다.
* 자동 완성(completion) 설정: 탭(Tab) 키를 이용한 자동 완성 기능을 확장하거나 설정한다.

## 사용 예시

정리하면, `~/.profile`는 사용자와 관련된 환경 설정 파일이다. 로그인 시 한 번만 필요한 환경 변수나 초기 작업을 설정하며, 이는 시스템 전반에 영향을 준다. 반면 `~/.bashrc`는 bash shell와 관련된 환경 설정 파일이다. 새로운 bash 셸이 시작될 때마다 필요한 bash 환경을 설정한다. 주로 bash 사용 편의성을 높이는 설정이 포함된다.

Ubuntu 등에 App(혹은 system package)를 설치할 때 종종 pre-compiled file을 어떤 위치에 저장하고, 해당 위치 경로를 PATH에 추가하라고 할 때가 있다. 그렇다면 이 PATH는 어디에서 설정해 주어야 할까. bash가 아니라 system에 대한 설정이므로 `~/.profile`에 넣어 주는 것이 좋겠다.

만약 [bash-it](https://pinedance.github.io/blog/2019/06/10/Bash-theme)과 같이 bash의 모양이나 편의성을 추가하는 설정을 해야 할 때는 어떻게 해야 할까? system이 아니라 bash shell과 관련된 일이므로 `~/.bashrc`에 넣어 주는 것이 좋겠다.

하지만 환경 설정을 변경할 때마다 이 두 파일을 수정하는 것은 그리 편리하지 않다. 어떻게 해야할까? 사용자 전용 파일을 만들고 이를 `~/.profile`과 `~/.bashrc`에서 불러서 적용해주는 편이 더 편리하다. 우선 다음과 같이 해보자.

```bash
cd ~
# 사용자가 추가할 profile 파일을 넣을 directory 만들기
mkdir my.profile.d 
# 사용자가 추가할 bashrc 파일을 넣을 directory 만들기
mkdir my.bashrc.d 
```

`/.profile` 파일 마지막에 다음 내용을 추가하자. 그러면 `/.profile`이 호출될 때 `~/my.profile.d` 속에 있는 설정 파일들이 차례로 함께 호출된다.

```bash
# ~/.profile
if [ -d "$HOME/my.profile.d" ]; then
  for i in "$HOME/my.profile.d/*" ; do
    if [ -r "$i" ]; then
      . "$i"
    fi
  done
  unset i
fi
```

같은 요령으로 `/.bashrc` 파일 마지막에 다음 내용을 추가하자. 그러면 `/.bashrc`가 호출될 때 `~/my.bashrc.d` 속에 있는 설정 파일들이 차례로 함께 호출된다.

```bash
# ~/.bashrc
if [ -d ~/my.bashrc.d ]; then
  for i in ~/my.bashrc.d/* ; do
    if [ -r $i ]; then
      . $i
    fi
  done
  unset i
fi
```

※ 따옴표 등을 잘못하면 에러가 날 수 있으므로 주의하자.

문제가 없는지 다음과 같이 테스트 해보자.

```bash
cd ~
source ~/.bashrc
source ~/.profile
```

이제 새로 추가할 환경 설정이 생기면 `~/my.profile.d`이나 `~/my.bashrc.d` 디렉토리 아래에 파일을 추가하여 처리하면 된다.

예를 들어 `go` 언어를 설치해야 한다면, [공식 문서](https://go.dev/doc/install) 설명처럼 go binary 경로를 PATH에 등록시켜야 한다.

일반적인 방법처럼 `~/.profile`에 직접 추가해야 할 때는 다음과 같이 해야 한다. ( 내용을 덧붙이므로 `>>`를 사용했다. )

```bash
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.profile
```

하지만 우리는 추가된 설정 파일을 따로 관리하고자 하므로 `~/.profile`를 수정하지 않고 다음과 같이 새로운 파일을 만들고 해당 내용을 넣어주기만 하면 된다. ( 파일을 만들고 내용을 쓰기 위해  `>`를 사용했다. )

```bash
echo 'export PATH=$PATH:/usr/local/go/bin' > ~/.my.profile.d/go
```

적용은 모두 아래와 같이 한다.

```bash
source ~/.profile
```

참고로 source 대신 아래와 같이 처리할 수도 있다.

```bash
. ~/.profile
```

## 참고

bash shell script `foo.sh`와 `bar.sh`가 있다고 해보자. 아래와 같이 몇 가지 실행 방법이 있다. 어떤 차이가 있을까?

```bash
# in bash
# (1)
bash foo.sh    
# (2)
./foo.sh       
# (3)
source foo.sh  
# (4)
. foo.sh       
```

(1)과 (2)는 서로 같은 방법이고, (3)과 (4)도 서로 같은 방법이다. 하지만 (1)(2)와 (3)(4)는 서로 다르다.

앞의 (1)(2)는 현재 프로세스가 아닌 자식 프로세스에서 `foo.sh`를 실행시킨다. 따라서 현재 프로세스로 돌아오면 `foo.sh`의 정보를 사용할 수 없다.

반면 (3)(4)는 현재 프로세스에서 `foo.sh`를 실행시킨다.

만약 `foo.sh` 파일 내용이 다음과 같다면, 실행 결과가 서로 다르게 된다.

```bash
# foo.sh
#! /bin/bash
export MYNAME=WORLD
```

```bash
# `./foo.sh` or
bash foo.sh
echo $MYNAME
# 결과로 빈값을 출력한다. 
```

```bash
# `. foo.sh` or
source foo.sh
echo $MYNAME
# 결과로 "WORLD"를 출력한다. 
```

문제는 `bar.sh` 속에서 `foo.sh`를 호출할 때도 발생한다. bar.sh에서 foo.sh를 실행시킬지, 불러올지에 따라 결과가 달라지기 때문이다.

```bash
# bar.sh
#! /bin/bash
bash foo.sh
echo $MYNAME
```

이제 `bash bar.sh`라고 하면 빈값이 출력된다. bar.sh에서는 foo.sh에서 선언한 MYNAME이라는 변수가 더이상 존재하지 않기 때문이다.

```bash
# bar.sh
#! /bin/bash
source foo.sh
echo $MYNAME
```

반면 여기서 `bash bar.sh`라고 하면 "WORLD"라는 값이 출력된다. bar.sh에서 여전히 foo.sh에서 선언한 MYNAME를 사용할 수 있기 때문이다.
