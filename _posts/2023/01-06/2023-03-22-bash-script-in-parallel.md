---
layout: post
title:  "Bash Shell Script 병렬 처리 하기"
categories: 코딩삽질기
tags: ['Bash', 'Parallel', '병렬 처리']
---

## 배경

GUI 환경은 직관적이지만 마우스 클릭을 많이 해야 하고 반복 작업을 자동화하기 힘들다. 그에 반해 CLI 환경은 직관적이지 않지만 간단한 스크립트를 짜거나 명령을 단순 반복 입력하여 반복 작업을 빠르게 수행할 수 있다. 그런 점에서 [Bash shell script](https://www.freecodecamp.org/news/bash-scripting-tutorial-linux-shell-script-and-command-line-for-beginners/)는 매우 매력적이다. 파일 이동, 파일명 변경, 파일 압축, 파일 다운로드 등 다양한 작업을 반복적으로 그리고 빠르게 수행할 수 있다.

하지만 종종 파일 다운로드, 파일 형식 변환 등 작업 시간이 긴 동작을 반복해야 할 때가 있다. 시스템 자원 부족이 아니라 단순히 시간이 많이 걸리는 작업이라면 병렬처리로 작업 시간을 대폭 줄일 수 있다. 사실 CPU가 멀티코어를 갖게된 지 오래되었다. 하지만 멀티코어를 효율적으로 이용하고 있는 소프트웨어는 많지 않다. 아직도 대부분의 소프트웨어들은 싱글 코어만 사용한다. Bash Shell에서 멀티 프로세스, 즉 병렬 처리를 할 수 있을까? 할 수 있다! 그렇다면 어떻게 하면 될까?

## 방법

### 간단한 방법

방법은 의외로 매우 간단하다. `&`와 `wait`을 사용하면 된다. 예를 들어 다운로드 받아야할 파일 목록이 `download_list.txt` 파일 속에 아래와 같이 있다고 해보자. 

```bash
https://www.remoterepository.com/001.zip
https://www.remoterepository.com/002.zip
https://www.remoterepository.com/003.zip
https://www.remoterepository.com/004.zip
```

직렬 처리를 하면 다음과 같이 다운로드 받을 수 있다. 아래와 같이 하면 파일을 순서대로 1개씩 내려받는다.

```bash
while IFS= read -r url
do
    curl -O "$url"
done < download_list.txt

echo "All files are downloaded."
```

이제 이 작업을 병렬 처리로 수행해 보자. 바뀐 것은 `&`와 `wait` 뿐이다. 여기서 `&`는 백그라운드에서 작업을 수행하라는 의미이고, `wait`은 병렬 처리가 모두 끝날 때까지 기다리라는 의미이다. 간단하지 않은가?

```bash
while IFS= read -r url
do
    curl -O "$url" &
done < download_list.txt
 
wait
echo "All files are downloaded."
```

## 조금 복잡한 방법

물론 위와 같이 하였을 때 너무 많은 작업이 동시에 일어나면 문제가 발생할 수 있다. 이럴 때는 병렬 처리 프로세스의 개수를 통제해 주어야 한다. 이 때는 [GNU parallel](https://www.gnu.org/software/parallel/)를 사용하자. 앞의 예제는 GNU parallel를 이용하여 다음과 같이 수행할 수 있다. 

```bash
parallel -j 4 curl -O -Q {} < download_list.txt
```


## REF

위 내용은 아래 참고 문서의 내용을 거의 그대로 소개한 것이다. 자세한 내용은 아래 문서에 있으므로 참고하자. 

* [How to run command or code in parallel in bash shell under Linux or Unix](https://www.cyberciti.biz/faq/how-to-run-command-or-code-in-parallel-in-bash-shell-under-linux-or-unix/)
