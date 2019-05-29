---
layout: post
title:  "Git branch 사용하기"
categories: [코딩삽질기]
tags: [git]
---

## project에 새로운 기능을 업데이트 하고 싶다면

기존에 개발하고 있는 project에 새로운 기능을 추가하거나, 이미 있는 기능을 개선하고 싶을 때가 있다. 그런데 그 결과가 좋을지 좋지 않을지 예상하기 어렵다. 어떻게 해야 할까. git의 핵심 기능인 brach를 사용해 보자.

branch는 말 그대로 가지이다. 가지를 하나 내어 코드를 수정하는 방법이다. 그 결과가 좋으면 본류에 합치면 되고, 그 결과가 좋지 않으면 가지를 잘라내 버리면 그만이다. branch는 안전하고 쉬운 코드 수정 방법이다. 때문에 git에서는 코드 수정을 branch를 통해 하는 방법을 권장한다.

사실 git의 모든 코드들은 branch 안에 들어 있다고 할 수 있다. local의 코드를 Upstream의 코드와 합칠 때 다음과 같은 방법을 따른다. 이는 Upstream의 해당 branch를 가져다가 현재의 branch와 merge한다는 의미이다!

```bash
git fetch origin
# 현재 branch에 당겨 받은(fetch) origin repository의 master라는 이름의 branch를 병합함
git merge origin/master
```

모든 git에는 최소 1개 이상의 branch를 가지고 있다. 최초의 branch는 master라는 이름의 branch가 된다. 일반적으로는 작업 순서는 다음과 같다.

* 작업을 위한 새로운 branch를 만들고
* 코드를 수정한 다음
* 새로운 branch를 본류 branch와 합치게 된다.

위의 작업은 다음과 같은 명령으로 수행할 수 있다.

### 새로운 branch 만들기

```bash
# hotfix branch를 만들고 그 쪽을 checkout 한다.
# ( HEAD point가 hotfix branch를 가리키게 한다. )
git checkout -b hotfix
# branch 확인
git status
```

이렇게 하면 hotfix라는 branch를 만들어 그리로 옮겨오게(checkout) 된다. 그런 다음 여러가지 코드 수정을 하고 `commit`을 한다.

### 기존의 branch와 병합하기

이제 본류와 합치는 방법이다. 본류를 `master` branch라고 하자. 우선 먼저 master branch로 건너가야 한다. 그런 다음 `merge`로 합친다.

```bash
# master branch로 옮겨가기
# ( HEAD point가 master branch를 가리키게 한다. )
git checkout master
# hotfix branch를 master branch에 합치기
git merge hotfix
```

### branch 정리하기

hotfix branch가 더이상 필요 없다면 다음과 같이 삭제할 수 있다.

```bash
git branch -b hotfix
```

만약 hotfix의 수정 내용이 마음에 들지 않아 버리고 싶다면 다음과 같이 삭제하면 된다.

```bash
# merge 되지 않은 branch를 그냥 삭제하면 error 메시지가 나오며 삭제되지 않는다.
git branch -D hotfix
```

### REF

* [git-scm.com/3.1 Git 브랜치](https://git-scm.com/book/ko/v2/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-%EB%B8%8C%EB%9E%9C%EC%B9%98%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80)
