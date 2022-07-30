---
layout: post
title:  "nohup을 통해 Bash에서 명령을 실행해 보자"
categories: 코딩삽질기
tags: ['bash', 'Ubuntu']
---

## 배경

최근 python을 이용하여 머신 러닝 프로젝트를 수행하고 있는데, 학습 시간이 길어 문제가 되었다. 기존의 방법처럼 bash에서 python 스크립트를 실행시키면 터미널을 닫았을 때(현재 터미널 세션이 종료 되었을 때) 중단되는 문제가 생긴다. 터미널을 닫아도 이와 상관 없이 스크립트가 계속 지속되게 하려면 어떻게 해야 할까? 

## 방법

`nohup`이라는 명령어가 이를 해결해 준다(no hang up의 약자). `nohup`을 이용하면 해당 프로세스가 백그라운드에서 데몬 형태로 수행되게 되므로 지금의 터미널을 닫아도 실행되고 있는 프로세스에는 영향을 주지 않게 된다. 사용 방법도 매우 단순하다. 아래와 같이 실행시켜주면 된다. 

```bash
nohup <MY COMMAND> &
# nohup bash my_shell_script.sh &
# nohup python my_python_script.py &
# nohup curl -O "https://www.my-great-site/datafile.json" &
```

nohup을 통해 명령을 내리면 본래 화면(standard output)에 나타나던 출력값들이 더이상 나타나지 않게 된다. 이 출력값들은 `nohup.out`이라는 파일에 대신 저장되게 된다. 가끔 출력 결과를 저장하고 싶을 때가 있는데, 이 때에도 유용하게 사용할 수 있다. 출력값을 확인하고 싶다면 아래와 같이 `nohup.out` 파일의 내용을 확인해 주면 된다. 

```bash
tail nohup.out
```

가끔 `nohup`을 통해 실행시킨 프로세스를 중단해야 할 경우가 있다. 기존의 방법으로 실행시켰다면 `ctrl + c`를 이용하여 중단시킬 수 있지만, 백그라운드 프로세스는 이와 같은 방식으로 종료할 수 없다. 따라서 `ps` 명령으로 현재 실행되고 있는 프로세스 목록에서 종료시킬 대상을 찾아 수작업으로 중단시켜주어야 한다. 

```bash
# grep process id
ps -ef | grep <MY COMMAND>
# ps -ef | my_shell_script.sh
# ps -ef | python
# ps -ef | curl
```

```bash
### 프로세스 종료
kill -9 <PROCESS-ID>
```



## REF

더 자세한 내용은 아래의 멋진 글에 잘 설명되어 있다. 참고하기 바란다. 

* [쉽게 설명한 nohup 과 &(백그라운드) 명령어 사용법](https://joonyon.tistory.com/entry/%EC%89%BD%EA%B2%8C-%EC%84%A4%EB%AA%85%ED%95%9C-nohup-%EA%B3%BC-%EB%B0%B1%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C-%EB%AA%85%EB%A0%B9%EC%96%B4-%EC%82%AC%EC%9A%A9%EB%B2%95)

