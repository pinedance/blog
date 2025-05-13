---
layout: post
title:  "Bash에 theme를 적용해 보자 (feat. Bash-it)"
categories: [코딩삽질기]
tags: ['bash']
---

## 배경

bash에 적절한 색깔과 모양을 입히면 가독성이 높아지고 실수를 줄일 수 있게 된다.

Bash-it이라는 유용한 페키지가 배포되어 있다. 다음과 같이 따라해 보자.

Bash-it

* [공식 홈페이지](https://bash-it.readthedocs.io/en/latest)
* [github repo](https://github.com/Bash-it/bash-it)

## 설치

설치 방법은 공식 홈페이지에 잘 설명되어 있다. 먼저 git repository를 가져온 다음 설치 스크립트를 실행시키면 된다.

```bash
# clone library
git clone --depth=1 https://github.com/Bash-it/bash-it.git ~/.bash_it
```

설치 스크립트는 `~/.bashrc` file 뒤에 실행 명령을 덧붙이는 방식이다.

설치 될 때 물어보는 질문을 잘 보고 자신에게 맞는 옵션을 선택하자.

간단히는 다음과 같이 실행시키면 된다.

```bash
# install library
~/.bash_it/install.sh
```

하지만 `~./bashrc` file을 복잡하게 만들기 싫다면 다음과 같이 해주자.

```bash
cd ~
mkdir .bashrc_user
# 별도의 bash_it 설정파일을 만든다.
BASH_IT_CONFIG_FILE=".bashrc_user/bash_it" ~/.bash_it/install.sh
```

```bash
# .bashrc가 실행될 때 함께 실행되도록 등록해준다.
echo "source /home/<username>/.bashrc_user/bash_it" >> ~/.bashrc
```

## 커스터마이징

### 테마

추천 theme는 `bakke`이다.

![bash-it bakke](https://bash-it.github.io/bash-it/docs/images/bakke-black.jpg)

기본 theme를 원하는 것으로 바꾸려면, 설정 파일에서 `BASH_IT_THEME` 부분을 원하는 theme 이름으로 수정해준다.

설정 파일은

* 첫번째 방법으로 설치했을 경우: ~/.bashrc
* 두번째 방법으로 설치했을 경우: ~/.bashrc_user/bash_it

```bash
...
export BASH_IT_THEME='bakke'
...
```

수정이 끝나면 현재 session에 반영하기 위해 `bash-it reload`를 하거나 `source ~/.bashrc`를 실행해 적용한다.

### Version Control Information

bash-it에서는 git과 같은 version control tool의 정보를 표시해 준다. 현재 작업 중인 branch와 commit 상태를 알려주기 때문에 편리하다. 그러나 현재 작업중인 repository의 크기가 크다면 프롬프트가 갱신될 때마다 잠깐씩 기다려야 한다. 더구나 사양이 낮은 노트북으로 작업할 때는 작업 능률을 상당히 저해한다.

이를 비활성화 시켜주고 싶을 때는 아래와 같이 설정 파일에서 해당 옵션을 수정해 주면 된다. 자세한 것은 [공식문서](https://github.com/Bash-it/bash-it#user-content-prompt-version-control-check)를 참고하자.

```bash
export SCM_CHECK=false
```
