---
layout: post
title:  "bash에서 파일 이름을 일괄 변환 해보자"
categories: 생활자동화
---

컴퓨터를 쓰다가 폴더 속의 파일의 이름을 한꺼번에 바꾸어야 할 때가 있다. 이런 경우 때문에 [renamer](https://www.den4b.com/products/renamer) 같은 프로그램들이 만들어졌다.

windows 10에서 bash가 지원되면서 bash를 통해 이런 작업을 해보고 싶어졌다. 하지만 별도의 프로그램을 설치하지 않으면 거의 shell 스크립트를 짜야 하는 모양이다.

나에게는 `mmv`라는 프로그램이 적당해 보였다.

예를 들어 다음과 같이 변환한다고 가정하면,

```
a0001.tif a0002.tif ...  ->  0001a.tif 0002a.tif
b0001.tif b0002.tif ...  ->  0001b.tif 0002b.tif
```

아래와 같이 실행시켜 주면 된다.

```
mmv 'a*.tif' '#1a.tif'
mmv 'b*.tif' '#1b.tif'
```

REF

* [mmv: Mass moving and renaming files](https://debaday.debian.net/2007/06/13/mmv-mass-moving-and-renaming-files/)
* [Rename multiple files shell](https://stackoverflow.com/questions/6911301/rename-multiple-files-shell)
* [Easily renaming multiple files.](https://debian-administration.org/article/150/Easily_renaming_multiple_files.)
