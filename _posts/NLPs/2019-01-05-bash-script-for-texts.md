---
layout: post
title:  "Bash에서 text(string) 다루기 Cookbook"
categories: NLP
---

#### 폴더 속에 있는 텍스트 파일의 글자 길이를 알아보자.

```
ls | xargs wc -c
```

REF
* [stackoverflow/counting-number-of-characters-in-a-file-through-shell-script](https://stackoverflow.com/questions/5026214/counting-number-of-characters-in-a-file-through-shell-script)

#### 파일 속에서 불필요한 내용을 빼고 토큰을 공백으로 구분해보자.

아래와 같이 `clean_and_tokenize.sh` 배치 파일을 만들어 실행한다.

```bash
#!/bin/bash
# clean_and_tokenize.sh inputfile.txt outputfile.txt
tr '[:upper:]' '[:lower:]' < $1 |	# 입력파일($1)을 받아 대문자를 소문자로 바꾼다.
  tr '[:punct:]' ' ' |			# 구두기호를 스페이스 한 칸으로 바꾼다.
  tr '[:space:]' ' ' |			# 공백을 스페이스 한 칸으로 바꾼다.
  tr -cd '[:alnum:] ' |			# 모든 숫자와 알파벳을 제외한('-c') 글자를 삭제('-d')한다.
  tr -s ' ' > $2 				# 연속된('-s') 공백을 스페이스 한 칸으로 바꾼다. # 결과 파일($2)에 넣어 준다.
```

REF
* [sbos/AdaGram.jl](https://github.com/sbos/AdaGram.jl/blob/master/utils/tokenize.sh)
* [wikipedia/tr(unix)](https://en.wikipedia.org/wiki/Tr_(Unix))
* [stackoverflow/commenting-in-a-bash-script](https://stackoverflow.com/questions/1455988/commenting-in-a-bash-script)

#### 파일 속에 있는 단어 당 출현 빈도를 목록으로 만들어 보자.

아래와 같이 `word_freq.sh` 배치 파일을 만들어 실행한다.

단어는 공백을 기준으로 구분한다.

```bash
#!/bin/bash
# word_freq.sh inputfile.txt outputfile.txt
tr ' ' '\n' < $1 |		# 입력파일($1)을 받아 공백을 모두 개행으로 찾아 바꾼다.
  sort -S 10G |			# 소팅한다
  uniq -c |				# 등장 단어와 횟수를('-c') 출력한다
  awk '{print $2" "$1}'	> $2  # 원하는 부분만 빼서 # 결과 파일($2)에 넣어 준다.
```

REF
* [sbos/AdaGram.jl](https://github.com/sbos/AdaGram.jl/blob/master/utils/dictionary.sh)
*
[incodom/Linux 기본명령어 awk](http://www.incodom.kr/Linux/%EA%B8%B0%EB%B3%B8%EB%AA%85%EB%A0%B9%EC%96%B4/awk)
