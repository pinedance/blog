---
layout: post
title:  "Jupyter Notebook에서 ruby 사용하기 "
categories: 코딩삽질기
tags: ['ruby', 'jupyter_notebook']
---

Jupyter Notebook에서 ruby를 사용해 보자!

## Background

jupyter는 python interactive REPL이다. 브라우저 환경에서 코딩과 문서를 함께 작성할 수 있어 편리하다.

jupyter는 iPython3부터 바뀐 이름이다. 기본적으로 python3에서 작동한다. jupyter는 다중 kernel을 통해 python3 뿐만 아니라 python2, 심지어 ruby 등 다른 언어까지 연결하여 사용할 수 있다. iPython이 python에 대한 의존성이 줄어들었기 때문이라고 한다. 자세한 사항은 [주피터(Jupyter, IPython >= 3)의 다중 커널 개념 이해하기](http://blog.nacyot.com/articles/2015-05-08-jupyter-multiple-pythons/)에 잘 정리되어 있다.

## Overview

일단 jupyter를 설치한다. jupyter를 설치하고 활용하는 방법에 대해서는

jupyter에서 ruby를 사용하는 outline은 다음과 같이 간단하다.

1. jupyter 설치 ( [Jupyter Notebook on Your Server](https://goo.gl/nXtCxx)를 참조 )
2. ruby 설치
3. ruby gem인 iruby 설치와 등록

여기에서는 3에 관해서만 기록해 둔다.

IRuby 설치는 [공시 페이지](https://github.com/SciRuby/iruby)에 잘 정리되어 있다.

`jupyter kernelspec list`로 설치가 되었는지 확인해 보자.

하지만 실제로 하면서 몇가지 문제가 생겼다.

설치를 마치고 jupyter notebook에서 ruby kernel이 열리기는 하였지만 다음과 같은 메시지를 내 뿜으며 작동하지 않았다.

```
The kernel appears to have died. It will restart automatically.
```

## Errors, always ...


### Error1

bash에서 `iruby`를 직접 실행해 보니 다음과 같은 경고문을 볼 수 있었다.

```
Could not load bundler: Could not locate Gemfile or .bundle/ directory
```

경고문으로 실행에는 문제가 없다고 하지만 일단 jupyter 실행 폴더에 다음과 같은 Gemfile을 만들어 넣어 해결할 수 있었다. [참고](https://stackoverflow.com/a/36044873)

```
# ./Gemfile
gem 'iruby'
gem 'rbczmq' # or 'ffi-rzmq'
gem 'nyaplot'

# any other gems you want to use should go here too
```


### Error2

여전히 실행이 안된다. 필요한 프로그램들이 모두 설치되지 않았다고 생각하여 Gemfile에 있는 gem들을 다시 설치해 보았다. 그러던 중 `rbczmq`  설치 중에 다음과 같은 오류와 함께 설치가 중단되었다.

```
ERROR:  Error installing rbczmq:
        ERROR: Failed to build gem native extension.
"./autogen.sh"
autogen.sh: error: could not find libtool.  libtool is required to run autogen.sh.
ZeroMQ autogen failed!
```

`libtool`의 경우 ubuntu에 이미 설치되어 있었기 때문에 해결책을 알 수 없었다. mac의 경우 `autogen`을 설치해서 해결했다는 [경험](https://github.com/methodmissing/rbczmq/issues/36)도 있었지만, 효과가 없었다. 삽질 끝에 [여기](https://stackoverflow.com/a/38043531)를
 보고 `libtool-bin`을 설치하여 `rbczmq` gem을 설치할 수 있었다.

### Error3

하지만 그런 뒤에도 kernel은 계속 죽었다.

Gemfile에 `iruby`, `rbczmq`를 넣어 주는 것이 중요한 듯하다. ( [단서](https://github.com/SciRuby/iruby/issues/74) )


## Summary

gem 설치 : `gem install cztop iruby rbczmq`

* rbczmq 설치에 문제가 생기면 `sudo apt-get install libtool-bin`

등록 `iruby register --force`

실행 폴더에 Gemfile 만들어 주기

```
# ./Gemfile
gem 'iruby'
gem 'rbczmq'
gem 'nyaplot'
```

## REF

* [[RORLab 발표] 주피터(Jupyter) - IRuby Notebook 보충](http://blog.nacyot.com/articles/2015-04-15-rorlab-jupyter-iruby-notebook/)
