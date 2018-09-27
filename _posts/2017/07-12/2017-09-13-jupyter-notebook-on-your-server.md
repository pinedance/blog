---
layout: post
title:  "Jupyter Notebook on Your Server "
categories: 코딩삽질기
---

[Digital Nomad가 되기 위해](https://goo.gl/uAyAcr), server에 jupyter notebook을 설치하고 remote browser에서 사용해 보자.


## Background

[jupyter](http://jupyter.org/index.html)는 python interactive REPL이다. 브라우저 환경에서 코딩과 문서를 함께 작성할 수 있어 편리하다. 처음에는 iPython이라는 이름이었다가, iPython3에서 jupyter로 이름을 바꾸었다고 한다. 자세한 것은 [주피터(Jupyter, IPython >= 3)의 다중 커널 개념 이해하기](http://blog.nacyot.com/tags/ipython_notebook/)를 볼 것.

jupyter notebook을 cloud server에 설치하면 브라우저 환경에서 어디에서든 문서 작성이 가능하다. ubuntu server에 설치해 보았다.

## Overview

과정은 이렇다.

1. Jupyter notebook 설치

2. Kernel 설치 (optional)

3. local이 아닌 외부에서 접근할 수 있도록 설정

4. jupyter notebook을 server system service로 등록

## Step by Step

### Jupyter notebook 설치

```
pip3 install jupyter
```

python3 이외에 python2나 기타 언어를 사용하기 위해서는 Kernel 설치가 필요하다. 생각보다 간단하다.


```
# install kernels for Jupyter
python -m pip install ipykernel
python -m ipykernel install
```

사용 가능한 커널을 확인해 보자.  `jupyter kernelspec list`


### local이 아닌 외부에서 접근할 수 있도록 설정

아래와 같이 하면 config file 위치가 표시된다. 이 파일을 열어 내용을 조정한다.

```
jupyter notebook --generate-config
# 보통 `~/.jupyter/jupyter_notebook_config.py `에 위치한다.
```

외부에서 접근하려면 대략 아래와 같은 것들이 입력되어야 한다.

```
c.NotebookApp.allow_origin = '*'
c.NotebookApp.ip = '*' # or '123.456.789.001'
c.NotebookApp.open_browser = False
c.NotebookApp.password = 'sha1:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
c.NotebookApp.password_required = True
c.NotebookApp.port = 8282
```

`c.NotebookApp.password`에 입력할 값은 python shell에서 아래와 같이 입력한 뒤 password를 입력하고 난 다음 받은 hash 값이다.

```python
# python shell
from notebook.auth import passwd ; passwd()
```

## jupyter notebook을 server system service로 등록

이 부분은 [Ubuntu 16.04 system service 등록하기](https://goo.gl/HnjkbC)를 참조할 것

## 현재 실행 중인 notebook app 확인

```bash
# bash
cat /home/ubuntu/.jupyter/jupyter_notebook_config.py | egrep ^c.NotebookApp
```

## Summary

생각보다 큰 무리 없이 설치할 수 있었다.


## REF

* [IPython Installation (official)](http://ipython.readthedocs.io/en/stable/install/index.html)
* [jupyter Installation (official)](http://jupyter.readthedocs.io/en/latest/install.html)
* [Jupyter 서버 설치 및 실행법](https://goo.gl/JJkLwV)
* [ipython notebook as service via systemd on ubuntu 16.04 ](https://www.jayakumar.org/linux/ipython-notebook-as-service-via-systemd-on-ubuntu-16-04-with-theano-gpu-support/)
