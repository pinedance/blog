---
layout: post
title:  "동영상에서 필요한 부분만 잘라내 보자 (feat ffmpeg)"
categories: 생활자동화
tags: ['video']
---

How to cut or split your video files on ubuntu (or mint)
==========================================================

Intro
-----

동영상에서 필요한 부분만 잘라내 보자!

살면서 가끔 동영상을 편집해야 할 일이 있다. 동영상을 보는 것도 코덱이 없다느니 하는 이유로 어려운 마당에 편집이라니.

복잡한 것은 모르겠고 어떤 부분만 잘라 내고 싶을 때가 있다.

다행히 [팟인코더](http://tvpot.daum.net/application/PotEncoder.do)를 사용하여 GUI 환경에서 동영상을 잘라낼 수 있었다. 하지만 잘라낸 뒤에 파일이 원본 파일과 다르게 변형되어 찜찜했다. 내 기억에는 원본파일과 같은 형식으로 만드는 옵션은 없었던 것 같다. (내가 사용법을 잘 몰라서 그럴 수도 있다.)

얼마 전에 지인으로 부터 ubuntu에서 동영상을 편집하니 빠르고 오히려 더 쉽다는 이야기를 들었다. 지인이 말한 것은 `ffmpeg` 였는데, 조금 알아보니 동영상에서의 [imagemagick](https://pinedance.github.io/blog/2016/06/10/%EC%8A%A4%EC%BA%94-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%AC%B8%EC%84%9C-%ED%9D%91%EB%B0%B1-%EB%A7%8C%EB%93%A4%EA%B8%B0) 같은 본좌 프로그램이었다.

***

TASK1
------

### 삽질1 : ffmpeg를 설치하라

문제는 `ffmpeg` 설치. 역시 리눅스 계열은 설치가 가장 어렵다. 구글신께 물어 보니 그냥 설치하면 특정 코덱이 깔리지 않는다는 둥 어려운 이야기들 투성이었다. (이 부분이 나중에 발목을 잡았다. 글 말미에 추가된 내용을 참고하시라)

늘 느끼는 것이지만, 문서가 복잡하고 많아도 가장 신뢰할 수 있는 것은 해당 프로젝트 페이지이다. [ffmpeg 공식 홈페이지](https://www.ffmpeg.org/)에 들어가서 좀 찾아 보니 PPA(Personal Package Archives)를 통해 설치하는 방법이 소개되어 있었다. [여기](https://launchpad.net/~mc3man/+archive/ubuntu/trusty-media)

```
sudo add-apt-repository ppa:mc3man/trusty-media
sudo apt-get update
sudo apt-get dist-upgrade
```

위와 같이 ppa를 추가한 뒤에 다음과 같이 설치하면 된다.

```
sudo apt-get install ffmpeg
```

### 삽질2 : unmet dependencies error 해결

```
The following packages have unmet dependencies:
	....
```

그냥 잘 설치되면 감사한 일이다.

아니나 다를까 무언가 에러가 났다. `libav-tools`에 대해 `unmet dependencies error` 였다.

이번에는 `sudo apt-get install libav-tools`를 해 보니 여러 library에 대해 `unmet dependencies error`이 났다.

apt-get에 `-f` 옵션을 줘 보고 이렇게 저렇게 해보아도 잘 되지 않더라.

[우분투에서 JDK 설치 과정중 unmet dependencies 에러](http://mainia.tistory.com/494)라는 글을 보고, 힌트를 얻어 unmet dependencies error가 나타난 library를 모두 `apt-get purge`로 삭제하였다. 그리고 다시 다음과 같이 설치하자 설치가 되었다!!!

```
sudo apt-get install libav-tools ffmpeg -y
```

### 삽질3 : 동영상 자르기(split)

ffmpeg를 이용해 동영상을 자르는 방법은 구글신께서 간단히 알려 주셨다. [What to use to quickly cut Audio/Video](https://askubuntu.com/questions/56022/what-to-use-to-quickly-cut-audio-video)를 참고하였다. 다음과 같이 하시면 되시겠다.

```
ffmpeg -i ORIGINALFILE.mp4 -acodec copy -vcodec copy -ss START -t LENGTH OUTFILE.mp4
```

예를 들어 처음부터 30초간만 잘라 내서 새로운 파일을 만든다면 다음과 같이 하면 된다.

```
ffmpeg -i ORIGINALFILE.avi -vcodec copy -acodec copy -ss 00:00:00 -t 00:30:00 OUTFILE.avi
```

### 삽질4 : avconv 너 뭐냐?

오랜 삽질 끝에 동영상 잘라내기를 완수할 수 있었다.

그런데 명령을 실행해 보니 다음과 같은 메시지가 나왔다.

```
This program is not developed anymore and is only provided for compatibility. Use avconv instead (see Changelog for the list of incompatible changes).
```

avconv를 쓰란다.

그래서 avconv를 설치하려니 어떻게 해야 할지 몰랐다. avconv 공식 페이지는 [여기](https://libav.org/avconv.html)로 되어 있는데, 설치 법을 찾아보니 libav 설치에 대해서만 나와 있는 것이 아닌가.

구글신께 여러번 문의해본 결과, 앞에서 libav는 앞에서 dependency 문제를 일이켰던 libav (libav-tools) 였다.

그렇다. libav가 몸체였던 것이다. ffmpeg나 avconv는 그 위해서 작동하는 응용 프로그램인 듯 했다.

avconv 소개 페이지가 libav document에 있으니, avconv는 libav의 하위 프로그램이 아닐까? 이미 libav는 설치되어 있으니 그냥 실행해 볼까? 넘겨짚고 그냥 avconv를 실행시켰더니 되더라.

얏호!

***

Conclusion
----------

linux (ubuntu / mint 등)에서 동영상 편집의 본좌는 libav다. 동영상으로 무언가를 하고 싶다면 libav-tools를 설치해라.

나의 경우는 ffmpeg 설치 과정에서 libav(libav-tools)를 dependency로 설치할 수 있었다.

libav가 설치되면 avconv도 함께 설치되는 모양이다.

```
sudo add-apt-repository ppa:mc3man/trusty-media
sudo apt-get update
sudo apt-get dist-upgrade
sudo apt-get install ffmpeg
```

동영상 자르기는 다음과 같이 하면 된다.

```
ffmpeg -i ORIGINALFILE.mp4 -acodec copy -vcodec copy -ss START -t LENGTH OUTFILE.mp4
```

또는

```
avconv -i ORIGINALFILE.mp4 -acodec copy -vcodec copy -ss START -t LENGTH OUTFILE.mp4
```

Key words
---------

> split, cut, video
> libav-tools, ffmpeg, avconv

***

추가, 삽질5 : H.264 codec으로 인코딩하기
-----

동영상 자르기를 했을 때, output이 정상적으로 나오지 않는 경우가 있었다.

가장 보편적으로 사용되고 있는 [H.264 codec](https://ko.wikipedia.org/wiki/H.264/MPEG-4_AVC)로 인코딩된 동영상에서 발생하는 문제였다.

앞의 방법대로 하면 free codec은 사용할 수 있지만, h264와 같은 non-free codec은 사용할 수 없다고 한다. 따라서 ppa를 통해 ffmpeg를 설치하면 h264로 인코딩된 동영상을 불러오는(decoding) 것에는 문제가 없지만, 특정 부분을 자른 뒤에 새로 쓰는(encoding) 작업은 잘 되지 않는다.

참고로, 사용 가능한 codec은 다음과 같이 확인해 볼 수 있다.

```
# ffmpeg의 경우
ffmpeg -codecs
# avconv의 경우
avconv -codecs
```

다른 codec은 모르겠지만 h264는 많이 쓰는 codec이다. 그냥 넘어가기 어려운 문제다.

이를 해결하기 위해서는 non-free codec을 대체하는 library들을 설치한 뒤 ffmpeg를 source code로 부터 직접  compile해줘야 한다. 물론 compile 전에 이들 codec library를 사용할 수 있게 하겠다고 설정을 변경해 주어야 한다.

이 모든 내용은 좀 길지만 [Compile FFmpeg on Ubuntu, Debian, or Mint](https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu)라는 글로 잘 정리되어 있다.

실행해야할 명령들이 길고 시간이 오래 걸리며 중간에 에러가 나면 난처하다는 사소한 문제들이 있지만....

하나하나 copy and paste 하기 싫은 사람을 위해 이들 코드를 모아 봤다. 그냥 모은 것 뿐이다. bash script로 만들어 실행하면 좀 편할듯하다.

```bash
#!/bin/bash

# ffmpeg를 comfile 하기 위한 script
# 아래 내용을 바탕으로 하였음
# https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu

# Get the Dependencies

sudo apt-get update
sudo apt-get -y install autoconf automake build-essential libass-dev libfreetype6-dev libsdl1.2-dev libtheora-dev libtool libva-dev libvdpau-dev libvorbis-dev libxcb1-dev libxcb-shm0-dev libxcb-xfixes0-dev pkg-config texinfo zlib1g-dev

# 작업 폴더 만들기

mkdir ~/ffmpeg_sources

# compile and install codec librarys
## Yasm

cd ~/ffmpeg_sources
wget http://www.tortall.net/projects/yasm/releases/yasm-1.3.0.tar.gz
tar xzvf yasm-1.3.0.tar.gz
cd yasm-1.3.0
./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin"
make
make install
make distclean

## libx264 ===> 이게 h264의 역할을 한다.

cd ~/ffmpeg_sources
wget http://download.videolan.org/pub/x264/snapshots/last_x264.tar.bz2
tar xjvf last_x264.tar.bz2
cd x264-snapshot*
PATH="$HOME/bin:$PATH" ./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin" --enable-static --disable-opencl
PATH="$HOME/bin:$PATH" make
make install
make distclean

## libx265

sudo apt-get install cmake mercurial
cd ~/ffmpeg_sources
hg clone https://bitbucket.org/multicoreware/x265
cd ~/ffmpeg_sources/x265/build/linux
PATH="$HOME/bin:$PATH" cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX="$HOME/ffmpeg_build" -DENABLE_SHARED:bool=off ../../source
make
make install
make distclean

## libfdk-aac

cd ~/ffmpeg_sources
wget -O fdk-aac.tar.gz https://github.com/mstorsjo/fdk-aac/tarball/master
tar xzvf fdk-aac.tar.gz
cd mstorsjo-fdk-aac*
autoreconf -fiv
./configure --prefix="$HOME/ffmpeg_build" --disable-shared
make
make install
make distclean

## libmp3lame

sudo apt-get install nasm
cd ~/ffmpeg_sources
wget http://downloads.sourceforge.net/project/lame/lame/3.99/lame-3.99.5.tar.gz
tar xzvf lame-3.99.5.tar.gz
cd lame-3.99.5
./configure --prefix="$HOME/ffmpeg_build" --enable-nasm --disable-shared
make
make install
make distclean

## libopus

cd ~/ffmpeg_sources
wget http://downloads.xiph.org/releases/opus/opus-1.1.2.tar.gz
tar xzvf opus-1.1.2.tar.gz
cd opus-1.1.2
./configure --prefix="$HOME/ffmpeg_build" --disable-shared
make
make install
make clean

## libvpx

cd ~/ffmpeg_sources
wget http://storage.googleapis.com/downloads.webmproject.org/releases/webm/libvpx-1.5.0.tar.bz2
tar xjvf libvpx-1.5.0.tar.bz2
cd libvpx-1.5.0
PATH="$HOME/bin:$PATH" ./configure --prefix="$HOME/ffmpeg_build" --disable-examples --disable-unit-tests
PATH="$HOME/bin:$PATH" make
make install
make clean

# compile and install ffmpeg

cd ~/ffmpeg_sources
wget http://ffmpeg.org/releases/ffmpeg-snapshot.tar.bz2
tar xjvf ffmpeg-snapshot.tar.bz2
cd ffmpeg

## 앞에서 설치한 codec library를 사용하겠다는 설정을 하는 부분이다.
PATH="$HOME/bin:$PATH" PKG_CONFIG_PATH="$HOME/ffmpeg_build/lib/pkgconfig" ./configure \
  --prefix="$HOME/ffmpeg_build" \
  --pkg-config-flags="--static" \
  --extra-cflags="-I$HOME/ffmpeg_build/include" \
  --extra-ldflags="-L$HOME/ffmpeg_build/lib" \
  --bindir="$HOME/bin" \
  --enable-gpl \
  --enable-libass \
  --enable-libfdk-aac \
  --enable-libfreetype \
  --enable-libmp3lame \
  --enable-libopus \
  --enable-libtheora \
  --enable-libvorbis \
  --enable-libvpx \
  --enable-libx264 \
  --enable-libx265 \
  --enable-nonfree

PATH="$HOME/bin:$PATH" make
make install
make distclean
hash -r
```
