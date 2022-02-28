---
layout: post
title:  "개발환경 빌드하기 (feat make, .env)"
categories: [코딩삽질기]
tags: ['bash']
---

## Background

코딩에서 개발 환경은 매우 중요하다. 하나의 어플리케이션은 다양한 의존관계 속에서 실행된다. 예를 들어 간단한 python 어플리케이션이라고 하더라도 실행을 위해서는 다른 python package를 필요로 할 수 있다. 또한 이들은 모두 python이라는 더 하위 프로그램이 있어야만 실행된다. 그리고 python과 package들은 OS와 OS에서 동작하는 native application 위에서 동작하게 된다. 마치 건물에서 1층 위에 2층이 있고 2층 위에 3층이 존재할 수 있는 것처럼 다양한 층차의 코드들이 모여 하나의 동작을 만들어내게 된다. 

문제는 이 가운데 하나라도 결여되면 원하는 동작을 할 수 없다는 점이다. 의존 관계에 있는 코드 가운데 하나라도 올바로 작동하지 않으면 에러와 함께 실행은 중단된다. 극단적으로 말하면 네 컴퓨터에서 동작했던 코드가 내 컴퓨터에서 동작하리가 장담할 수 없고, 오늘 작동했던 코드가 내일 다시 동작하리라고 장담할 수 없다. 

이런 문제에서 벗어나기 위해 가장 좋은 툴은 개발 환경 전체를 이미지로 저장하는 [docker](https://www.docker.com/) 방식이다. 하지만 이것이 좀 부담스럽게 느껴진다면 프로젝트 내에 개발 환경을 build할 수 있도록 장치를 해 두는 것이 좋다. 미래의 나를 위해, 내 코드를 실행해 볼 누군가를 위해서 말이다. 

## Example

리눅스 OS를 사용한다면, `Makefile`과 `.env` 파일을 사용하는 방법을 추천한다. `.env` 파일은 환경변수를 저장하기 위해 사용하고, `Makefile`에는 개발 환경 build를 위한 스크립트를 담아 둘 수 있다. 

예를 들어 poetry와 같은 python package manager를 통해 python 개발 환경을 셋팅한 뒤에 개인 git 저장소에 있는 데이터 파일을 다운로드 받아 디렉토리를 만들어 넣는다고 해보자. 아래와 같이 `Makefile`과 `.env` 파일을 프로젝트 디렉토리에 만들어 둔다.

```bash
# ./.env
GITHUB_ACCESS_TOKEN="<MY_GITHUB_ACCESS_TOKEN>"
GITHUB_CORPORA_API_URL="https://api.github.com/repos/<GITHUB_USER_NAME>/<REPO_NAME>/tarball"
```

```bash
# ./Makefile
#!make
include .env    # 1
CORPORA_PARENT_NAME="Corpora"
CORPORA_NAME="MYCORPORA"

# Compile and install exact python packages
env:
	pip install poetry    # 2
	poetry config virtualenvs.in-project true    # 3
	poetry install   # 4
	poetry shell   # 5

get_corpora:
    mkdir -p "${CORPORA_PARENT_NAME}"  # 6
	curl -H "Authorization: token ${GITHUB_ACCESS_TOKEN}" -H "Accept: application/vnd.github.v4.raw" -L "${GITHUB_CORPORA_API_URL}" | tar xz --strip-components=1 --directory "${CORPORA_PARENT_NAME}"  # 7
	find "${CORPORA_PARENT_NAME}" -maxdepth 1 -type f -delete  # 8
	bash ./script/build.corpora.org.sh   # 9
```

코드 설명:
1. `.env` 파일에 있는 환경 변수를 사용할 수 있도록 삽입시킨다. 
2. python의 dependency manager인 `poetry`를 설치한다. 
3. 개발 환경과 관련된 모든 파일을 프로젝트 파일 아래 두도록 `poetry` 설정을 변경한다.
4. poetry를 통해 의존관계에 있는 python package를 모두 설치한다. ( poetry에 대해서는 [이 글](https://pinedance.github.io/blog/2022/02/15/python-poetry)을 참고하라 )
5. poetry shell로 진입한다. 이를 생략하면 `poetry run`을 앞에 붙여서 코드를 실행해야 한다. 
6. data를 다운로드 할 디렉토리를 만든다. 
7. 개인 git repo를 다운로드 받아 위의 디렉토리에 압축을 푼다.
8. 정리하기 위해 디렉토리 이에외 다른 파일은 삭제한다. 
9. 별도의 스크립트를 실행시켜 data 파일을 원하는 모습으로 가공한다. 

환경변수는 `Makefile` 자체에 넣을 수도 있다. `.env`에는 민감하거나 공유하지 말아야 할 변수들을 넣는 편이 좋다. 

환경변수와 상관 없거나 재사용성이 있는 부분은 Makefile에 넣지 말고 따로 스크립트로 만든 다음 Makefile 내에서 실행실 수도 있다. 

위와 같이 준비 되었다면 아래와 같이 실행시켜 개발 환경을 준비한다.

```bash
# 개발 환경 만들기
make env
# 필요한 데이터 받아오기
make get_corpora
```

이렇게 프로젝트 디렉토리를 만들어 git 저장소에 올려두면 다음에 git clone으로 내려 받은 다음 `make env`, `make get_corpora`를 실행시키는 것만으로 개발을 이어갈 수 있다. 