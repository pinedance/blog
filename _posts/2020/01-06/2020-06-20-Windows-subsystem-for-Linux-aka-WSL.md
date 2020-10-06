---
layout: post
title: "WSL(Windows Subsystem for Linux)에 대하여"
categories: [코딩삽질기]
tags: ["wsl", "wsl2"]
---

## 배경

Windows에서 Linux를 품게 되었다. 개발자들에게 큰 선물이다.

## 방법

WSL1 및 WSL2의 설치 및 사용은 그리 어렵지 않다.

## 메모

### WSL2

WSL2가 나왔다. 속도도 기능도 훨씬 좋다고 한다. 그러나 [filesystem 접근 속도가 매우 느리다](https://vxlabs.com/2019/12/06/wsl2-io-measurements/). 실시간으로 코드를 빌드해야 하는 경우 빌드 속도가 매우 느려질 수 있다. [프로젝트 파일을 Windows 파일 시스템이 아닌 Linux 파일 시스템에 저장하여 이를 극복](https://docs.microsoft.com/ko-kr/windows/wsl/compare-versions#use-the-linux-file-system-for-faster-performance)할 수 있다고는 하지만 번거로운 것이 사실이다. 그래서 WSL2로 갔다가 그냥 WSL1을 쓰고 있다. 전환이 쉬워 다행이다.

## REF

-   [Windows 10에 Linux용 Windows 하위 시스템 설치 가이드](https://docs.microsoft.com/ko-kr/windows/wsl/install-win10)
-   [WSL 1과 WSL 2 비교](https://docs.microsoft.com/ko-kr/windows/wsl/compare-versions)
