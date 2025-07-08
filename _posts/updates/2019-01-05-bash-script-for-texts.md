---
layout: post
title:  "[Cookbook] Bash에서 text(string) 다루기, 이럴 때 이렇게 한다."
categories: [NLP, Cookbook]
---

#### 기초

* [텍스트 자료 처리를 위한 bash 명령어1 : 텍스트 내용 살펴보기]({{ site.baseurl }}/2016/08/24/bash-functions-to-view-text)

* [텍스트 자료 처리를 위한 bash 명령어2 : 텍스트 조물거리기]({{ site.baseurl }}/2016/08/25/bash-functions-to-manipulate-text)

#### 여러 파일을 separator를 추가하여 합쳐보자

```bash
# append a newline after each file
sed -s '$G' *.txt > all.txt
# append a line of 8 dashes and a newline after each file
sed -s '$a--------' *.txt
```

```bash
# Insert a line of dashes before each file:
sed -s '1i--------' *.txt
# Do the same, but without a newline after the dashes:
sed -s '1s/^/--------/' *.txt
# Put a line of dashes on the end of the last line of each file:
sed -s '$s/$/--------/' *.txt
# Surround each file with curly braces:
sed -s -e '1i{' -e '$a}' *.txt
```

REF

* [Superuser/How can one join files with seperating data in bash?](https://superuser.com/a/103585)

#### 파일에서 어떤 부분을 지워보자

빈줄을 지워보자.

```bash
sed '/^$/d' text.txt
```

특정 패턴을 지워보자

```bash
# 정규식으로 "((OR))"로 시작하는 줄만 지워보자
sed -r '/^\(\((OR)\)\)/d' org.txt > rst.txt
```

특정 패턴만 남기고 지워보자

```bash
# 정규식으로 "((OR))"로 시작하는 줄만 남기고 지워보자
sed -r '/^\(\((OR)\)\)/!d' org.txt > rst.txt
```

#### 폴더 속에 있는 텍스트 파일의 글자 길이를 알아보자

```bash
ls | xargs wc -c
```

REF

* [stackoverflow/counting-number-of-characters-in-a-file-through-shell-script](https://stackoverflow.com/questions/5026214/counting-number-of-characters-in-a-file-through-shell-script)

#### 파일 속에서 불필요한 내용을 빼고 토큰을 공백으로 구분해보자

아래와 같이 `clean_and_tokenize.sh` 배치 파일을 만들어 실행한다.

```bash
#!/bin/bash
# clean_and_tokenize.sh inputfile.txt outputfile.txt
tr '[:upper:]' '[:lower:]' < $1 | # 입력파일($1)을 받아 대문자를 소문자로 바꾼다.
  tr '[:punct:]' ' ' |   # 구두기호를 스페이스 한 칸으로 바꾼다.
  tr '[:space:]' ' ' |   # 공백을 스페이스 한 칸으로 바꾼다.
  tr -cd '[:alnum:] ' |   # 모든 숫자와 알파벳을 제외한('-c') 글자를 삭제('-d')한다.
  tr -s ' ' > $2     # 연속된('-s') 공백을 스페이스 한 칸으로 바꾼다. # 결과 파일($2)에 넣어 준다.
```

REF

* [sbos/AdaGram.jl](https://github.com/sbos/AdaGram.jl/blob/master/utils/tokenize.sh)
* [wikipedia/tr(unix)](https://en.wikipedia.org/wiki/Tr_(Unix))
* [stackoverflow/commenting-in-a-bash-script](https://stackoverflow.com/questions/1455988/commenting-in-a-bash-script)

#### 파일 속에 있는 단어 당 출현 빈도를 목록으로 만들어 보자

아래와 같이 `word_freq.sh` 배치 파일을 만들어 실행한다.

단어는 공백을 기준으로 구분한다.

```bash
#!/bin/bash
# word_freq.sh inputfile.txt outputfile.txt
tr ' ' '\n' < $1 |  # 입력파일($1)을 받아 공백을 모두 개행으로 찾아 바꾼다.
  sort -S 10G |   # 소팅한다
  uniq -c |    # 등장 단어와 횟수를('-c') 출력한다
  awk '{print $2" "$1}' > $2  # 원하는 부분만 빼서 # 결과 파일($2)에 넣어 준다.
```

REF

* [sbos/AdaGram.jl](https://github.com/sbos/AdaGram.jl/blob/master/utils/dictionary.sh)
* [incodom/Linux 기본명령어 awk](http://www.incodom.kr/Linux/%EA%B8%B0%EB%B3%B8%EB%AA%85%EB%A0%B9%EC%96%B4/awk)
