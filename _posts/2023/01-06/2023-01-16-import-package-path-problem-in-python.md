---
layout: post
title:  "적응 안되는 python의 Package 경로 문제(feat Poetry)"
categories: 코딩삽질기
tags: ['python', 'package']
---

## 배경

Python은 매우 편리한 언어이다. 나처럼 취미로 코딩을 하고 있는 이가 사용하기에 적합한 언어이기도 하다. 하지만 Python에는 몇 가지 적응되지 않는 문제가 있으니, 그 가운데 하나가 Project 관리 및 Package 경로 문제이다. [Project 관리에 대해서는 Poetry를 써서 어느정도 해결하였다]({{ site.baseurl }}/2022/02/15/python-poetry)고 일전에 포스팅 하였으므로 생략하고, 여기에서는 Package 경로 문제를 다루기로 한다.

python 코드가 복잡해지다보면 코드를 하나의 파일로 다루기 어려워진다. 따라서 파일을 나누어 관리하고 싶어진다. 이렇게 자신만의 package(경우에 따라 모듈module, 라이브러리library 등등)가 탄생한다. 주로 성격이 같은 함수를 모아 놓거나 Class 별로 파일을 나누는 경우가 보통이다. 이렇게 코드를 관리하다가 때때로 해당 package 파일을 import 할 수 없다는 에러 메시지를 만나게 된다. 내 코드에는 문제가 없는 것 같은데, 이 에러는 무엇이란 말인가!

python의 package 경로에 대해서는 매우 많은 글들이 존재하므로 여기에서는 생략한다. 무엇을 보아야 할런지 모르겠다면 [이 글](https://wikidocs.net/1418)에서 시작해보자.

## 방법

사실 이 문제를 완전히 해결하려면 실행 코드가 있는 디렉토리(폴더)를 [가상 환경](https://homubee.tistory.com/38)으로 만들어주고, package가 있는 해당 디렉토리를 해당 가상 환경 내의 [환경 변수](https://ko.wikipedia.org/wiki/%ED%99%98%EA%B2%BD_%EB%B3%80%EC%88%98)에 넣어 주어야 한다. 여기에서는 poetry를 사용한다고 가정하고 간단히 설명한다.

한줄 요약

* python으로 프로젝트를 진행할 때는 `가상 환경`을 설정하고 해당 툴(`poetry` 등)을 통해 `환경 변수`를 잘 셋팅하자.

### 실행 코드가 있는 디렉토리를 가상 환경으로 만들기

사용자는 어떤 폴더를 기준으로 내 프로젝트를 진행하고 있다는 사실을 알고 있지만, python은 그렇지 못하다. 따라서 프로젝트와 관련된 파일을 모아 하나의 폴더에 넣어주고 해당 폴더를 하나의 가상 환경으로 묶어 줄 필요가 있다. 이 가상 환경 안에서 실행되는 python은 그 범위 안에서만 동작하므로 프로젝트의 범위를 설정하는 효과를 얻을 수 있다. 또 이 폴더만 옮겨주면 다른 컴퓨터에서도 쉽게 동작할 수 있으므로 미래의 나 혹은 다른 이를 위해 미리 준비하는 효과도 얻을 수 있다.

[python 가상 환경을 만드는 툴](https://homubee.tistory.com/38)은 여러 가지가 있으나 [나는 poetry를 사용하고 있다]({{ site.baseurl }}/2022/02/15/python-poetry). poetry의 사용 방법은 그리 어렵지 않으니 [공식 문서](https://python-poetry.org/)를 참고하자.

### 가상 환경에서 환경 변수 확인

가상 환경만 잘 구축되면 package 경로 문제가 별로 생겨나지 않지만, 예상치 못하게 문제가 발생하기도 한다. 아래의 예처럼 프로젝트 폴더를 구성하고 `my_main_script.py` 혹은 `my_sub_script.py`에서 `my_pacakge` 아래의 코드를 불러오면 import error가 발생한다.

```
my_project
├── pyproject.toml
├── my_main_script.py
├── scripts
│   └── my_sub_script.py
└── src
    ├── my_package1
    │   ├── __init__.py
    │   └── my_module.py
    └── my_package2
        ├── __init__.py
        └── my_module.py
```

당연하게도 아래와 같이 하면 설정과 상관 없이 에러가 나타난다. 기껏 가상 환경을 설치해 놓고 가상 환경 밖 시스템에 설치된 python을 불러온 것이기 때문이다.

```bash
python my_main_script.py
# ERROR!!!
python srcipts/my_sub_script.py
# ERROR!!!
```

가상 환경 내에 준비된 python을 실행시키려면 아래와 같이 실행시키거나 `poetry shell`을 실행시켜 가상 환경을 먼저 활성화 시켜야 한다.

```bash
poetry run python my_main_script.py
# ERROR!!!
poetry run python srcipts/my_sub_script.py
# ERROR!!!
```

하지만 가상 환경 내의 python을 실행시켜도 현재로서는 에러가 나타난다. poetry를 통해 가상 환경 안에 설치된 python을 불러왔으나 package 경로를 찾지 못했기 때문이다. python은 환경 변수를 근거로 파일을 확인하므로 환경 변수에 `./src/my_package`가 보이지 않는다면 import 시킬 수 없다. 이 때는 당황하지 말고 아래와 같이 환경 변수를 확인해 보자.

```bash
poetry run python -c "import sys; print('\n'.join(sys.path))"
```

### 가상 환경에서 환경 변수 지정

poetry로 가상 환경을 만들었다면 기본적으로 `./my_project`가 추가되어 있을 것이다. `./src/my_package`는 환경 변수에 추가되지 않는다. 그도 그럴 것이 python은 어떤 폴더 아래 package 파일들이 있는지 알 수 없다. 그렇다면 아래와 같이 poetry의 설정 파일(`pyproject.toml`)을 수정하여 package 파일의 위치를 선언해주자.

```bash
# pyproject.toml
packages = [
        {include = "my_package1", from = "src"},
        {include = "my_package2", from = "src"}
]
```

설정 파일이 수정되었으므로 poetry가 이를 인식하도록 아래와 같이 실행해준다.

```bash
poetry install
# Installing the current project: my_project (0.1.0)
```

실행 결과 가상 환경 파일에 `.venv/lib/my_project.pth`가 생성된 것을 알 수 있다. 이 파일을 열어 보면 `path/to/my_project/src` path가 적혀 있다. 해당 path가 가상환경 `sys.path`에 추가된 것은 아래와 같이 확인할 수 있다.

```bash
poetry run python -c "import sys; print('\n'.join(sys.path))"
```

### 다른 예시

만약 아래와 같은 상황이라면 어떻게 해야 할까?

```
my_project
├── pyproject.toml
├── my_main_script.py
├── scripts
│   └── my_sub_script.py
└── src
    ├── my_module1.py
    ├── my_module2.py
    └── my_module3.py
```

`pyproject.toml`를 아래와 같이 수정하고 `poetry install`를 실행시켜주자. 그러면 가상 환경 안이라면 어디에서든 해당 파일을 import 시킬 수 있다.

```bash
# pyproject.toml
packages = [
        {include = "*.py*", from = "src"}
]
```

위의 내용은 [공식 문서](https://python-poetry.org/docs/pyproject/#packages)에 잘 나와 있다. 참고하기 바란다.

## REF

* [Poetry 공식문서 / The pyproject.toml file / Packages](https://python-poetry.org/docs/pyproject/#packages)
* [Modifying Poetry's virtual environment PYTHONPATH](https://stackoverflow.com/questions/68518963/modifying-poetrys-virtual-environment-pythonpath)
