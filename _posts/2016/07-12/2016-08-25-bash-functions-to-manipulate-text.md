---
layout: post
title:  "텍스트 자료 처리를 위한 bash 명령어2 : 텍스트 조물거리기"
categories: 코딩삽질기
---


Bash functions to manipulate text 
===========================


wc
----

`-c`(바이트 수), `-m`(문자수), `-w`(단어수), `-l`(라인수)

```bash
# 라인 수
wc -l your_text.txt 
```

grep
-----

`-i`(대소문자 무시), `-c`(결과 라인 수), `-n`(라인 번호 함께), `-v`(일치하지 않는 라인)

```bash
# 빈 라인 제거
grep -v '^$' your_text.txt > your_text_without_empty_lines.txt 
```


tn
---

```bash
tr [<option>] <집합b> [<집합a>]
```

`-c`(집합b에 명시되지 않은 모든 문자), `-d`(집합b에 명시된 문자 삭제) `-s`(집합b에 명시된 문자가 연속으로 나타날 경우 하나로 축약)

파일 이름을 받지 않는다. 따라서 `<` 이용

```bash
# 모든 대문자를 소문자로 교체
tr 'A-Z' 'a-z' < your_text.txt 

# 공백을 기준으로 개행
tr ' ' '\n' < your_text.txt

# 알파벳을 제외한 모든 문자를 기준으로 개행 (영문자에 대한 tokenizing)
tr -sc 'A-Za-z' '\n' < your_text.txt

# 연속된 공백을 하나로 합침
tr -s ' ' < your_text.txt
```

sort
-----

`-n`(수치 정렬), `-r`(역순 정렬), `-k start[, stop]`(필드를 기준으로 정렬, start에서 stop까지)

sort 명령어는 locale의 영향을 받음

```bash
# 문자열 정렬
sort your_text.txt
# 숫자 오름차순
sort -n your_text.txt
# 숫자 내림차순
sort -nr your_text.txt
# 필드 정렬
sort -k1,1 -k2,2n your_text.txt
# locale과 상관 없이 코드값에 의한 정렬을 할 때
LC_ALL=C sort your_text.txt
```

uniq
-----

앞뒤 행만 비교하기 때문에 `sort`가 되어 있어야 전체 문서를 정리할 수 있다.

`-c`(출현 횟수를 함께 출력), `-d`(연속해서 중복된 라인만 출력), `-u`(중복되지 않은 라인만 출력, -d의 반대)

```bash
sort sample | uniq
```

cut
----

원하는 필드만 잘라냄

`-c`(선택할 문자 위치 지정), `-f`(필드 지정), `-d`(필드 구분자, 기본 구분자는 '\t' )

```bash
# 1-7번째 문자 선택
cut -c 1-7 your_text.txt
# 9번째 이후 문자 선택
cut -c 9- your_text.txt
# tab으로 구분된 첫번째 필드 선택
cut -f1 your_text.txt
# tab으로 구분된 두번째 필드 선택
cut -f2 your_text.txt
# 공백으로 구분된 첫번째 필드 선택
cut -d' ' -f1 your_text.txt
```

paste
-----

둘 이상의 파일의 같은 라인을 결합

`-d`(필드 구분자, 기본 구분자는 '\t' ), `-s`(직렬 결합 ,가로로)

```bash
paste abc 123
# 가로로
paste -s abc 123
```

diff
----

```bash
# 두 파일 비교
diff file1 file2
```

응용예
-----

```bash
# 일반적인 영문 텍스트에서 단어 토큰 빈도순으로 정리해보자
tr 'A-Z' 'a-z' < sample_text.txt | tr -sc '[A-Za-z]' '\n' | sort -i | uniq -c | sort -nr | tr -s ' ' > tmp.txt
cut -d ' ' -f2 tmp.txt > freq
cut -d ' ' -f3 tmp.txt > list
paste list freq > sample_text_token_freq.txt

# 위의 결과를 빈도순으로 정렬 (빈도가 같은 경우에는 알파벳)
sort -k2,2nr -k1,1 sample_text_token_freq.txt > sample_text_token_freq_sort.txt
```

ref : 이도길. 자료 처리를 위한 리눅스 명령어 사용법 (자료집). 2016

