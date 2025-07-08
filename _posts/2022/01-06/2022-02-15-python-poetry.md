---
layout: post
title:  "python 가상 개발환경 사용하기 (feat poetry)"
categories: [코딩삽질기]
tags: ['python']
---

## Background

python의 생태계는 거대하지만 package 관리나 개발환경 쪽에서는 의외로 불편함이 있다. 개발환경을 관리하기 위해 anaconda의 env를 사용해 왔지만, 이는 프로젝트와 분리된 개념이기 때문에 불편할 때가 있다. 때때로 `pipenv`를 사용하다가 최근에 `poetry`를 알게 되어 정착하게 되었다.

`poetry`는 ruby의 `bundle`과 개념이 유사하여 쉽게 익힐 수 있었다. [공식 문서](https://python-poetry.org/)에 설명이 잘 되어 있으므로 여기에서는 많이 사용되는 문구와 몇가지 Tip만 적어 둔다.

## Install

설치. 내용이 조금씩 바뀌므로 현재 시점에서 가장 정확한 내용은 [공식 문서](https://python-poetry.org/docs/#installing-with-the-official-installer)를 참고하자.

`pipx`를 통해 설치할 수 있다. [pipx](https://pipx.pypa.io/stable/)는 python applications을 독립된 환경에서 실행할 수 있는 tool이다.

```bash
# pipx 설치
# > sudo apt install pipx
# > pipx ensurepath
# poetry 설치
pipx install poetry
```

pipx를 이용하는 대신 공식 installer를 사용할 수도 있다. 설치 방법은 아래와 같다.

```bash
curl -sSL https://install.python-poetry.org | python -
```

설치 확인

```bash
poetry --version
```

설치를 하였지만 인식되지 않는다면 PATH에서 찾지 못하는 것인다. 아래 내용을 `~/.bash_profile`에 삽입하고 `source ~/.bash_profile`을 실행한다.

```bash
# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/.local/bin" ] ; then
    PATH="$HOME/.local/bin:$PATH"
fi
```

주의!!! `pip install poetry`로도 설치가 가능하다. 이럴 경우 python 버전에 종속되는 문제가 있으므로 권장하지 않는다. 만약 위의 방법으로 설치하였는데 문제가 계속된다면 `pip install poetry`로 설치된 package가 있을 수 있다. 이럴 때는 먼저 `python -m pip uninstall poetry`로 제거해 주고 다시 위의 방법으로 설치한다.

## Commands

기본적인 사용방법을 정리한다. 자세한 내용은 공식 홈페이지를 참고하자.

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
# install the defined dependencies
poetry install

# to make sure that the project’s environment is in sync with the poetry.lock file
poetry sync

# update the dependencies
poetry update
```

```bash
# add and install new package
poetry add <package_name>
# poetry add git+ssh://git@github.com/sdispater/pendulum.git

# Add package as development dependency
poetry add --dev <package_name>

# remove package
poetry remove <package_name>
```

package 설치와 제거 과정에서 문제가 있다면 가상 환경 속에서 실행해서일 가능성이 있다. 이럴 때는 `deactivate`를 이용하여 가상 환경에서 나온 뒤에 다시 해보자.

```bash
# excute script within env
# Ruby: bundle exe jekyll serve
poetry run python your_script.py
```

```bash
# activate env
poetry env activate
python your_script.py

# deactivate env
deactivate
```

## Tips

### 관련 파일을 로컬 프로젝트 폴더에 넣어 두자

모든 개발 환경과 관련된 파일을 로컬 프로젝트 작업 폴더 아래 두자. 관리하기 편리하다. 필요 없을 때는 모두 삭제하면 그만이다. 꼬일 일도 없고 다른 프로젝트에 영향을 줄 일도 없다.

이를 위해 아래 설정이 필수이다. poetry 설치 후에 설정을 적용해 두자. 이와 같이 설정했다면 개별 환경과 관련된 파일을 모두 작업 파일 아래 `.venv` 폴더 아래 설치된다. git으로 관리하고 있다면 `.gitignore`에 `.vevn` 디렉토리를 추가해 주어야 한다.

```
poetry config virtualenvs.in-project true
```

### VSCode에서 python interpreter 설정

위와 같이 하면 VSCode에서 python interpreter를 잡을 때도 유리하다. 위와 같이 관련 파일을 로컬 프로젝트 작업 폴더 아래 두고 VSCode에서 python interpreter로 지정만 해 주면 된다. 자세한 사항은 [이 글](https://amazingguni.medium.com/python-poetry%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC-vscode%EC%97%90%EC%84%9C-%EA%B0%9C%EB%B0%9C%ED%95%A0-%EB%95%8C-interpreter%EB%A5%BC-%EC%9E%A1%EB%8A%94-%EB%B0%A9%EB%B2%95-e1806f093e6d)을 보자.

### 무언가 꼬였거나 문제가 생겼다면?

꼬인 것을 풀려고 노력하기 보다는 처음부터 다시 설치하는 편이 더 쉽다. 모든 dependencies 구조는 `poetry.lock` 파일에 기록되어 있다. 따라서 `.venv` 폴더와 `poetry.lock` 파일을 완전히 삭제한 다음 `poetry install`을 실행시키면 처음부터 다시 설치된다.

```bash
rm poetry.lock
rm -rf .venv
poetry install
```

### python 버전 문제

python 버전은 개인적으로 `asdf`로 관리하고 있다. "[의외의 복병 개발환경, asdf로 개발 언어를 관리해 보자]({{ site.baseurl }}/2022/12/12/asdf)"를 참고하자.

### Custom package 사용

때때로 poetry project 안에서 자신이 만든 custom package를 사용하고 싶을 때가 있다. 설정파일인 `pyproject.toml`에 다음과 같이 적어 주고 `poetry install`를 실행시켜주면 된다. 이에 대해서는 [Poetry 에서 로컬 패키지 add 하기](https://dailyheumsi.tistory.com/251)에 자세하다. "[적응 안되는 python의 Package 경로 문제(feat Poetry)]({{ site.baseurl }}/2023/01/16/import-package-path-problem-in-python)"도 함께 참고하자.

```bash
# my-project/pyproject.toml
[tool.poetry.dependencies]
my-sub-package = { path = "./dependencies_path/my-sub-package" }
```
