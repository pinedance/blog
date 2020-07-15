---
layout: post
title:  "Git submodule 사용하기"
categories: [코딩삽질기]
tags: [git]
---

자주 쓰는 명령은 [summary](#summary) 항목에 있다. 

## 배경

예를 들어 main project가 sub project에 의존하고 있다고 하자. main project와 sub project 모두 git으로 버전을 관리해야 한다면, 이 파일들을 어떻게 관리해야 할까.

우선 main project와 sub project는 서로 독립적으로 버전관리 되어야 하므로, main project에서 external link 형식으로 sub project를 연결해 두었다가 필요할 때 가져다 쓰는 방식이 좋을 것이다.

이런 방식은 이미 많은 개발 상황에서 사용되고 있다. 예를 들어 node를 이용하여 웹서버를 개발한다고 해보자. 이를 위해 우리는 여러가지 node package들을 활용한다. 이 때 우리가 개발하고 있는 웹서버가 main project이고, 사용하려는 node package들이 sub project가 된다. 우리는 우리가 개발하고 있는 웹서버 코드만 관리하면 되고, node package들은 패키지 관리자를 통해 연결해 두었다가 가져다 쓰게 된다.

구체적으로 보자. `npm`을 이용해 package를 다운로드 받으면, `package.json` 파일에 해당 package 이름과 버전이 명시되고 웹서버 폴더 속에 있는 `node_modules` 폴더에 차례로 다운로드 받아지게 된다. 하지만 우리는 웹서버 코드를 관리할 때 이 `node_modules` 폴더를 `.gitignore`에 넣어 관리에서 제외시킨다. 우리가 개발하는 웹서버에서 수정할 수 있는 파일도 아니며, 필요하면 `package.json`을 통해 다시 다운로드 받으면 되기 때문이다.

이를 정리해 보면 다음과 같다.

* main project에서는 sub project의 내용을 관리하지 않는다.
* main project에는 sub project의 어떤 버전을 의존할지, 어떤 하위 폴더에 넣을 지만 명세로 작성하여 관리한다.
* 필요할 때 sub project의 해당 버전을 가져다 main project 내 적절한 폴더에 위치시켜 사용한다.

하지만 sub project가 npm이나 pip, gem 등으로 관리되고 있지 않고, git 형태로만 존재한다면 어떻게 해야 할까. Git을 통해 이를 수작업으로 한다면 다음과 같이 할 수 있을 것이다.

* sub project의 원하는 버전을 다운로드 받아 main project 속 적절한 폴더에 넣는다.
* 이 폴더를 `.gitignore`를 이용해 main project의 버전관리에서 제외 시킨다.
* main project에서  sub project의 새로운 버전이 필요하다면 그때 sub project를 다운로드 받아 해당 폴더에 덮어쓴다.

하지만 다소 번거롭다. 다행히 git에는 이를 위한 git submodule이 준비되어 있다. git submodule은 git 저장소 안에 다른 git 저장소를 분리해 넣고 관리하게 해 주는 git의 기능이다.


## 이미 만들어진 submodule 사용 하기

먼저 이미 submodule로 관리되고 있는 main project와 sub project를 가져다 사용하는 방법에 대해 알아보자.

단, 주의할 점이 있다. submodule은 main project와 sub project가 부모 자식 관계를 가지고 연결되어 있다. 따라서 외부로 부터 새로운 정보를 받아 갱신해야 할 때 (`clone`, `pull`, `update` 등)에는 모든 작업 순서가 main project 먼저, sub project 나중이어야 한다. 생각해 보면 당연하다. 부모가 존재해야 자식도 존재할 수 있기 때문이다.

반대로 로컬의 코드 변화를 위부로 내보내야 할 때(`push`)에는 모든 작업 순서가 sub project 먼저, main project 나중이어야 한다. 이 역시 가장 자식의 변화가 부모에게 반영되어야 하기 때문이다.

* 외부에서 정보 받을 때 : 先 main project → 後 sub project
* 외부로 정보 보낼 때 : 先 sub project → 後 main project

### Clone Submodule

이미 submodule로 관리되고 있는 main project를 다운로드 받는 일을 해 보자. 이해를 돕기 위해 앞의 웹서버의 예를 다시 들어보자.

누군가 이미 개발해 놓은 웹서버를 로컬 환경에 받아 테스트 해 본다고 해보자. 웹서버 자체는 `git clone`으로 다운로드 받을 수 있다. 하지만 이 웹서버가 의존하고 있는 node package들은 함께 다운로드 되지 않는다. 우리는 `git clone`으로 먼저 main project에 해당하는 웹서버 코드를 가져온다. 그런 다음 `npm install`을 통해 `package.json`에 명시되어 있는 node module들을 다운로드 받을 수 있다.

#### Clone Main Project

git의 submodule 역시 비슷한 과정을 거친다. 먼저 main project를 clone한 뒤에 sub project를 clone할 수 있다. main project를 clone하는 것은 일반적인 git repo를 clone하는 것과 차이가 없다.

```bash
# clone main project
git clone https://myrepo.github.com/mainproject.git
```

clone을 마친 main project에 들어가 보면 `.gitmodules`라는 파일을 볼 수 있을 것이다. 이 파일을 열어 보면 sub project가 main project에서 위치할 폴더명과 git repo 주소가 적혀 있는 것을 볼 수 있다. 이것이 sub project에 대한 명세서라고 할 수 있다.

#### Clone Sub Project

우리는 아래의 `submodule` 명령을 통해 `.gitmodules`에 명시되어 있는 sub project들을 차례로 clone해 올 수 있다.

```bash
# in main project root folder
# git local config에 submodule을 인지시킴
# 명령 전후로 'git config --list --local'를 확인해 보자
git submodule init
# clone submodules
git submodule update
# checkout master each sub project ... (*)
git submodule foreach git checkout master
```

※ `git submodule init`은 서브모듈 정보를 기반으로 로컬 환경설정 파일이 준비한다. 즉, `.gitmodules` 파일에 있는 정보를 `.git/config`에 등록한다. 'git config --list --local'로 등록 결과를 확인해 보자. 

※ `git submodule update`는 서브모듈의 리모트 저장소에서 데이터를 가져오고 서브모듈을 포함한 프로젝트의 현재 스냅샷에서 Checkout 해야 할 커밋 정보를 가져와서 서브모듈 프로젝트에 대한 Checkout을 한다. 앞의 2가지 명령은 `git submodule update --init`과 같이 한 번에 수행할 수도 있다.

※ 마지막 명령은, 각 sub project를 master branch로 checkout 하기 위한 것이다. 처음 `submodule update`를 통해 sub project를 받으면, sub project는 `detached HEAD` 상태로 어떤 branch에도 속하지 않는 상태이기 때문이다.

※ remote repo 주소가 https로 되어 있는 경우에는 login에 필요한 정보를 요구할 수 있다. 일일이 입력하기 힘들다면 [Git Credential](https://pinedance.github.io/blog/2019/05/28/Git-Cookbook#id-password를-넣지-않고-pull이나-push-하기)을 참고하자.

#### Clone Main and Sub Project at the same time

위와 같은 과정을 하나의 명령으로 처리할 수도 있다.

```bash
git clone --recurse-submodules https://myrepo.github.com/mainproject.git
# git submodule foreach git checkout master
```

다시 한 번 주의하자. `submodule update` 이후 각 sub project의 git repo는 `detached HEAD` 상태이므로 코드를 수정하기 전에 이를 작업 branch로 checkout 해 주어야 한다.


### Update Submodule

이미 clone해 둔 코드가 있다면, 사용에 앞서 `pull`을 통해 최신 코드로 업데이트 해야 한다. submodule이 적용된 project 역시 마찬가지이다. 다른 점이 있다면 main project 뿐만 아니라 sub project까지 업데이트 해야 한다는 점이다.

#### Update Main Project

main project를 업데이트 하는 것은 보통의 방법과 같다.

```bash
# in main project root folder
git pull
```

#### Update Sub Project

main project의 업데이트가 끝나면, 새로 업데이트된 main project와 sub project의 관계에 따라 sub project를 업데이트 해야 한다. 각각의 sub project에서 fetch/merge 혹은 pull을 해도 되지만, 아래와 같이 관리하는 것이 편리하다.

```bash
# in main project root folder
git submodule update --remote --merge
```

※ `--merge` 옵션이 없으면, sub project는 다시 `detached head` 상태가 된다. 그러면 각각 `git checkout master`를 수행해 주어야 한다. [ref](https://stackoverflow.com/a/55570998)


## 새로운 submodule을 만들거나 수정하기

지금까지 이미 submodule로 관리되고 있는 project를 사용하는 방법에 대해 설명하였다. 이제 submodule을 만드는 방법을 살펴보자.

### Add Submodule

앞에서 살펴보았듯이, main project는 일반적인 git repo를 만드는 방법과 크게 다르지 않다. submodule에서 다른 점이 있다면, main project에 sub project의 git repo를 연결해주어야 한다는 점 뿐이다.

main project에 sub project repo를 연결해주는 방법은 다음과 같다.

```bash
# clone or build main project
git clone https://myrepo.github.com/mainproject.git
cd mainproject
# git submodule add https://myrepo.github.com/subproject1.git
# 대신 아래와 같이 하자.
git submodule add -b master ../subproject1.git
# -b master는 생략 가능
# git clone 때처럼 target folder를 지정할 수도 있다.
git submodule add -b master ../subproject002.git subproject2  
```

위와 같이 하고 나면, sub project repo의 정보가 담겨 있는 `.gitmodules` 파일이 생성되는 것을 확인할 수 있다. 이 파이을 열어보면 submodule 형태에 대해 더 잘 이해할 수 있다.

```
[submodule "subproject1"]
    path = subproject1
    url = ../subproject1.git
    branch = master
    
[submodule "subproject2"]
    path = subproject2
    url = ../subproject2.git
    branch = master
```

main project의 상태가 바뀐 것이기 때문에 `commit`을 수행해야 한다.

※ 특정 branch를 지정하고 싶다면 `-b master`와 같이 옵션을 지정해 주면 된다. 추후에 지정하고 싶다면 `.gitmodules` 파일에서 `branch=master`와 같이 수작업으로 행을 추가해 주거나 아래와 같은 명령을 수행한다. branch를 지정하면 `detached head` 상태를 피할 수 있다.

```bash
git config -f .gitmodules submodule.<submodule-path>.branch <branch>
```

### main project 속에서 sub project 수정하기

sub project는 그 자체로 독립된 git repo이기 때문에, 일반적인 git 사용법에 따라 관리할 수 있다. 그러나 `submodule update`를 통해 main project 안에 sub project를 가져온 상태에서 sub project를 수정해야 하는 경우에는 몇가지 주의할 점이 있다.

첫째, main project에서 Commit을 할 때, sub project의 변경사항이 있는 경우 main project 및 sub project 각각 두 번의 Commit을 해 주어야 한다. 이 때, Commit은 반드시 ⓐsub project 먼저, ⓑmain project 나중의 순서로 이루어져야 한다. main project를 먼저 commit 하게 되면 main project는 새로운 sub project의 commit을 참조하지 않게 되기 때문이다.

둘째, sub project의 branch를 확인해야 한다. `submodule update`를 수행하면 sub project의 repo가 `Detached HEAD` 상태가 되는 경우가 있다. 이는 어떤 branch에도 속하지 않는 상태를 의미한다. 이런 경우에는 예상치 못한 에러가 발생할 수 있다. 따라서 `git checkout master`등을 수행하여 원하는 branch로 checkout 해 준 뒤에 코드를 수정해야 한다.

main project 상에서 `git submodule foreach git checkout master`와 같은 명령으로 일괄 수행이 가능하다.

#### Edit and push Sub Project

각 sub project는 하나의 독립적인 git repo이기 때문에 일반적인 방식으로 수정과 commit, push를 하면 된다. 단, `git submodule update` 이후에는 sub project의 git repo가 `Detached HEAD` 상태이기 때문에 코드를 수정하기 전에 다음과 같이 branch를 설정해 주어야 한다.

```bash
git checkout master
git pull
```

코드를 수정하고 난 뒤에는 일반적인 방식으로 `commit`과 `push`를 수행하면 된다.


#### Push Main Project

sub project가 수정되면, main project 입장에서 보면, 자기에게 연결된 sub project의 commit이 변경되게 된 것이다. main project와 sub project의 연결 상태가 갱신되었기 때문에 이를 commit 할 필요가 있다. 이 역시 일반적인 방법으로 commit 한다.

다만 push를 할 때에는 sub project의 코드가 모두 push 되었는지 확인할 필요가 있다. 이를 확인하지 않고 push를 수행하면 어떻게 될까. remote repo에 입장에서 보면 main project에 새로운 sub project의 커밋과 연결이 갱신되었다는 정보만 존재하지만 정작 sub project에는 그러한 커밋이 존재하지 않는 결과가 생길 수 있다.

이 때문에 main project를 push 하기 전에는 sub project의 변경 사항을 모두 remote repo로 push 해 두어야 한다. 이 역시 先 sub 後 main의 법칙을 따른 것이다.

sub project가 많은 경우에 이를 일일이 확인하기 어려우므로 다음과 같이 main project를 push할 때 옵션을 주어 확인할 수 있다.

```bash
# main project를 push하기 전에
# 1) submodule이 모두 push된 상태인지 확인하고, 확인이 되면 main project를 push
git push --recurse-submodules=check
# 2) submodule을 모두 push하고, 성공하면 main project를 push
git push --recurse-submodules=on-demand
```

각각을 항상 수행하고 싶다면 다음과 같이 설정을 바꾼다.

```bash
# git push --recurse-submodules=check
git config push.recurseSubmodules check
# git push --recurse-submodules=on-demand
git config push.recurseSubmodules on-demand
```


## Tip

### Detached HEAD

`Detached HEAD` 문제를 피하기 위해서 다음과 같은 습관을 들이면 편리하다.

처음 clone할 때

```bash
# in main project
git submodule init
git submodule update
git submodule foreach git checkout master
```

pull/update 할 때

```bash
# in main project
git pull
git submodule update --remote --merge
```

push 할 때

```bash
# in main project
git push --recurse-submodules=check
```

Git의 `Detached HEAD`에 대해서는 [이 글](http://sunphiz.me/wp/archives/2266)을, submodule과 Detached HEAD에 대해서는 [이 글](https://stackoverflow.com/questions/18770545/why-is-my-git-submodule-head-detached-from-master)을 참고하자.


### 상태 확인

main project에서 바라보고 있는 sub module의 상태 확인하기

```bash
git submodule status
```

main project `git status`에서 submodule 상태 함께 확인하기

```bash
# in main project
git config status.submodulesummary 1
```

### 일괄처리

한 번에 각 서브모듈에 Git 명령을 내리기

```bash
# in main project
git submodule foreach 'git checkout -b featureA'
```

### 단축명령 설정하기

```bash
# git sdiff
git config alias.sdiff '!'"git diff && git submodule foreach 'git diff'"
# git spush
git config alias.spush 'push --recurse-submodules=check'
# git supdate
git config alias.supdate 'submodule update --remote --merge'
```

### submodule 정보 수정

submodule의 remote repo 주소가 변경되었다고 해보자. 이럴 때는 이를 `.gitmodules`에서 수정해 주고 아래와 같이 `.git/config`에 반영해 주어야 한다. ( ["It re-synchronizes the information in .git/config with the information in .gitmodules"](https://stackoverflow.com/a/45679230) ) 

```bash
git submodule sync
```

그러나 이 경우 해당 subproject는 이미 `.git/config`에 등록된 것이어야 한다. `gitmodules`에 새로운 subproject를 추가하고 아래 명령을 주어도 `.git/config`는 등록되지 않는다. subproject를 등록하는 것은 `git submodules add`로만 가능하다. 

### 대량의 submodule을 등록해야 할 때

기본적으로 submodule은 최초에 `git submodule add <url> <path>`을 통해 하나하나 등록해야 한다. 하지만 등록해야 하는 submodule이 많다면 어떻게 해야 할까. git에서 공식적으로 제공하고 있는 방법은 없다. 

`.gitmodules`를 만들어 일괄 등록하는 방법을 적어둔다. `.gitmodules`를 문법에 맞게 먼저 만든다. 파일이 잘 인식되는지는 `git config -f .gitmodules --list`로 확인해 볼 수 있다.

`.gitmodules` 파일에 문제가 없다면 다음 아래 스크립트를 실행시켜 `.gitmodules` 파일 속 submodule 들을 일괄 등록한다. 

REF
* [Restore git submodules from .gitmodules](https://stackoverflow.com/a/11258810)
* [Use a .gitmodules from another project](https://stackoverflow.com/questions/42692250/use-a-gitmodules-from-another-project)

```bash
#!/bin/sh

set -e

git config -f .gitmodules --get-regexp '^submodule\..*\.path$' |
    while read path_key path
    do
        url_key=$(echo $path_key | sed 's/\.path/.url/')
        url=$(git config -f .gitmodules --get "$url_key")
        git submodule add "${url}" "${path}" || true
    done
```

### 등록된 submodule을 초기화 해야 할 때

submodule 등록이 잘못되었거나 수정해야 하거나 하여 초기화 해야 할 때 다음과 같이 실행시킨다.

```bash
# 해당 모듈만 제거할 때
git submodule deinit <path>
# 전체 초기화
git submodule deinit --all
```

## Summary

### Main Project Config 설정해 두기

main project에 다음과 같은 설정을 미리 해 두면 좀 더 편리하게 관리할 수 있다.

```bash
# login
git config credential.helper cache
# status
git config status.submodulesummary 1
# diff
git config diff.submodule log

# 단축명령
## git sdiff
git config alias.sdiff '!'"git diff && git submodule foreach 'git diff'"
## git spush
git config alias.spush 'push --recurse-submodules=check'
## git supdate
git config alias.supdate 'submodule update --remote --merge'
```

### 코드 다루기

sub project는 일반적인 git repository를 관리하는 방식과 완전히 같은 방식으로 관리하면 된다. 따라서 아래 코드들은 main project에서 주로 사용하게 될 명령을  요약해 적어 본다.

#### Clone or update submodules


로컬 저장소에 새로 가져와야 할 경우에는 clone을 수행한다. 

```bash
# If you need new submodule repo in local machine,
# You should clone the main project repo.
# in main project
git submodule init
git submodule update
git submodule foreach git checkout master
```

이미 clone 되어 있는 subdmoule project가 있다면, 작업하기 전에 최신 변경 사항을 반영해 주어야 한다. 

```bash
# If you have submodule repo in local machine,
# You should apply all updates before editing. 
# in main project
git submodule update --remote --merge
```

#### Commit and push sub projects

여러 sub project의 내용을 일괄 변경 하려면, main project에서 `git submodule foreach`를 사용하여 일괄 처리 해 주는 것이 편리하다. 

※ 일괄 수정이 아니고 특정 sub project만 수정한다면, 해당 repo로 이동하여 일반적인 git project처럼 수정 후 commit과 push를 수행한다. 


* Checkout new branch in sub projects ...

```bash
# make new branch and checkout 
# in main project
git submodule foreach git checkout -b newfeature
```

* Update code in sub projects ...

* Commit code in sub projects ...

```bash
# commit and merge
# in main project
git submodule foreach git add -A .
git submodule foreach git commit -am "replacing a to b"
git submodule foreach git checkout master
git submodule foreach git merge newfeature
```

* push sub projects like any other git project

```bash
# in main project
git submodule foreach git push
```


#### Commit and push main project

sub project에 새로운 commit이 생겨나면, main project에서 바라보고 있는 sub project의 commit도 바뀌어야 한다. 따라서 sub project를 모두 수정하고 push까지 완료하고 나면, main project를 commit 한 뒤에 push 한다. 

※ 이 때 주의할 점은 sub project를 먼저 push 하고 나서 main project를 push 해야 한다는 점이다. 

```bash
# in main project
git commit -am "update main project"
git push --recurse-submodules=check
```




## REF

git submodule에 대한 공식 설명은 다음과 같이 확인할 수 있다.

```bash
git submodule --help
```

* [git-scm.com/7.11 Git 도구 - 서브모듈](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-%EC%84%9C%EB%B8%8C%EB%AA%A8%EB%93%88)
