---
layout: post
title:  "[Cookbook] Python, 이럴 때 이렇게 한다."
categories: [코딩삽질기, Cookbook]
---

Python을 더 깊이 사용하기 위해 도움이 되는 자료 목록을 정리해 둔다.

[Automate the Boring Stuff with Python](https://automatetheboringstuff.com/)

[Awesome Functional Python](https://github.com/sfermigier/awesome-functional-python/blob/master/README.md)

Anaconda python, 다운로드가 잘 안될 때가 있다. mirror page에서 다운로드 받을 수 있다.

[Anaconda python mirror](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/)


## Python Tip

`pip`로 library 설치시 permission error시 `--user` flag를 붙여 준다.

```
pip install --upgrade <libraryname> --user
```

## anaconda python

### Conda Shell

#### install packages via anaconda

ananconda python을 사용한다면, python package를 설치할 때 pip보다 conda를 먼저 시도해 보는 것이 좋다. python package는 c로 작성되어 있는 것이 많은데, pip로 설치하면 설치 과정에서 에러가 나는 경우가 많기 때문이다. 특히 windows 시스템의 경우 컴파일 에러가 빈번하게 발생한다. `conda install`로 설치를 시도하면 이러한 번거로움을 피할 수 있다.

다만 기본 repository에서는 설치할 수 없는 package들이 많다. 따라서 새로운 conda-forge와 같은 새로운 repository를 추가해 줄 필요가 있다. 다음과 같이 말이다.

```conda shell
conda config --add channels conda-forge
conda install <package-name>
```

#### install packages with requirements.txt

`conda install`에서 requirements.txt 파일에 적혀 있는 package들을 일과적으로 설치하고 싶을 때가 있다. 이런 경우에는 다음과 같이 할 수 있다.

```conda shell
conda install --yes --file requirements.txt
```

## print 결과를 파일에 출력하기

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

## python 정보들 강좌들 (초급 탈출?)

* [파이썬(Python) 초급부터 고급까지](https://www.youtube.com/playlist?list=PLRx0vPvlEmdD8u2rzxmQ-L97jHTHiiDdy)

* [파이썬 텐서플로우 & 머신러닝 기초](https://www.youtube.com/playlist?list=PLRx0vPvlEmdAbnmLH9yh03cw9UQU_o7PO)

* [파이썬을 배우는 최고의 방법@n0lb00's Blog](https://nolboo.kim/blog/2014/08/10/the-best-way-to-learn-python/)

***

## Libraries

[NetworkX](https://networkx.github.io/)
* [overview ppt by Salvatore Scellato](https://www.cl.cam.ac.uk/~cm542/teaching/2011/stna-pdfs/stna-lecture11.pdf)
* [backbone_extractor.py](https://gist.github.com/brianckeegan/8846206)
* [NetworkX를 이용한 네트워크 분석 / PYCON Korea 2014](https://www.pycon.kr/2014/program/7)

[nltk](http://www.nltk.org/api/nltk.html)
