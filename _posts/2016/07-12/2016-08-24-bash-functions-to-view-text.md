---
layout: post
title:  "텍스트 자료 처리를 위한 bash 명령어1 : 텍스트 내용 살펴보기 "
categories: NLP, bash
---


Bash functions to view text
===========================


cat
----

```bash
# 파일 내용을 화면에 출력
cat your_text.txt

# 여러 파일의 내용 이어서 화면에 출력
cat your_text1.txt  your_text2.txt  your_text3.txt

# 여러 파일의 내용을 한 파일에 쓰기
cat your_text1.txt  your_text2.txt  your_text3.txt  > your_text_all.txt
```

more / less
-------------

화면 스크롤 : 화살표, space, `f`, `b`

끝내기 : `q`

head / tail
------------

```bash
# 앞에서 20행 보기 (기본값 10행)
head -20 your_text.txt

# 끝에서 20행 보기 (기본값 10행)
tail -20 your_text.txt
```

REF
* 이도길. 자료 처리를 위한 리눅스 명령어 사용법 (자료집). 2016
