---
layout: post
title:  "Windows Terminal을 사용해보자"
categories: [코딩삽질기]
---

## 배경

Windows10에서 개발자를 위한 여러가지 서비스를 제공하고 있다. 얼마 전에는 업데이트를 통해 [WSL2](https://docs.microsoft.com/ko-kr/windows/wsl/wsl2-index)가 배포되기도 하였다. Windows에서 Linux에서 사용하던 거의 모든 것을 사용할 수 있게 되었다는 뜻이다. 

여기에 더하여 Windows Terminal(이하 WT)이라는 오픈소스 앱도 출시 되었다. 하나의 앱에서 `Power Shell`, `CMD`, `Bash` 등 여러가지 터미널 환경을 사용할 수 있는 프로그램이다. 이거 하나 열어 놓고 이리저리 옮겨 가면서 작업을 할 수 있어 편리하다. 

## 설치

설치는 [여기](https://www.microsoft.com/ko-kr/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab)서 할 수 있다. 

## 원하는 경로에서 WT 실행

설치 후에 실행시키면 그대로 사용할 수 있다. 다만 윈도우 사용자는 작업 폴더를 열어 놓고 파일에 접근하게 되는데, 해당 폴더에서 WT을 실행시키면 편리하다. 이럴 때는 아래 2가지 단계가 필요하다. 

### 폴더창에서 WT 실행하기

우선 폴더창 상단의 경로표시줄(주소표시줄)에 경로를 삭제한 후 `wt`라고 쳐보자. 그러면 WT가 실행되는 모습을 볼 수 있다. 하지만 열려 있는 폴더창 경로에서 실행되지는 않는다. 

### 폴더창 경로를 기본값으로 설정하기

이를 위해서는 설정 파일을 수정해 주어야 한다. WT를 연 상태에서 `ctrl + ,`를 누르거나 `설정` 메뉴를 실행시키면 설정값을 변경할 수 있는 `settings.json`에 접근할 수 있다. 이 파일에는 각각의 `profiles`가 있는데, 이 하나하나가 터미널에서 접근할 수 있는 콘솔들이다. 원하는 프로파일에 아래와 같은 값을 추가해 준다. 그리고 저장한다. 

```
"startingDirectory" : ".",
```

이제 앞의 방법과 같이 다시 실행하면 해당 경로에서 WT가 실행되는 것을 확인할 수 있다. 

## REF

[How to open the Windows Terminal (Preview) in File Explorer](https://superuser.com/questions/1481203/how-to-open-the-windows-terminal-preview-in-file-explorer)
