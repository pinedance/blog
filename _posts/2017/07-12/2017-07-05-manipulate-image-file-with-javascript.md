---
layout: post
title:  "이미지 파일 다루기 (feat javascript)"
categories: 생활자동화
---


## Can we manupulate image file without external library?

이미지 파일을 어떻게 다룰 수 있을까. 처음에는 익숙한 ruby를 사용하여 처리하려고 하였다. ruby gem 중에서 [Rmagick](https://rmagick.github.io/)이 가장 유명했다. 그러나 Rmagick은 imagemagick에 의존하고 있어서 machine에 imagemagick을 설치해야 사용할 수 있다. [imagemagick](https://www.imagemagick.org)은 매우 유명한 image library로, 편리하고 다양한 기능을 제공하고 있다. 하지만 무척 무겁다. 게다가 설명서가 방대해서 단순한 기능을 원하는 유저에게는 오히려 진입장벽 역할을 한다.

image manipulation으로 검색해 보면 python [Pillow](https://github.com/python-pillow/Pillow) library가 많이 나온다. 역시 python에 대한 인기를 실감할 수 있다. Pillow도 imagemagick은 아니지만 libjpeg-dev 등과 같은 많은 [external library](https://pillow.readthedocs.io/en/latest/installation.html#external-libraries)에 의존하고 있다.

성능과 기능을 우해 external library에 의존할 수 있다. 하지만 machine에 external library를 설치하기 어렵거나 linux 같이 설치 중에 문제가 생기는 경우에는 해당 기능을 사용할 수 없다. 게다가 대부분의 end user 들은 고차원적인 기능이 아니라 size 조정이나 grayscale 같은 단순한 기능을 찾는데, external library를 설치하고 의존해야 하거나 사용 방법이 방대하다면 그것 자체가 사용자에게는 부담이 될 수 있다.

그러던 차에 javascript를 알아 보았다. 흥미롭게도 javascript는 engine 자체에 Canvas API에 속해 있는 ImageData object를 통해 image를 어느정도 다룰 수 있게 되어 있다. 즉, 가벼운 기능 정도는 external library 없이도 실행시킬 수 있다는 뜻이다. 아마도 javascript가 ruby나 python과 같은 범용 언어와 달리 image가 많은 web을 다루는 것을 목적으로 하고 있기 때문인 듯하다. javascript에서는 [image 데이터의 기본인 pixel까지 해당 ImageData object를 이용해 다룰 수 있다](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas).

engine 자체 지원에 힘입어 javascript에서는 external library 의존 없이 javascript 만으로만 이루어진 image manipulation library들이 존재한다! 대표적인 것이 [CamanJS](http://camanjs.com/), [Jimp](https://github.com/oliver-moran/jimp) 등 이다.


## RGB and alpha


image를 다루기 위해서는 기본적으로 image가 어떻게 구성되는지 color space에 대해 알아야 한다. ([Image Manipulation in Python](https://www.codementor.io/isaib.cicourel/image-manipulation-in-python-du1089j1u)이라는 글에 자세히 설명되어 있다. 나 역시 이 글을 통해 관련 내용을 이해할 수 었다. )

image file은 RGB 정보를 담고 있고, 컴퓨터는 이 정보를 읽어 색깔을 표현한다. image를 다룬다는 것은 이 RGB 정보를 조정한다는 의미이다.

## Example

### ex: 흑백으로 만들기

이미지를 흑백으로 만들려면 어떻게 해야 할까. RGB 정보의 평균값을 RGB에 각각 다시 넣어주면 된다. 예를 들어 RGB값이 각각 [rgb(100, 50, 30)](https://convertingcolors.com/rgb-color-100_50_30.html)이라면, 세 수의 평균을 내서 [rgb(60, 60, 60)](https://convertingcolors.com/rgb-color-60_60_60.html) 이렇게 다시 넣어주면 된다. rgb(0, 0, 0)은 검은색, rgb(255,255,255)는 흰색이다. 그 사이의 무채색은 R과 G와 B의 값이 같은 값을 가진다.

### ex: 영인본처럼 만들기

일전에 [imagemagick을 이용해서 컬러 이미지를 영인본처럼 만드는 방법을 소개](http://pinedance.github.io/blog/2016/06/10/%EC%8A%A4%EC%BA%94-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%AC%B8%EC%84%9C-%ED%9D%91%EB%B0%B1-%EB%A7%8C%EB%93%A4%EA%B8%B0) 했었다. javascript를 이용하면 어떻게 할 수 있을까?

직관적으로 생각해보자. 일단 모든 컬러 이미지를 앞의 방법에 따라 흑백으로 만든다. 그러면 각 값들은 0에서 255 사이의 값을
 가지게 된다. 그런 뒤에 cutoff value를 정하고 그보다 높은 값들은 모두 흰색으로 만들고 그보다 작은 값들은 무채색 값을 유지하면 된다. 스캐너로 스캔한 자료라면 이정도로도 영인본처럼 종이와 글자를 뚜렷하게 구분할 수 있다.

node와 jimp를 이용하여 이를 구현해 봤다. [여기](https://github.com/pinedance/snippets/tree/master/BlackAndWhite)

안타깝게도 사진으로 찍은 자료에 그림자가 있어 밝기가 서로 다른 경우에는 결과가 그리 좋지 못하다. 밝은 곳과 어두운 곳의 cutoff value를 다르게 줄 수 있다면 해결할 수 있을 것 같은데, 생각보다 피곤한 작업이 될 것 같아 그만 두었다.

시간 날 때 시도해 봐야 겠다.
