---
layout: post
title:  "Java bytecode를 풀어보자, Java Decomplier"
categories: 코딩삽질기
---

가끔 java로 된 프로그램 내부가 궁금할 때가 있다. java는 자바 가상 머신에서 실행되도록 [Java bytecode](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94_%EB%B0%94%EC%9D%B4%ED%8A%B8%EC%BD%94%EB%93%9C)로 complie 되기 때문에 그대로 열어보면 내용을 알아볼 수 없다. 

이 java bytecode를 decomplie 해 주는 decomplier들이 존재한다. 오프라인에 설치해서 사용해도 좋지만, 온라인에서 제공하는 서비스도 있다. 

* [java decompiler](http://www.javadecompilers.com/)

사용해본 결과, 대부분 우수했으나 특정 문자가 깨지거나 하는 문제가 있는 경우가 있었다. 나의 경우에는 한자가 깨지지 않는 jdcore가 가장 좋았다. 