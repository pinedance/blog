---
layout: post
title:  "Python code를 bat file로 자동실행해 보자."
categories: 코딩삽질기
---

windows 환경에서 bat file을 만들어 python 코드를 실행하면 편리하겠다는 생각이 들었다. 그런데 문제는 windows cmd 환경에서는 anaconda python이 바로 실행되지 않는다. 환경변수가 올라와 있지 않기 때문이다.

이런 경우에는 먼저 anaconda python의 env를 새로 만들어 준 다음 아래와 같이 bat file을 만들어 실행시킬 수 있다.

```bat
# myBatFile.bat
@echo off
start C:\Anaconda3\envs\myenv\python C:\myPythonCode.py %*
pause
```
