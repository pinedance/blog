---
layout: post
title:  "ubuntu에서 사용하던 R이 library 설치 후 멈추다"
categories: 코딩삽질기, R
---

문제의 발단
--------------

Cloud에 있는 Ubuntu에 `R`을 설치한 뒤에 [Rstudio](https://www.rstudio.com/), [Rshiny](https://shiny.rstudio.com/) 서버 버전을 설치해 사용 중이었다. 

오랜만에 R에 library를 설치하고 업데이트 했는데, 한참 동안 설치되더니 Rstudio, Rshiny가 모두 작동을 멈추었다. 

이유도 원인도 해결책도 전혀 알 수 없었다.

서버를 reboot한 뒤에 터미널에서 `R`을 실행해 보니 다음과 같은 에러 메시지가 보인다. 

```
GotoBLAS : Architecture Initialization failed. No initialization function found.
```


몸부림
---------

구글신에게 신탁해 보니 ubuntu에 `libatlas3-base`를 설치하라는 [stack overflow](https://stackoverflow.com/questions/20058653/gotoblas-error-when-installing-matplotlib-with-pip-in-a-virtualenv-on-debian-whe) 글을 찾아 주었다. 

하지만 설치하려고 했더니 그런 대상이 없다는 메시지만 나온다. 더 찾아보니  `libatlas3-base`는 ubuntu precise 이후 버전에서 사용되는 페키지란다. 

BLAS가 무엇인지 잘은 모르겠지만 precise에서는 `libopenblas`가 그 역할을 한단다. `libopenblas-base`와 `libopenblas-dev`를 다시 설치해 보았으나 이미 최신 버전이라는 메시지만 나온다. 

이 상태로 한 참 `r-base`, `r-base-dev`, `r-base-core`를 지웠다 다시 설치했다 하는 작업을 반복했다. 


어느정도 해결
----------------

에러 메시지로 보았을 때 R 자체의 문제가 아니라 BLAS라는 놈의 문제인 것은 확실한 것 같았다. 

그래서 반대로 `libopenblas`를 지워볼까 이런 생각이 들었다. 

```
sudo apt-get remove --purge  libopenblas-base libopenblas-dev    
```

위와 같이 해당 페키지를 지웠더니 terminal에서 일단 R은 실행 되었다. 

사실 앞의 stackoverflow 글에서 아래와 같은 답변이 있어 그대로 해 보았지만 효과가 없었었다. 

```
sudo apt-get purge libopenblas-dev
```

`apt-get` 사용법이 달라서였던가 `libopenblas-dev`가 남아 있어서 였던가 .... linux는 어렵다. 


***

R을 다시 설치했기 때문에 설정도 바꾸어 줘야 했다. 

linux의 경우 library를 sudo로 설치하면 권한 문제가 생기기 쉽다. 그래서 아예 home 아래 설치하는 것을 나는 선호한다. 

library path는 R 환경에서 다음과 같이 바꾼다.

```R
# change default library path
.libPaths("/path/to/directory/with/libraries")
```

참고로 library repository 설정 방법은 아래와 같다. 

```R
# change library repository
options(repos='http://cran.rstudio.com/')
```


***

R이 복구되고 Rstudio는 정상화 되었지만 shiny는 실행되지 않았다. 

최신 버전을 다시 설치해 보니 실행 될 때 아래 오류가 뜨면서 멈췄다. 

```
version `GLIBCXX_3.4.18' not found
```

구글신께 신탁해 보아 겨우 아래와 같이 의존성 패키지 상위버전을 설치한 뒤에 해결할 수 있었다. 

```
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt-get update
sudo apt-get install libstdc++6-4.7-dev
```

shiny server 실행은 `shiny-server start`으로, 상태 확인은 `service shiny-server status`으로 가능하다. 

