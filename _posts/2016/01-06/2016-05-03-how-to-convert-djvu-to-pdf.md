---
layout: post
title:  "djvu 파일을 pdf로 바꿔보자"
categories: 생활자동화
---

간혹 중국에서 만들어진 자료들을 보면 `djvu`라는 확장자를 가진 문서파일들이 있다. 열람하기도 어렵고 다루기도 어려워 PDF로 변환하고 싶은데, 어떻게 해야 할까?

djvu 형식은 디지털 문서 표준 형식으로 pdf보다 압축율이 더 좋다. 따라서 pdf로 변환하면 용량이 더 커진다. djvu의 자세한 사항은 [wiki의 설명](https://ko.wikipedia.org/wiki/DjVu)를 참조하자.

## USE imagemagick

`imagemagick`을 이용하여 변환하는 방법이 가장 쉽다. 하지만 pdf 결과의 용량이 매우 커진다. 필요에 따라적절한 옵션을 추가해야 하는 어려움이 있다.

```bash
convert yourimage.djvu newimage.pdf
```

```bash
for d in *; do convert ${d%.*}.djvu ${d%.*}.pdf ;done
```

REF
* [how to convert djvu to pdf](https://answers.launchpad.net/ubuntu/+source/firefox-3.0/+question/55029)


## USE ddjvu

djvu를 다루는 표준 라이브러리인 [`djvulibre`](http://djvu.sourceforge.net/)가 있다. 뷰어를 포함한 많은 기능을 담고 있다. 이 속에 djvy를 다른 형식으로 변환하여 주는 `ddjvu` 프로그램이 있다. 구체적인 사용방법은 [DDJVU 메뉴얼](http://djvu.sourceforge.net/doc/man/ddjvu.html)을 보자.

```bash
# install
sudo apt-get install djvulibre-bin
```

```bash
ddjvu -format=pdf -quality=85 -verbose a.djvu a.pdf
```

```bash
for d in *; do ddjvu -format=pdf -quality=85 ${d%.*}.djvu ${d%.*}.pdf ;done
```

REF
* [How do I convert a DjVu document to PDF in Linux using only command line tools?](https://superuser.com/questions/100572/how-do-i-convert-a-djvu-document-to-pdf-in-linux-using-only-command-line-tools)

## USE djvu2pdf_0.9.2-1_all.deb

`djvulibre`를 이용하여 만든 변환 프로그램도 존재한다. [`djvu2pdf`](https://0x2a.at/site/projects/djvu2pdf/)이다. 사용방법이 간단하다. 

```
for dj in djvu/*; do djvu2pdf ${dj}; done
```

REF
* [djvu2pdf](https://0x2a.at/site/projects/djvu2pdf/)


## USE DjVu Converter

Windows라면 [DjVu Converter](http://www.djvuconverter.com/)라는 프로그램을 사용할 수 있다.
