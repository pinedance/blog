---
layout: post
title:  "python 가상 개발환경 사용하기 (feat poetry)"
categories: [코딩삽질기]
tags: ['python']
---

## Background

python의 생태계는 거대하지만 의외로 library 관리나 개별환경 쪽으로 가면 불편함이 있다. anaconda의 env를 사용해 왔지만, 이는 프로젝트와 분리된 개념이기 때문에 불편할 때가 있다. `pipenv`를 사용하다가 최근에 `poetry`를 알게 되어 정착하게 되었다. 

`poetry`는 ruby의 `bundle`과 개념이 유사하여 쉽게 익힐 수 있었다. [공식 문서](https://python-poetry.org/)에 설명이 잘 되어 있으므로 여기에서는 많이 사용되는 문구와 몇가지 Tip만 적어 둔다. 

## Code 

설치

```bash
pip install poetry  
# or conda install poetry
```

```bash
# 사용법 보기
poetry -h
```

```bash
# 새로운 프로젝트 생성
poetry new poetry-demo

# 기존 프로젝트에 적용
poetry init
```

```bash
# add and install new library
poetry add <library_name>
# poetry add git+ssh://git@github.com/sdispater/pendulum.git

# remove library
poetry remove <library_name>
```


```bash
# excute script within env
# Ruby: bundle exe jekyll serve
poetry run python your_script.py

# activate env
poetry shell
python your_script.py
```

```bash
# install the defined dependencies
poetry install

# update the dependencies
poetry update
```

## Tip 

모든 개발 환경과 관련된 파일을 작업 폴더 아래 두자. 관리하기 편리하다. 이를 위해 아래 설정이 필수이다. poetry 설치 후에 설정을 적용해 두자. 이와 같이 설정했다면 개별 환경과 관련된 파일을 모두 작업 파일 아래 `.venv` 폴더 아래 설치된다. git으로 관리하고 있다면 `.gitignore`에 `.vevn` 디렉토리를 추가해 주어야 한다. 

```
poetry config virtualenvs.in-project true
```

이렇게 하면 VS Code에서 python interpreter를 잡을 때도 유리하다([REF](https://amazingguni.medium.com/python-poetry%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC-vscode%EC%97%90%EC%84%9C-%EA%B0%9C%EB%B0%9C%ED%95%A0-%EB%95%8C-interpreter%EB%A5%BC-%EC%9E%A1%EB%8A%94-%EB%B0%A9%EB%B2%95-e1806f093e6d)). 

무언가 꼬였거나 문제가 생겼다면? 꼬인 것을 풀려고 노력하기 보다는 처음부터 다시 설치하는 편이 더 쉽다. 모든 dependencies 구조는 `poetry.lock` 파일에 기록되어 있다. 따라서 `.venv` 폴더와 `poetry.lock` 파일을 완전히 삭제한 다음 `poetry install`을 실행시키면 처음부터 다시 설치된다. 

이론적으로 가상 개발 환경에는 어떤 python 버전도 사용할 수 있다. 그러나 예외가 있다. 초기 로컬 개발 환경에 설치된 python 버전 보다 높은 버전의 python을 요구하는 poetry project는 설치할 수 없다. 예를 들어 현재 로컬 개발 환경에 python 3.7이 설치되어 있는데 poetry를 사용한 python project 설정에 python 3.8이 필요하다고 선언되어 있다면 `poetry install`이 실패하게 된다. 이 때는 어쩔 수 없이 로컬 개발 환경에 이보다 높은 버전의 python을 설치해 준 뒤에 `poetry install`을 실행해 주어야 한다. 사실상 로컬 python 버전보다 낮은 python 버전만 설치할 수 있는 셈이다. 

때때로 poetry project 안에서 나의 custom library를 사용하고 싶을 때가 있다. 설정파일인 `pyproject.toml`에 다음과 같이 적어 주고 `poetry install`를 실행시켜주면 된다.이에 대해서는 [Poetry 에서 로컬 패키지 add 하기](https://dailyheumsi.tistory.com/251)에 자세하다. 

```bash
# my-project/pyproject.toml
[tool.poetry.dependencies]
my-sub-package = { path = "./dependencies_path/my-sub-package" }
```

