---
layout: post
title:  "Git Branch Workflow"
categories: 코딩삽질기
tags: ['git']
---

Git의 사용법을 익혔다고 해서 프로젝트에 바로 적용할 수 있는 것은 아니다. remote repository는 어떻게 운영할 것인지, 각 branch는 어떤 목적으로  어떤 것들을 만들고 유지해나갈 것인지, commit 메시지와 버전 이름 등은 어떤 방식으로 기입할 것인지 등등 실무적인 문제들이 많다. 특히 여러 사람이 git으로 프로젝트를 진행하기 위해서는 이러한 지침들에 대한 합의가 필요하다. 

이 가운데 줄기에 해당하는 것이 있으니, 바로 코드를 어떻게 개발시켜 나갈 것인지에 대한 청사진이다. 구체적으로는 개발하고 있는 코드를 git branch로 어떻게 운영해 나갈 것인가에 대한 문제이다. "[a successful git branching model](https://nvie.com/posts/a-successful-git-branching-model/)"이라는 글은, 이 경우 git에서 branch를 어떻게 활용할 것인가에 대해 설명하고 있다. 

내용의 대강은 이렇다. master branch와 develop branch를 두 축으로 한다. 

* 개발자들은 작업한 코드를 develop branch에 merge해 나간다. 
  - 이 때 기능을 개발하기 위해 만든 것을 feature branch라고 한다.
* 그러다가 버전을 배포할 때 해당 버전을 master branch에 merge 한다. 
  - 버전을 배포하기 전에 테스트를 위해 만든 것을 release branch라고 한다. 

여러 마디의 말 보다 한 장의 그림이 더 많은 것을 설명할 때가 있다. 아래 그림을 보자. 

![](https://nvie.com/img/git-model@2x.png)
<small>ref: [a successful git branching model](https://nvie.com/posts/a-successful-git-branching-model/)</small>

위 내용은 git 공식 문서 [Git 브랜치 워크플로](https://git-scm.com/book/ko/v2/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-%EB%B8%8C%EB%9E%9C%EC%B9%98-%EC%9B%8C%ED%81%AC%ED%94%8C%EB%A1%9C)의 설명과 큰 틀에서 동일하다. 이 글도 참고해 보자. 





