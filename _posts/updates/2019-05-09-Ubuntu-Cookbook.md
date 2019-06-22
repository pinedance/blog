---
layout: post
title:  "[Cookbook] Ubuntu, 이럴 때 이렇게 한다."
categories: [코딩삽질기, Cookbook]
---

## 초기 세팅

초기에 해야할 세팅과 설치해야할 프로그램이다.

### Bash theme

bash theme를 바꾸면 가독성이 높아져 사용에 도움이 된다. 더 자세한 것은 ["Bash에 theme를 적용해 보자"](https://pinedance.github.io/blog/2019/06/10/Bash-theme)를 참조하자.

```bash
git clone --depth=1 https://github.com/Bash-it/bash-it.git ~/.bash_it
~/.bash_it/install.sh --no-modify-config
```

### 주요 프로그래밍 언어 설치

#### python via anaconda

자세한 것은 ["install-python"](https://pinedance.github.io/blog/2017/09/01/Python-Cookbook#install-python)를 참조하자.

#### node via nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
nvm install node
```

더 자세한 것은 ["install-node"](https://pinedance.github.io/blog/2017/09/01/Javascript-Cookbook)를 참조하자.

#### ruby via [rvm](https://rvm.io/)

```bash
gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
curl -sSL https://get.rvm.io | bash -s stable --ruby
```

더 자세한 것은 ["install-ruby"](https://pinedance.github.io/blog/2017/09/01/Ruby-Cookbook#install-ruby)를 참조하자.

### Core APP 설치

#### Git

일반적인 배포판에는 설치되어 있는 경우가 많다. 만약 설치되지 않았다면 다음과 같이 설치한다.

```bash
sudo apt install git-all
```

#### Docker

자세한 것은 ["Docker, 도커, 더커, 주요 명령어"](https://pinedance.github.io/blog/2019/01/05/Docker-long-story-short)를 참조하자.

### 유용한 APP 설치

```bash
# install imagemagick for image files
sudo apt intall imagemagick
# install ffmepg for media files
sudo apt install ffmepg
# install axel for file download
sudo apt install axel
```

## 디스크 및 파티션

### 디스크 및 파티션 현황을 알아보자.

File System이 어떤 종류인지 확인

```bash
sudo file -s /dev/xvd*
```

Partition 구성을 확인

```bash
lsblk
```

Volume 구성을 확인

```bash
df -h
```

REF
* [Extending a Linux File System After Resizing a Volume](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html)
