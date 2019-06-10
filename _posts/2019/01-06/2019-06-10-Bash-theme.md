---
layout: post
title:  "Bash에 theme를 적용해 보자"
categories: [코딩삽질기]
---

bash에 적절한 색깔과 모양을 입히면 가독성이 높아지고 실수를 줄일 수 있게 된다.

[Bash-it](https://github.com/Bash-it/bash-it)이라는 유용한 페키지가 배포되어 있다.

다음과 같이 따라해 보자.

```bash
# clone library
git clone --depth=1 https://github.com/Bash-it/bash-it.git ~/.bash_it
# install library
~/.bash_it/install.sh
```

※ 설치 될 때 물어보는 질문을 잘 보고 자신에게 맞는 옵션을 선택하자.

추천 theme는 `bakke`이다.

![bash-it bakke](https://camo.githubusercontent.com/0f5be83ee242b81125482488d4a02ba04c5ad0c8/68747470733a2f2f7261772e6769746875622e636f6d2f77696b692f726576616e732f626173682d69742f696d616765732f73637265656e73686f74732f62616b6b652d626c61636b2e6a7067)
<small>ref: [Bash-it](https://github.com/Bash-it/bash-it)</small>

기본 theme를 원하는 것으로 바꾸려면 `~/.bashrc` file을 다음과 같이 수정해준다.

```bash
# ~/.bashrc
export BASH_IT_THEME='bakke'
```

수정이 끝나면 현재 session에 반영하기 위해 `bash-it reload`를 하거나 `source ~/.bashrc`를 실행해 적용한다.
