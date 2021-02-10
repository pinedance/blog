---
layout: post
title:  "Bash에서 cursor를 new line 처음에 놓이게 해보자"
categories: [코딩삽질기]
tags: ['bash']
---


## 배경

Windows에 WSL(Windows Subsystem for Linux)이 추가되면서 bash를 사용하는 일이 더 많아졌다. 

인간은 환경의 지배에서 벗어날 수 없는 존재이기에 사소하지만 작은 개발 환경의 변화는 작업 효율에 영향을 미친다. 

bash는 기본적으로 cursor 앞에 아래와 같이 현재 user와 machine name. path를 출력해 준다. 

```bash
JoneDoe@Macbook-lite:~/this/is/my/current/working/directory$ls -al
```

현재 상태를 파악할 수 있어서 편리하지만, 종종 path가 길어지면 cursor가 오른쪽 끝에 위치하여 명령어를 쓸 자리가 줄어들게 된다. 

아래와 같이 커서를 그 다음 행 처음으로 이동시키고 싶어진다. 어떻게 해야 할까. 

```bash
JoneDoe@Macbook-lite:~/this/is/my/current/working/directory$
▶ls -al
```

## 방법

방법은 간단하다. `~/.bashrc` 파일에 아래와 같은 내용을 추가해 주면 된다. 

```bash
# ~/.bashrc
PS1="$PS1\n"
```

나는 현재 이를 조금 변형하여 아래와 같이 사용하고 있다. 

```bash
# ~/.bashrc
PS1="${PS1:0:-1}\n▶ "
```

bash 환경은 `~/.bashrc` 이외에도 `~/.bash_profiile`, `~/.profile` 등에서도 할 수 있다. 하지만 각각의 파일의 쓰임이 약간씩 다르기 때문에 현재 자신의 상황에 맞게 설정해 주어야 한다. 

이들의 차이에 대해서는 [.bashrc 와 .bash_profile 의 차이](https://jongmin92.github.io/2016/12/13/Linux%20&%20Ubuntu/bashrc-bash_profile/)를 참조하자. 

## REF

* [bash terminal, want the cursor to be shown at the beginning of the next line](https://stackoverflow.com/questions/47228918/bash-terminal-want-the-cursor-to-be-shown-at-the-beginning-of-the-next-line)