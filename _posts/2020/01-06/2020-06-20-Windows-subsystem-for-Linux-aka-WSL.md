---
layout: post
title: "WSL(Windows Subsystem for Linux)에 대하여"
categories: [코딩삽질기]
tags: ["WSL", "WSL2"]
---

## 배경

Windows에서 Linux를 품게 되었다. 개발자들에게 큰 선물이다.

## 방법

WSL1 및 WSL2의 설치 및 사용은 그리 어렵지 않다.

최근 업데이트로 설치 방법이 더 간단해졌다. microsoft의 [공식 문서](https://docs.microsoft.com/en-us/windows/wsl/install)를 참고하자. 요약하여 자주 사용하는 명령어를 적어본다.

```bash
# power shell (관리자권한)
# install wsl ( short )
wsl --install
# install wsl ( detail )
wsl --install -d <Distribution Name>
# check available distributions
wsl --list --online # or "wsl -l -o"
# check your wsl status
wsl -l -v
# change wsl version from 1 to 2
wsl --set-default-version 2
wsl --set-version <Distribution Name> 2
# remove wsl installed
wsl --unregister <Distribution Name>
```

### WSL2

WSL2가 나왔다. 속도도 기능도 훨씬 좋다고 한다. docker 등 그간 사용하지 못했던 기능들을 사용할 수 있게 되었다. 옮겨가지 않을 이유가 있을까? 문제는 [filesystem 접근 속도가 매우 느리다](https://vxlabs.com/2019/12/06/wsl2-io-measurements/)는 점이다. 실시간으로 코드를 빌드해야 하는 경우 빌드 속도가 매우 느려질 수 있다. [프로젝트 파일을 Windows 파일 시스템이 아닌 Linux 파일 시스템에 저장하여 이를 극복](https://docs.microsoft.com/ko-kr/windows/wsl/compare-versions#use-the-linux-file-system-for-faster-performance)할 수 있다고는 하지만 번거로운 것이 사실이다.

windows 탐색기 주소 창에 `\\wsl$\<Distribution Name>\home`와 같이 입력해 보자. windows에서 WSL2 파일 시스템을 네트워크를 통해 인식하고 있다는 것을 알 수 있다. 여기에 쉽게 접근하기 위해 ①`mklink`로 link를 만들어 주는 방법, ②"네트워크 드라이브 연결" 기능을 통해 네트워크 드라이브로 설정해 주는 방법을 고려할 수 있다. 이 방법에 대한 자세한 설명은 [이 글](https://www.lesstif.com/software-architect/wsl-2-windows-subsystem-for-linux-2-89555812.html)을 참고하자. 나는 개인적으로 후자의 방법을 선호한다. 드라이브로 표시되면 하나의 독립된 공간으로 인식되기 때문이다.

참고로 WSL2로 업데이트 시킬 때 여러가지 오류를 일으키면서 계속 실패할 수 있다. WSL2는 kernel을 건드리기 때문에 windows에서 보안 에이전트 등의 프로그램이 동작하고 있다면 충돌을 일으켜 설치되지 않는 경우가 있다. 회사 컴퓨터에서 이런 일이 있을 수 있으니 참고하자. 보안 에이전트 문제를 해결하지 않으면 풀리지 않는 문제이므로 고생하지 말고 그냥 포기하기 바란다.

## REF

- [Windows 10에 Linux용 Windows 하위 시스템 설치 가이드](https://docs.microsoft.com/ko-kr/windows/wsl/install-win10)
- [WSL 1과 WSL 2 비교](https://docs.microsoft.com/ko-kr/windows/wsl/compare-versions)
