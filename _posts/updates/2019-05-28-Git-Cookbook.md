---
layout: post
title:  "[Cookbook] Git, 이럴 때 이렇게 한다."
categories: [코딩삽질기, Cookbook]
tags: ['git']
---

## 배경

git은 프로젝트를 버전에 따라 관리할 수 있도록 도와주는 유용한 툴이다. git을 사용할 때 마주하게 되는 문제와 해결 방법을 적어 둔다.

예시로 remote repo 주소를 `https://myrepo.github.com/coolproject.git`라고 해보자.

## 내용이 많아 따로 작성한 페이지

{% include post_list_subject.html subject="git" %}

## Clone single branch only

작업 과정에서 오류를 줄이기 위해 local에 작업 branch만을 받아오고 싶을 때가 있다. 예를 들어 작업 branch가 `develop`이라면, master branch 없이 develop branch만 local에 받아와 작업하고 push와 pull을 하면 좋을 것이다. 이런 경우에는 clone을 할 때 해당 branch만 받아 올 수 있다. [ref](https://stackoverflow.com/questions/1911109/how-to-clone-a-specific-git-branch)

```bash
# remote:   http://www.myrepo.git
# * origin/master
# * origin/develop
git clone --single-branch --branch develop http://www.myrepo.git
git push -u origin develop
```

## Recommended default config

git을 설치하고 나서 아래 설정을 해주자. 설명은 다음과 같다. 

```bash
git config --global core.autocrlf input
git config --global core.quotepath false
```

### File names with non ASCII characters

한글로 쓰여진 파일 이름이 decoding 상태로 표시되는 경우에는 다음과 같이 설정을 변경시켜 준다.

```bash
git config --global core.quotepath false
```

### non ASCII characters

Powershell을 이용하는 경우, commit message나 log에 한글이 표시되지 않을 수 있다. 이 때는 아래와 같이 실행한다. 

```cmd
$env:LC_ALL='C.UTF-8'
```

powershell이 실행 될 때 자동으로 적용하기 위해서는 profile에 넣어 주어야 한다. 아래와 같이 profile 설정 파일을 확인하고 해당 파일에 `$env:LC_ALL='C.UTF-8'`를 적어 넣고 저장하자. 

```cmd
$profile
```

### End of Lines

개행을 할 때 windows system에서는 `\r\n`을 쓰고, linux 계열에서는 `\n`을 쓴다. 따라서 협업을 할 때는 이로 인한 무분별한 파일 변환이 원하지 않게 일어날 수 있다. 이를 방지하기 위해 git에서는 `autocrlf` 기능을 제공한다. 특별히 윈도우 환경에서 일반적인 에디터에서는 `\r\n`를 고집하지 않는다. 따라서 아래와 같이 바꿔주는 것으로 충분하다. 

```
git config --global core.autocrlf input
```



## REF

* [파워쉘을 이용할때 한글깨짐현상 해결방법](https://holjjack.tistory.com/144), [Powershell에서 한글이 깨져서 출력될 때 대처법](https://evandde.github.io/post/200227-git-powershell-ko-err/)
