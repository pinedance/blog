---
layout: post
title:  "[Cookbook] Bash, 이럴 때 이렇게 한다."
categories: [코딩삽질기, Cookbook]
tags: ['bash']
---

## 배경

파일을 다운로드 받는다거나, 파일 이름을 바꾼다거나, 여러 텍스트 파일을 하나로 합친다거나 하는 일들은 단순해 보인다. 하지만 python 같은 프로그램을 이용하면 작은 프로그램을 새로 짜야 하기도 하거니와 파일을 열고 읽고 닫고 하는 등 여러 단계를 거쳐야 한다. 하지만 Bash에 이미 준비된 프로그램들을 이용하면 매우 쉽게 처리할 수 있다. Bash 이용 방법을 알아보기로 하자. 

## 내용이 많아 따로 작성한 페이지

{% include post_list_subject.html subject="bash" %}

### Bash 스크립트에서 자기 자신이 어떤 폴더에 위치해 있는지 알아야 할 때가 있다.

```bash
#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DIR="$( cd "$(dirname "$1")"; pwd -P)/$(basename "$1")"
```

REF
* [Get the source directory of a Bash script from within the script itself](https://stackoverflow.com/a/246128)

### Bash 스크립트에서 환경변수 설정하기

```file
CURRENTDIR="$(cd "$(dirname "$1")"; pwd -P)/$(basename "$1")"
LIBDIR="/LIB"

echo $CURRENTDIR
export PYTHONPATH=${PYTHONPATH}:${HOME}:${CURRENTDIR}${LIBDIR}
echo ${PYTHONPATH}
```


```bash
# use this
. activate_env_var.sh
# or this
source activate_env_var.sh
# but this is not working
./activate_env_var.sh
```
