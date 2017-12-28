---
layout: post
title:  "Python으로 browser를 제어해 보자."
categories: 코딩삽질기
---

> python, selenium으로 browser를 제어해 보자. 

anaconda python을 기준으로 설명한다. 

## 과정

python으로 browser를 제어하는 과정은 다음과 같다. 자세한 내용은 [공식 문서](http://selenium-python.readthedocs.io/installation.html#drivers)를 참고하자.

```
python -> selenium (python package, Selenium Client) - -> webdriver -> browser
```

## 준비

### Webdriver

selenium은 나중에 설치하도록 하고, 먼저 webdriver를 다운로드 받는다. webdriver는 browser마다 다르며, [여기](http://selenium-python.readthedocs.io/installation.html#drivers)에서 목록과 주소를 찾을 수 있다. 

Internet Exporer의 경우에는 따로 준비되어 있는데, [32bit](https://goo.gl/rjZrvz)를 설치해주는 것이 좋다. 64bit를 설치하면 [text가 상당히 느리게 입력되는 문제](https://goo.gl/9xQcnE)가 있기 때문이다. 

주의해야 할 점은 이 webdriver들이 windows cmd 환경에서 실행될 수 있도록 `%path%` 내에 포함되어 있어야 한다는 점이다. 예를 들어 webdriver들을 `c:\webdriver` 폴더 아래 모아 두었다면, windows 환경변수에서 `%path%` 내용에 `c:\webdriver\`를 추가해 주어야 한다. 그렇지 않으면 selenium이 webdriver를 찾을 수 없다는 메시지를 내보낸다. `%path%` 설정에 대해서는 [여기](http://cezacx2.tistory.com/1173)에 자세히 설명되어 있다. 

### Selenium & anaconda env

이제 selenium을 설치하면 된다. 사실 설치는 `pip install selenium`하면 간단히 설치된다. 그런데, anaconda python을 설치한 경우에는 windows cmd 환경에서 python을 찾을 수 없다고 나오기 때문에 문제가 된다. anaconda python을 이용하는 경우에는 selenium 설치 전에 [anaconda python env](https://conda.io/docs/user-guide/tasks/manage-environments.html)를 만들어주는 작업이 추가로 필요하다. 

`anaconda prompt`에서 python 3.6을 이용하는 `myenv`라는 이름의 새로운 env를 추가해보자. 

```
# open "anaconda prompt"
# create conda environment
conda create -n myenv python=3.6
conda env list
```

conda install로 설치할 수 있는 package의 경우에는 `conda install -n myenv packagename`로 env 환경 내에 package를 설치할 수 있다. 하지만 selenium의 경우에는 conda install로 설치할 수 없고 pip로만 설치할 수 있다. 따라서 아래와 같이 env 환경을 활성화 시킨 다음 설치해 줘야 한다. 

```
# activate env
activate myenv

# install selenium for controling browser
pip install selenium
```

Tip : 회사 같은 경우 사내 ssl이 있다면 pip로 package 설치가 용이하지 않다. 이런 경우에는 `--trusted-host pypi.python.org` option을 달아 주었다. [여기](참조)

### python script 작성

이제 python으로 script를 작성해서 실행시키면 된다. 