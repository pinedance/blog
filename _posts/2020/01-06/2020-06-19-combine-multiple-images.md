---
layout: post
title:  "여러 이미지를 이어붙여보자"
categories: [생활자동화]
tags: ['image']
---

## 배경

자주 있는 일은 아니지만 이미지를 이어 붙여야 할 때가 있다. 가로로 나란히 혹은 세로로 길게 말이다.

이럴 때는 image 처리의 본좌 [ImageMagick](https://www.imagemagick.org/script/index.php)을 이용하면 쉽게 할 수 있다.

## 방법

이미지를 가로로 이어붙이고 싶다면 아래와 같이 하면 된다.

```
convert in1.jpg in2.jpg in3.jpg +append out-in1-in2-in3-horizontally.jpg
```

옵션은 붙이는 방향에 따라 다음 2가지가 있다.

* `-append`: concatenates all images vertically, creating one column with n rows.
* `+append`: concatenates all images horizontally, creating one row with n columns.



## REF

* [Combine multiple images using ImageMagick](https://superuser.com/questions/290656/combine-multiple-images-using-imagemagick)
