---
layout: post
title:  "Git branch 사용하기"
categories: [코딩삽질기]
tags: [git]
---

> 데이터 조작은 사본(copy)을 사용한다.
> 코드 수정은 git branch를 사용한다.

## branch란?

기존에 개발하고 있는 project에 새로운 기능을 추가하거나, 이미 있는 기능을 개선하고 싶을 때가 있다. 하지만 수정은 항상 되돌릴 여지를 주어야 한다. 수정 후의 결과가 좋을지 좋지 않을지 예상하기 어렵기 때문이다. 그렇다면 git에서는 어떻게 해야 할까. git의 핵심 기능인 brach를 사용해야 한다.

branch는 말 그대로 '가지'이다. 가지를 하나 내어 코드를 수정하는 방법이다. 그 결과가 좋으면 '본류'에 합치면 되고, 그 결과가 좋지 않으면 가지를 잘라내 버리면 그만이다. branch는 안전하고 쉬운 코드 수정 방법이다. 때문에 git에서는 코드 수정 시 branch 사용을 권장하고 있다.

사실 git의 모든 코드들은 branch 안에 속해 있다. ([Detached HEAD](http://sunphiz.me/wp/archives/2266)의 경우는 예외이다.) local의 코드를 Upstream의 코드와 합칠 때 다음과 같은 방법을 따르는데, 이를 풀어 보면 Upstream의 해당 branch를 가져다가 현재의 branch와 merge한다는 의미이다!

```bash
# Upstream(origin)의 branch를 당겨 받아(fetch)
git fetch origin
# origin repository의 master라는 이름의 branch와 병합함
git merge origin/master
```

위의 코드는 `git pull origin master`라고 축약해 쓸 수 있다. 이 경우 origin remote repository이 master branch를 당겨오겠다는 의미가 된다.

모든 git에는 최소 1개 이상의 branch를 가지고 있다. 최초의 branch는 master라는 이름의 branch가 된다.

## Branch 사용

코드를 수정할 때, git branch를 활용하는 작업 순서는 보통 다음과 같다.

* 작업을 위한 새로운 branch를 만들고
* 코드를 수정한 다음
* 새로운 branch를 본류 branch와 합치게 된다.

위의 작업은 다음과 같은 명령으로 수행할 수 있다.

### 새로운 branch 만들기

작업하던 코드에 오류가 발생하여 수정해야 한다고 생각해 보자. 기존 코드는 master branch에 있다. 우리는 이 코드를 그대로 수정하지 않고 hotfix라는 branch를 만들어 수정한 다음, 결과가 좋으면 본래의 master branch에 반영할 것이다.

먼저 hotfix branch를 만든다. ⓐbranch를 만들고 ⓑ그 branch로 이동(checkout)해야 한다.

```bash
# ⓐbranch를 만들고
git branch hotfix
# ⓑ그 branch로 이동
git checkout hotfix
```

이 두 동작은 매우 자주 사용되기 때문에 git에서 이 두 동작을 다음과 같이 한 번에 수행할 수 있다게 해준다.

```bash
# hotfix branch를 만들고 그 쪽을 checkout 한다.
# ( HEAD point가 hotfix branch를 가리키게 한다. )
git checkout -b hotfix
```

이렇게 하면 hotfix라는 branch를 만들어 그리로 옮겨오게(checkout) 된다. 그런 다음 여러가지 코드 수정을 하고 `commit`을 한다.

### 코드의 수정

다음과 같이 현재 어떤 branch에 있는지 확인할 수 있다.

```bash
# branch 확인
git status
```

hotfix branch에 있다는 것을 확인하고 나면, 이제 마음껏 코드를 수정해 보자. master branch의 코드와는 완전히 격리되어 영향을 주지 않는다.


### 기존의 branch와 병합하기

hotfix branch에서 코드를 성공적으로 수정하였다. 이 수정 사항을 프로젝트의 메인 코드(본류)에 적용시켜 보자.

프로젝트의 메인 코드가 master branch라고 한다면, ⓐ먼저 master branch로 건너간 뒤에 ⓑ`merge`로 합친다.

merge는 현재 위치한 branch를 기준으로 상대 branch를 병합하기 때문에 merge를 할 때는 본류가 되는 branch로 옮겨 와야 한다.

```bash
# master branch로 옮겨가기
# ( HEAD point가 master branch를 가리키게 한다. )
git checkout master
# hotfix branch를 master branch에 합치기
git merge hotfix
```

### branch 정리하기

현재 프로젝트의 branch들은 다음과 같이 확인할 수 있다.

```bash
git branch -v
```

보통 이런 절차를 끝내고 나면 hotfix branch는 더 이상 필요 없게 된다. 다음과 같이 삭제할 수 있다.

```bash
git branch -b hotfix
```

만약 hotfix의 수정 내용이 마음에 들지 않아 버리고 싶다면 다음과 같이 삭제하면 된다.

```bash
# merge 되지 않은 branch를 그냥 삭제하면
# error 메시지가 나오며 삭제되지 않는다.
git branch -D hotfix
```

## 심화

### merge after rebase

merge하기 전에 git log를 정리하기 위해 git의 `rebase`를 사용하기도 한다. rebase는 "한 브랜치에서 변경된 사항을 다른 브랜치에 적용하는 방법"이다. 이에 대해서는 [이 글](https://git-scm.com/book/ko/v2/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-Rebase-%ED%95%98%EA%B8%B0)을 참고하도록 하자. rebase는 유용한 방법이지만 아래 주의사항은 반드시 지키자.

* Push로 내보낸 커밋에 대해서는 절대 Rebase 하지 말라!

pull을 할 때 rebase를 적용하려면 '[Git Pull시에 자동으로 Rebase적용하기](http://theeye.pe.kr/archives/1980)'를 참고한다.

### workflow with branch

협업에서 branch를 사용하는 일반적인 방법에 대해서는 [브랜치 워크플로](https://git-scm.com/book/ko/v2/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-%EB%B8%8C%EB%9E%9C%EC%B9%98-%EC%9B%8C%ED%81%AC%ED%94%8C%EB%A1%9C)을 참고하라.

### REF

* [git-scm.com/3.1 Git 브랜치](https://git-scm.com/book/ko/v2/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-%EB%B8%8C%EB%9E%9C%EC%B9%98%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80)

이해를 더 깊게 하고 싶다면 [생활코딩](https://www.youtube.com/channel/UCvc8kv-i5fvFTJBFAk6n1SA)의 관련 부분을 참고하자.

<iframe width="560" height="315" src="https://www.youtube.com/embed/PmWPdYkAMg4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/GK8R3SjG3B4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/vKMt21YSC0g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/wag7urnz7Iw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/k8fsn335YLQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
