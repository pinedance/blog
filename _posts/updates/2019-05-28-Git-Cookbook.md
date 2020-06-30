---
layout: post
title:  "[Cookbook] Git, 이럴 때 이렇게 한다."
categories: [코딩삽질기, Cookbook]
tags: ['git']
---

git은 프로젝트를 버전에 따라 관리할 수 있도록 도와주는 유용한 툴이다. git을 사용할 때 마주하게 되는 문제와 해결 방법을 적어 둔다.

예시로 remote repo 주소를 `https://myrepo.github.com/coolproject.git`라고 해보자.

## Clone single branch only

작업 과정에서 오류를 줄이기 위해 local에 작업 branch만을 받아오고 싶을 때가 있다. 예를 들어 작업 branch가 `develop`이라면, master branch 없이 develop branch만 local에 받아와 작업하고 push와 pull을 하면 좋을 것이다. 이런 경우에는 clone을 할 때 해당 branch만 받아 올 수 있다. [ref](https://stackoverflow.com/questions/1911109/how-to-clone-a-specific-git-branch)

```bash
# remote:   http://www.myrepo.git
# * origin/master
# * origin/develop
git clone --single-branch --branch develop http://www.myrepo.git
git push -u origin develop
```

## File names with non ASCII characters

한글로 쓰여진 파일 이름이 decoding 상태로 표시되는 경우에는 다음과 같이 설정을 변경시켜 준다.

```bash
git config --global core.quotepath false
```

{% for post in site.posts %}
{% if "git" in post.categories %}

## [{{ post.title }}]({{ post.url }})

{% endif %}
{% endfor %}
