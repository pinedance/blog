---
layout: post
title:  "생활자동화: 동영상에서 필요한 부분만 잘라내 보자"
categories: code 생활자동화
---

How to cut and split your video files on ubuntu (or mint)
==========================================================

Intro
-----

동영상에서 필요한 부분만 잘라내 보자!

살면서 가끔 동영상을 편집해야 하는 일이 있다. 동영상을 보는 것도 코덱이 없다느니 하는 이유로 어려운 마당에 편집이라니. 

복잡한 것은 모르겠고 어떤 부분만 잘라 내고 싶을 때가 있다. 

다행히 [팟인코더](http://tvpot.daum.net/application/PotEncoder.do)에 동영상을 잘라내는 기능이 있어 사용했었는데, 왠지 잘라낸 뒤에 파일이 변형되는 것 같아 찜찜했다. (내가 사용법을 잘 몰라서 그럴 수도 있다.)

얼마 전에 지인으로 부터 ubuntu에서 동영상을 편집하니 빠르고 오히려 더 쉽다는 이야기를 들었다. 지인이 말한 것은 `ffmpeg` 였는데, 조금 알아보니 동영상에서의 `imagemagick` 같은 본좌 프로그램이었다. 

***

TASK1
------

### 삽질1 : ffmpeg를 설치하라

문제는 `ffmpeg` 설치. 역시 리눅스 계열은 설치가 가장 어렵다. 구글신께 물어 보니 그냥 설치하면 특정 코덱이 깔리지 않는다는 둥 어려운 이야기들 투성이었다. 

늘 느끼는 것이지만, 문서가 복잡하고 많아도 가장 신뢰할 수 있는 것은 해당 프로젝트 페이지다. 

[ffmpeg 공식 홈페이지](https://www.ffmpeg.org/)에 들어가서 좀 찾아 보니 PPA(Personal Package Archives)를 통해 설치하는 방법이 소개되어 있었다. [여기](https://launchpad.net/~mc3man/+archive/ubuntu/trusty-media)

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

그냥 잘 설치되면 감사한 일이다. `libav-tools`에 대해 `unmet dependencies error`이 났다. 

다시 `sudo apt-get install libav-tools`를 해 보니 여러 library에 대해 `unmet dependencies error`이 났다. 

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

만약 처음부터 30초간만 잘라 내서 새로운 파일을 만든다면 다음과 같이 하면 된다. 

```
ffmpeg -i ORIGINALFILE.avi -vcodec copy -acodec copy -ss 00:00:00 -t 00:30:00 OUTFILE.avi
```

### 삽질4 : avconv 너 뭐냐?

삽질 끝에 동영상 잘라내기를 완수할 수 있었다. 

그런데 명령을 실행해 보니 다음과 같은 메시지가 나왔다. 

```
This program is not developed anymore and is only provided for compatibility. Use avconv instead (see Changelog for the list of incompatible changes).
```

avconv를 쓰란다. 

그래서 avconv를 설치하려니 어떻게 해야 할지 몰랐다. avconv 공식 페이지는 [여기](https://libav.org/avconv.html)로 되어 있는데, 설치 법을 찾아보니 libav 설치에 대해서만 나와 있는 것이 아닌가. 

구글신께 여러번 문의해본 결과, 앞에서 libav는 앞에서 dependency 문제를 일이켰던 libav (libav-tools) 였다. 

그렇다. libav가 몸체였던 것이다. ffmpeg나 avconv는 그 위해서 작동하는 응용 프로그램인 듯 했다. 

avconv 소개 페이지가 libav document에 있으니, avconv는 libav의 하위 프로그램이 아닐까? 이미 libav는 설치되어 있으니 그냥 실행해 볼까? 넘겨 짚고 그냥 avconv를 실행시켰더니 되더라. 

얏호!

***

Conclusion
----------

linux (ubuntu / mint 등)에서 동영상 편집의 본좌는 libav다. 동영상으로 무언가를 하고 싶다면 libav-tools를 설치해라. 

나의 경우는 ffmpeg 설치 과정에서 libav(libav-tools)를 dependency로 설치할 수 있었다. 

libav가 설치되면 avconv도 함께 설치되는 모양이다. 

ffmpeg에서 avconv를 사용하라니 그렇게 하자. 

```
sudo add-apt-repository ppa:mc3man/trusty-media
sudo apt-get update
sudo apt-get dist-upgrade
sudo apt-get install ffmpeg
```

```
avconv -i ORIGINALFILE.mp4 -acodec copy -vcodec copy -ss START -t LENGTH OUTFILE.mp4
```

Key words
---------

> split, cut, video
> libav-tools, ffmpeg, avconv


