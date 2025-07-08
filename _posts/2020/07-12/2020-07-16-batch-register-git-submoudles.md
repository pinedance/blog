---
layout: post
title:  "Git submodule 일괄등록하기"
categories: [코딩삽질기]
tags: [git]
---

## 배경

Git submodule은 유용하지만, 다루기 쉽지 않다. Git submodule 사용에 대한 전반적인 내용은 [Git submodule 사용하기]({{ site.baseurl }}/2019/05/28/Git-Submodule)를 참고하자.

여기서는 많은 수의 submodule을 등록해야 하는 경우를 설명해 보자. 기본적으로 submodule은 최초에 `git submodule add <url> <path>`을 통해 하나하나 등록해야 한다. 하지만 등록해야 하는 submodule이 많다면 어떻게 해야 할까. `.gitmodules` file을 이용하여 일괄 등록할 수 있을 것 같지만, git에서 공식적으로 제공하고 있는 방법은 없다. 따라서 개인적으로 스크립트를 만드는 등의 방법으로 처리해야 한다.

## 방법 (권장)

먼저 `.gitmodules`과 같은 문법으로 `MY_GITMODULES` 파일을 만든다. 참고로 이 파일은 [ini 형식](https://ko.wikipedia.org/wiki/INI_%ED%8C%8C%EC%9D%BC)이다. `MY_GITMODULES`의 이름을 `.gitmodules`로 하면, 예전내용에서 나타나는 문제가 똑같이 발생한다. 따라서 다른 이름으로 하자.

그리고 아래의 python 스크립트 [`add_gitmodules.py`](https://gist.github.com/pinedance/e5a4047db89ce87511e267dc1f5130d2#file-add_gitmodules-py)을 받아 아래와 같이 실행하자.

```bash
add_gitmodules.py MY_GITMODULES
```

python 스크립트의 내용과 MY_GITMODULES의 예시는 아래와 같다.

<script src="https://gist.github.com/pinedance/e5a4047db89ce87511e267dc1f5130d2.js"></script>

***

아래 내용은 예전에 적었던 내용인데, 기록을 남기는 목적으로 남겨둔다. 이렇게 하면 `git submodule add`를 실행할 때 `.gitmodules`에 데이터가 추가되어 결과적으로 중복 데이터가 생기는 문제가 발생한다. 위의 방법으로 처리하자.

## 예전방법 (비추)

`.gitmodules`를 문법에 맞게 먼저 만든다. 파일이 잘 인식되는지는 `git config -f .gitmodules --list`로 확인해 볼 수 있다.

`.gitmodules` 파일에 문제가 없다면 다음 아래 스크립트를 실행시켜 `.gitmodules` 파일 속 submodule 들을 일괄 등록한다.

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

## REF

* [Restore git submodules from .gitmodules](https://stackoverflow.com/a/11258810)
* [Use a .gitmodules from another project](https://stackoverflow.com/questions/42692250/use-a-gitmodules-from-another-project)
