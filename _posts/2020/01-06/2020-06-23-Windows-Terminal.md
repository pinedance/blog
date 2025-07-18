---
layout: post
title:  "Windows Terminal을 사용해보자"
categories: [코딩삽질기]
tags: ["Windows"]
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

## Theme

표시되는 화면의 색을 정할 수 있다. [공식 페이지의 설명](https://docs.microsoft.com/ko-kr/windows/terminal/customize-settings/color-schemes)과 같이 `name`을 정하고 각 색깔을 16진수 형식의 문자열로 지정하면 된다. 미리 조합된 화면을 보고 테마를 선택할 수 있는 [windows terminal themes](https://atomcorp.github.io/themes/) 페이지를 방문하여 색깔 조합을 보고 원하는 테마를 선택하자.

테마 정보는 `Windows Terminal > Settings`를 활성화 시켜서 `settings.json` 파일 속에 있는 `schemes` 아래 추가한다. 이 데이터는 list(array)이므로  기존의 것을 지우지 말고 하나 더 추가하는 방식을 택하자. 물론 여러가지를 추가해도 좋다.

WT가 `schemes` 아래에 있는 여러가지 테마 중에서 하나를 선택해야 한다. 따라서 아래와 같이 `profiles.defaults.colorScheme`의 값에 화면을 장식할 테마 이름을 넣어주도록 하자.

```js
  "profiles": {
    "defaults": {
      // Put settings here that you want to apply to all profiles.
      "colorScheme": "Argonaut",
    },
```

## CondaShell을 추가해 보자

윈도우에서 anaconda python을 사용한다면 conda prompt를 사용해야 편리한 작업이 가능하다. WT에 이 conda prompt를 CondaShell이라는 이름으로 추가해보자.

먼저  `Windows Terminal > Settings`를 활성화 시켜서 `settings.json` 파일을 열자. `profiles.list`를 보면, WT에서 열 수 있는 terminal의 종류가 나열되어 있다. 여기에 새로운 객체를 아래와 같이 넣어주자.

```js
{
 "guid": "{...}",
 "name": "CondaShell",
 "commandline": "",
 "startingDirectory": ".",
 "hidden": false
}
```

여기서 문제가 되는 것은 `guid`와 `commandline`이다. 전자는 power shell에서 아래와 같이 입력하여 새로운 `guid`를 발급받은 다음 추가해 넣으면 된다. 이때, 출력된 guid의 앞뒤를 `{...}`로 감싼 뒤 `settings.json`의 해당 위치에 넣어야 한다.  

```cmd
[guid]::NewGuid()
```

다음으로 `commandline`이다. 각자 윈도우에서 `conda prompt`를 찾아보자. 보통 `C:\Users\Username\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Anaconda3 (64-bit)` 아래에 있다. 이 아래 `Anaconda Powershell Prompt (anaconda3)`라는 파일이 있다. 이 파일의 `속성 > 바로가기 > 대상`을 보면, 이 파일이 활성화 되었을 때 실행하는 스크립트를 확인할 수 있다. 대략 아래와 같다.  

```cmd
%windir%\System32\WindowsPowerShell\v1.0\powershell.exe -ExecutionPolicy ByPass -NoExit -Command "& 'C:\Users\Username\anaconda3\shell\condabin\conda-hook.ps1' ; conda activate 'C:\Users\Username\anaconda3' "
```

이것을 아래와 같이 바꾸어 `commandline`에 넣어준다. 달라진 점은 `%windir%\System32\WindowsPowerShell\v1.0\powershell.exe`을 `powershell.exe`로 바꾼 것, 그리고 문자열 속에 넣기 위해 `\`와 `"`를 escape 처리해 준 점이다.

```cmd
"powershell.exe -ExecutionPolicy ByPass -NoExit -Command \"& 'C:/Users/Username/anaconda3/shell/condabin/conda-hook.ps1' ; conda activate 'C:\Users\Username\anaconda3' \""
```

이렇게 하고 저장한 뒤 WT 탭을 보면, `CondaShell`을 열 수 있다.

## REF

* [How to open the Windows Terminal (Preview) in File Explorer](https://superuser.com/questions/1481203/how-to-open-the-windows-terminal-preview-in-file-explorer)
* [윈도우 터미널 테마 적용하기](https://itstorys.tistory.com/381)
* [Windows Terminal: Generating GUIDs For Your Profiles](https://traviscolbert.net/blog/windows-terminal-generating-guids-for-your-profiles/)
