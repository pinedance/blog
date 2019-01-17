---
layout: post
title:  "Docker, 도커, 더커, 주요 명령어"
categories: 코딩삽질기
---

Background
--------------

[Docker](https://www.docker.com/)라는 녀석이 있다. 한국에서는 "도커" 혹은 "더커"로 부른다. 사용자에게 가상환경을 지원해 준다. ( 자세한 설명은 [이재홍님의 가장 빨리 만나는 도커 Docker](http://pyrasis.com/book/DockerForTheReallyImpatient/)를 보시라~! )

어떤 어플리케이션이나 코드를 돌리기 위해서는 그 녀석이 의존하고 있는 시스템이 전제되어야 한다. 윈도우 프로그램은 windows가 있어야 실행시킬 수 있고, 맥 프로그램은 macOS가 있어야 실행 시킬 수 있다.

상용 프로그램들은 유저들을 위해 이런 환경에 따라 프로그램을 배포하지만, 개인이나 소규모 집단에서 코드를 공개하는 경우에는 대부분 특정 환경을 세팅하고 설치하라는 매우 긴 설명이 주어진다. 유저들의 다양한 상황들을 모두 고려할 수 없기 때문이다.

예를 들어 python으로 어떤 아이디어를 구현해서 공개한다고 하면, python 파일만 공개하게 된다. 이를 받아 테스트 해보려면 python 파일이 실행될 수 있는 환경을 구비해야 한다.

문제는 나에게 익숙한 환경이 아닐 때 발생한다. 최근에 julia라는 언어로 짜여진 프로그램을 테스트 해본 적이 있다.

인터넷을 찾아 julia 1.0을 컴퓨터에 설치하고 한참을 진행 하다가 julia package를 설치하는 과정에서 julia 0.4 이상은 지원을 안한다는 에러 메시지를 만났다. 맨붕에 빠졌다. 해당 프로그램은 2년 전 공개된 것으로 julia 0.4를 기준으로 작성된 것이었다.

그럼 나는 내 컴에서 julia 1.0을 제거한 뒤 다시 julia 0.4를 설치하고 이후 작업을 진행해야 한다. julia 1.0을 제대로 삭제하지 않으면 다시 설치할 julia 0.4와 충돌이 발생하고 문제는 더 꼬이게 된다.

그럴 때 유용한 것이 Docker이다. julia가 설치된 Docker Image를 받아 진행하다가, 해당 메시지를 만나면 이 image를 지우고 julia 0.4가 설치된 Docker Image를 받아 다시 진행시키면 된다. Docker가 환경을 격리해 주기 때문에 Host 컴퓨터에 영향을 주지 않기 때문이다.

언제나 깨끗한 새 컴퓨터에 원하는 환경을 설치하고 하고자 하는 일을 진행할 수 있다. 기존 시스템의 간섭이나 기존 설치 앱과의 충돌을 염려하지 않아도 된다.


How To Use
--------------

사실 Docker에 대한 설명은 매우 많고, 개념도 쉽지는 않은 편이다. 나도 자세히 모르고, 여기서 그런 것들을 모두 설명할 생각이 없다.

제목처럼 자주 사용하는 명령어를 써 놓고 그때 그때 보면서 사용하기 위한 글이다.


### 설치

[공식 문서](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1)를 참조하자. 기억해야 할 것은 Docker는 관리자 계정으로 실행시켜 주어야 한다는 점이다. 그러고 싶지 않다며 usergroup을 아래와 같이 설정해 준다.

```bash
# 현재 계정을 docker 그룹에 포함
sudo usermod -aG docker ${USER}
sudo service docker restart
# 계정 logout and login
```


### 전형적인 용례

```bash
# Image 받아와서 Container로 실행시키기
docker pull continuumio/anaconda3
sudo docker run -i -t continuumio/anaconda3 /bin/bash

# Container 내부에서 어떤 설치 및 작업 후 Image로 저장하기
docker ps -a
## docker commit <CONTAINER ID> myNewName:myNewTag
docker commit <CONTAINER ID> mlearn:0.0.1
sudo docker run -i -t myNewName:myNewTag

# mount host folder
## sudo docker run -i -t -v <hostFolderPath>:<containerFolderPath> myNewName:myNewTag
sudo docker run -i -t -v /c/Users/user/sample:/sample mlearn:0.0.1

# Copy file from host to container
## sudo docker cp <hostFolderPath> <container name>:<containerFilePath>
## sudo docker cp <container name>:<containerFilePath> <hostFolderPath>
sudo docker cp ./input.txt myContainer:/home/project
sudo docker cp myContainer:/home/project/output.txt ./
```

jupyter notebook을 실행하기

```bash
docker run -i -t \
	-v /home/${USER}/Labs:/home/notebooks \
	-p 8888:8888 \
	IMAGENAME /bin/bash \
	-c "/opt/conda/bin/jupyter notebook --notebook-dir=/home/notebooks --ip='*' --port=8888 --no-browser --allow-root "
```


### 더 보기

#### Image 관리

```bash
#  Image 찾기
sudo docker search ubuntu

# Image 가져오기
sudo docker pull ubuntu:latest

# host에 있는 Image list 보기
sudo docker images

# 가져왔던 Image 삭제하기
sudo docker rmi ubuntu:latest
```

#### Container 관리

```bash
# Container 보기
sudo docker ps -a

# Container 실행하기
sudo docker start hello

# Container 다시실행하기 (≒리부팅)
sudo docker restart hello

# Container 중지하기
sudo docker stop hello

# Container 삭제하기
sudo docker rm hello
```

#### Container 사용

* Container 내부 Bash 셸에서 `exit` 또는 `Ctrl+D`를 입력하면 컨테이너가 정지
* Container 내부 Bash 셸에서  `Ctrl+P`, `Ctrl+Q`를 차례대로 입력하여 컨테이너를 정지하지 않고, 컨테이너에서 빠져나옴

```bash
# Container 실행하며 bash로 들어가기
# -i (interactive), -t (Pseudo-tty)
sudo docker run -i -t --name hello ubuntu /bin/bash

# 실행되고 있는 Container에 들어가기
sudo docker attach hello

# 외부에서 실행되고 있는 Container 내부 명령 실행하기
sudo docker exec hello echo "Hello World"
```

#### Errors

Docker for windows

error message [ref](https://github.com/docker/for-win/issues/1825)

```cmd
error during connect: Get http://%2F%2F.%2Fpipe%2Fdocker_engine/v1.35/info: open //./pipe/docker_engine: The system cannot find the file specified. In the default daemon configuration on Windows, the docker client must be run elevated to connect. This error may also indicate that the docker daemon is not running.
```

```cmd
# powershell을 관리자 권한으로 연다. 그리고 ...
cd "C:\Program Files\Docker\Docker"
./DockerCli.exe -SwitchDaemon
```

REF
-----

* [가장 빨리 만나는 Docker 3장 Docker 사용해보기](http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter03)
* [생활코딩 Docker feat 이재홍](https://www.youtube.com/watch?v=Bhzz9E3xuXY&t=8s)
* [머신러닝, 딥러닝 실전 개발 입문 1강 - Docker 환경 구성](https://www.youtube.com/watch?v=vGrd5bSoBs8)

Tutorials

* [T아카데미 토크ON 19차. 컨테이너 기반 가상화 플랫폼‘도커(Doker)'의 이해](https://www.youtube.com/playlist?list=PL9mhQYIlKEhfw7ZKPgHIm9opAm2ZpmzDq)
* [동빈나 도커(Docker)](https://www.youtube.com/playlist?list=PLRx0vPvlEmdAHIYHFT7VkWyEkKVO9AvQW)
* [시니어코딩IndiFlex Linux, Docker](https://www.youtube.com/playlist?list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh)
* [양재동 코드랩 Docker](https://www.youtube.com/watch?v=QQc9aSVP4t4&list=PLs_XsVQJKaBmZcrJjoVJrlWlGD9_nkQUC)

Posts

* [Docker 윈도우10 개발환경 만들기](https://labo.lansi.kr/posts/40)

응용

* [docker로 만들어보는 가상 원격 데스크탑 - 이형규](https://www.youtube.com/watch?v=wReN7LG2zJg)
* [docker-compose를 이용하여 개발환경 구축하기(feat. vagrant) - 김용휘](https://www.youtube.com/watch?v=MqfGuhHnlxw)
