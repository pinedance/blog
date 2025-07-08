---
layout: post
title:  "[Cookbook] Python, 이럴 때 이렇게 한다."
categories: [코딩삽질기, Cookbook]
tags: ['python']
---

## 배경

Python을 사용하면서 얻은 잔기술들을 기록해 둔다.

## 내용이 많아 따로 작성한 페이지

{% include post_list_subject.html subject="python" %}

## Install python

ubuntu를 기준으로 설명한다. 보통 이미 설치되어 있다.

하지만 다양한 버전이 필요하거나 관리의 편의를 의해 버전관리 도구를 통해 설치하는 것이 유리할 수 있다. 이런 경우 Anaconda python을 사용하자. [Anaconda python 홈페이지](https://www.anaconda.com/distribution/#linux)에서 설치 프로그램을 다운로드 받아 설치하면 된다. 가끔 다운로드가 잘 안될 때가 있다.[Anaconda python mirror](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/)에서 다운로드 받을 수 있다.

Anaconda python이 너무 무거울 수 있다. 이럴 때는 [Miniconda](https://docs.conda.io/en/latest/miniconda.html)를 설치하자. 개인적으로 필자는 Miniconda를 선호한다. 단 Miniconda에는 jupyter notebook과 같은 기능이 포함되어 있지 않다. 따라서 아래와 같이 별도로 설치해 준다.

```bash
conda install jupyter
```

참고로, Windows에 anaconda나 miniconda를 설치했을 경우에는 `anaconda prompt`로 접근해야 올바르게 사용할 수 있다. 기본 `cmd`나 `power shell`로 접근하면 anaconda 환경이 올바르게 로딩되지 않기 때문에 사용에 제한이 있다. [windows terminal을 설치하고 여기에 anaconda prompt를 추가해 두면 사용이 편리하다](//{{ site.baseurl }}/2020/06/23/Windows-Terminal#condashell%EC%9D%84-%EC%B6%94%EA%B0%80%ED%95%B4-%EB%B3%B4%EC%9E%90).

## Use package

python의 가장 큰 강점 중의 하나는 막강한 user community이다. 이 커뮤니티에서 생산된 수많은 package들은 거의 모든 작업을 가능하도록 도와주는 든든한 지원군이다.

### Install package

이미 만들어져 공개된 package들을 가져와 사용하려는 어떻게 해야 할까.

#### Install package via pip ( pip3 )

python의 package 설치 프로그램인 `pip`를 이용해 설치하는 것이 정석이다. 다만 다음과 같은 문제가 발생할 수 있다.

```bash
pip install <libraryname>
```

`pip install <package-name>`을 했더니 `pip`가 없다는 메시지가 나타날 수 있다. 이런 경우는 `pip3`로 대신해 보자. python2와 python3가 함께 설치되어 있을 때, 전자가 python와 pip, 후자가 python3와 pip3로 연결되어 있는 경우가 많기 때문이다.

`pip`로 library 설치시 permission error가 나타나면 `--user` flag를 붙여 준다.

```bash
pip install --upgrade <libraryname> --user
```

SSL 문제로 연결이 되지 않을 수 있다. 이 때는 [여기]({{ site.baseurl }}/2017/11/02/how-to-bypass-SSL)를 참고하라.

#### Install packages via anaconda

ananconda python을 사용한다면, python package를 설치할 때 pip보다 conda를 먼저 시도해 보는 것이 좋다. python package는 c로 작성되어 있는 것이 많은데, pip로 설치하면 설치 시 컴파일 과정에서 에러가 나는 경우가 많기 때문이다. 특히 windows 시스템의 경우 컴파일 에러가 빈번하게 발생한다. `conda install`로 설치를 시도하면 이러한 번거로움을 피할 수 있다.

다만 기본 repository에서는 설치할 수 없는 package들이 많다. 따라서 새로운 conda-forge와 같은 새로운 repository를 추가해 줄 필요가 있다. 다음과 같이 말이다.

```bash
# conda shell
conda config --add channels conda-forge
conda install <package-name>
```

#### Install packages with requirements.txt

python project에서는 통상 `requirements.txt` 파일에 의존하고 있는 package들을 적어 두고 일괄적으로 관리한다.

이 파일에 명시된 package들을 일과적으로 설치하려면 다음과 같이 한다.

```bash
pip install -r requirements.txt
```

만약 `anaconda python`을 이용해 일괄 설치를 하려면 `conda install`을 통해 다음과 같이 할 수 있다.

```bash
# conda shell
conda install --yes --file requirements.txt
```

#### Build requirements.txt

`requirements.txt` 파일은 내 개발 환경에서 설치된 package들을 참조해 작성하기 마련이다. 손으로 일일이 작성하기 보다는 다음과 같이 시작해 보자.

```bash
pip freeze > requirements.txt
```

### 환경 변수 설정하기

python로 project를 진행할 때 스스로 package(`.py` 파일)를 만들어 project 안에서 참조해야 하는 경우가 발생할 수 있다. 참조 대상이 되는 custom package 파일이 같은 폴더나 하위 폴더에 있는 파일일 경우에는 상대 주소를 통해 참조가 가능하지만 상위 폴더나 형제 폴더의 경우에는 그렇게 할 수 없다. 이런 경우에는 프로젝트 내에서 package를 어디서 참조해야 하는지 환경변수를 통해 지정해 주어야 한다.

현재 프로젝트 폴더에 있는 `packages` 폴더에 작성한 파일들을 넣고 참조한다고 가정해 보자.

ubuntu에서는 bash를 사용한다. [Bash-스크립트에서-환경변수-설정하기]({{ site.baseurl }}/2019/05/09/Bash-Cookbook#bash-스크립트에서-환경변수-설정하기)를 참조한다.

windows에서는 다음과 같이 한다.

```cmd
set PYTHONPATH=%cd%\packages
```

python code 안에서 선언할 수도 있다. 좀 복잡하지만 아래와 같이 한다.

```python
import os, sys

file_path = os.path.realpath( __file__  )
dir_path = os.path.dirname( file_path )
os.chdir( dir_path )
print( "# Current Working Path:", os.getcwd() )
my_path = os.path.abspath( os.path.dirname( __file__ ) )

package_path = "packages"
package_abspath = os.path.join( my_path, package_path )
print( "# Append packag path:", package_abspath )
sys.path.append( package_abspath )
```

## Input and output

### Print 결과를 파일에 출력하기

`stdout`으로 출력하는 print와 file에 적는 write는 그 결과에서 차이가 있다.

때때로 `format`을 이용하여 복잡하게 모양을 만들어 파일에 적는 대신, 그냥 프린트 되는 내용을 파일에 담고 확인해 보고 싶을 때도 있다. 이럴 때 어떻게 할까?

```python
import sys

# system의 stdout을 파일로 바꿔 준다.
sys.stdout = open("result.txt", 'w', encoding="utf-8")

print("Hello World!")    # 화면 대신 "result.txt" 파일에 출력된다.

# 다시 본래 상태로 되돌리려면 다음과 같이 입력한다.
sys.stdout = sys.__stdout__

# ref : https://stackoverflow.com/questions/4675728/redirect-stdout-to-a-file-in-python
```

***

## Packages

### Natural Language Processing

[nltk](http://www.nltk.org/api/nltk.html)

### Network Analysis

[NetworkX](https://networkx.github.io/)

* [overview ppt by Salvatore Scellato](https://www.cl.cam.ac.uk/~cm542/teaching/2011/stna-pdfs/stna-lecture11.pdf)
* [backbone_extractor.py](https://gist.github.com/brianckeegan/8846206)
* [NetworkX를 이용한 네트워크 분석 / PYCON Korea 2014](https://www.pycon.kr/2014/program/7)

***

## python 정보들 강좌들 (초급 탈출?)

* [파이썬(Python) 초급부터 고급까지](https://www.youtube.com/playlist?list=PLRx0vPvlEmdD8u2rzxmQ-L97jHTHiiDdy)

* [파이썬 텐서플로우 & 머신러닝 기초](https://www.youtube.com/playlist?list=PLRx0vPvlEmdAbnmLH9yh03cw9UQU_o7PO)

* [파이썬을 배우는 최고의 방법@n0lb00's Blog](https://nolboo.kim/blog/2014/08/10/the-best-way-to-learn-python/)

***

## Deep Dive

Python을 더 깊이 사용하기 위해 도움이 되는 자료 목록을 정리해 둔다.

* [Automate the Boring Stuff with Python](https://automatetheboringstuff.com/)
* [Awesome Functional Python](https://github.com/sfermigier/awesome-functional-python/blob/master/README.md)
