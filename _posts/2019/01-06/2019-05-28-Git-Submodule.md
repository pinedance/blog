---
layout: post
title:  "Git submodule 사용하기"
categories: [코딩삽질기]
tags: [git]
---


## sub project를 의존해서 main project를 관리해야 할 때

예를 들어 main project가 sub project에 의존하고 있다고 하자. main project와 sub project 모두 git으로 버전을 관리해야 한다면, 이 파일들을 어떻게 관리해야 할까.

우선 main project에는 sub project의 파일이 포함되지 않는 편이 좋다. sub project는 별도로 개발되고 있기 때문에 main project 관리자가 sub project를 수정해서는 곤란하기 때문이다. 만약 수정하는 순간 sub project와의 연관성은 깨어지게 된다. 또 main project의 용량을 경량화 하는데도 필요한 일이다.

따라서 다음과 같은 관리 방법이 효율적일 것이다.

* main project에서는 sub project의 내용을 관리하지 않는다.
* main project에는 sub project의 어떤 버전을 의존할지, 어떤 하위 폴더에 넣을 지만 명세로 작성하여 관리한다.
* 필요할 때 sub project의 해당 버전을 가져다 main project 내 적절한 폴더에 위치시켜 사용한다.

이를 수작업으로 한다면 다음과 같이 할 수 있다.

* sub project의 원하는 버전을 다운로드 받아 main project 속 적절한 폴더에 넣는다.
* 이 폴더를 `.gitignore`를 이용해 main project의 버전관리에서 제외 시킨다.
* main project에서  sub project의 새로운 버전이 필요하다면 그때 sub project를 다운로드 받아 해당 폴더에 덮어쓴다.

좀 익숙한 방법 아닌가. 그렇다. 우리는 이미 이러한 방식을 사용하고 있다. 예를 들어 `node`를 이용하여 웹서버를 개발한다고 해보자. 이를 위해 우리는 여러가지 node package들을 활용한다. 이 때 우리가 개발하고 있는 웹서버가 main project이고, 사용하려는 node package들이 sub project가 된다. `npm`을 이용해 package를 다운로드 받으면, `package.json` 파일에 해당 package 이름과 버전이 명시되고 웹서버 폴더 속에 있는 `node_modules` 폴더에 차례로 다운로드 받아지게 된다. 하지만 우리는 웹서버 코드를 관리할 때 이 `node_modules` 폴더를 `.gitignore`에 넣고 관리하지 않는다. 우리가 개발하는 웹서버에서 수정할 수 있는 파일도 아니며, 필요하면 `package.json`을 통해 다시 다운로드 받으면 되기 때문이다.

하지만 sub project가 npm이나 pip, gem 등으로 관리되고 있지 않고, git 형태로만 존재한다면 어떻게 해야 할까. git submodule을 사용할 수 있다. git submodule은 git 저장소 안에 다른 git 저장소를 분리해 넣고 관리하게 해 주는 git의 기능이다.

### 이미 만들어진 main project clone 하기

일반적으로는 이미 submodule로 관리되고 있는 main project를 다운로드 받는 일을 해 보자. 이해를 돕기 위해 앞의 웹서버의 예를 다시 들어보자.

누군가 이미 개발해 놓은 웹서버를 로컬 환경에 받아 테스트 해 본다고 해보자. 웹서버 자체는 `git clone`으로 다운로드 받을 수 있다. 하지만 이 웹서버가 의존하고 있는 node package들은 함께 다운로드 되지 않는다. 우리는 `npm install`을 통해 `package.json`에 명시되어 있는 node module들을 다운로드 받을 수 있다.

git의 submodule 역시 비슷한 과정을 거친다. 먼저 main project를 clone한 뒤에 sub project를 clone할 수 있다.

main project를 clone 하면, `.gitmodules`라는 파일을 볼 수 있을 것이다. 이 파일을 열어 보면 sub project가 main project에서 위치할 폴더명과 git repo 주소가 적혀 있는 것을 볼 수 있다.

```bash
# clone main project
git clone https://myrepo.github.com/mainproject.git
```

우리는 아래의 `submodule` 명령을 통해 `.gitmodules`에 명시되어 있는 sub project들을 차례로 clone해 올 수 있다. 이 때 sub project에 대한 접근권한이 없다면 clone을 수행할 수 없으므로 유의하자. 또 remote repo 주소가 https로 되어 있는 경우에는 login에 필요한 정보를 요구할 수 있다. 일일이 입력하기 힘들다면 Git Credential을 참고하자.


```bash
# git local config에 submodule을 인지시킴
# 명령 전후로 git config list를 확인해 보자
git submodule init
# clone submodules
git submodule update
```

위와 같은 과정을 하나의 명령으로 처리할 수도 있다.

```bash
git clone --recurse-submodules https://myrepo.github.com/mainproject.git
```

### main project 최신으로 update 하기

원격 저장소의 최신 버전으로 update하려면 아래 2가지 방법이 있다.

* 각각의 sub project에서 fetch/merge 혹은 pull하기
* main project에서 `git submodule update --remote --merge` 수행하기


### submodule 만들기

```bash
git clone https://myrepo.github.com/mainproject.git
cd mainproject
# git clone https://myrepo.github.com/subproject1.git 대신 아래와 같이 하자.
git submodule add ../subproject1.git
# git clone 때처럼 target folder를 지정할 수도 있다.
git submodule add ../subproject002.git subproject2  
```

### main project에서 sub project 수정하기

* 각 서브모듈 디렉토리로 가서 추적할 브랜치를 Checkout
* git submodule update --remote 명령을 실행해 Upstream 에서 새로운 커밋을 가져온다

Master Repository에서 Commit을 할 때, Slave Repository의 변경사항이 있는 경우 Master 및 Slave 각각 두 번의 Commit을 해 주어야 합니다. 이 때, Commit은 반드시 Slave → Master의 순서로 이루어져야 합니다.

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


### Tip

main project에서 바라보고 있는 sub module의 상태 확인하기

```bash
git submodule status
```

main project `git status`에서 submodule 상태 함께 확인하기

```bash
# in main project
git config status.submodulesummary 1
```

한 번에 각 서브모듈에 Git 명령을 내리기

```bash
# in main project
git submodule foreach 'git checkout -b featureA'
```

단축명령 설정하기

```bash
# git sdiff
git config alias.sdiff '!'"git diff && git submodule foreach 'git diff'"
# git spush
git config alias.spush 'push --recurse-submodules=on-demand'
# git supdate
git config alias.supdate 'submodule update --remote --merge'
```

### REF

* [git-scm.com/7.11 Git 도구 - 서브모듈](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-%EC%84%9C%EB%B8%8C%EB%AA%A8%EB%93%88)
