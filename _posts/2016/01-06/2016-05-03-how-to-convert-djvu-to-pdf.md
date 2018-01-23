---
layout: post
title:  "djvu 파일을 pdf로 바꿔보자"
categories: 생활자동화
---

간혹 중국에서 만들어진 자료들을 보면 `djvu`라는 확장자를 가진 문서파일들이 있다. 열람하기도 어렵고 다루기도 어려워 PDF로 변환하고 싶은데, 어떻게 해야 할까?

`imagemagick`을 이용하여 변환하는 방법이 가장 쉽다. 

```
convert yourimage.djvu newimage.pdf
```


ref : [how to convert djvu to pdf](https://answers.launchpad.net/ubuntu/+source/firefox-3.0/+question/55029)


Windows라면 [DjVu Converter](http://www.djvuconverter.com/)라는 프로그램을 사용할 수 있다. 