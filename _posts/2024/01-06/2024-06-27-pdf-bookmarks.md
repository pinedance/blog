---
layout: post
title:  "PDF 파일에 Bookmark 목차를 넣어보자"
categories: 코딩삽질기
tags: ['pdf', 'bookmark', '목차']
---

## 배경

PDF 파일에는 bookmark 기능이 있다. 이 기능을 이용해 책의 목차를 지정해 두면 목차를 보고 바로 본문을 찾을 수 있어서 유용하다. 

그러나 이를 다루기는 쉽지 않다. 우선 PDF viewer로 가장 많이 사용되는 무료 프로그램인 acrobat reader에서는 bookmark를 볼 수 있지만, 이를 추가 삭제 수정할 수 없다. bookmark를 수정하려면 유로 버전인 acrobat standard나 acrobat pro를 사용해야 한다. 

여기서 다루려고 하는 것은 대량의 bookmark가 있는 경우이다. acrobat 유료 버전을 사용하더라도 대량의 bookmark가 있다면 프로그램 상에서 이를 하나하나 넣어 주는 지루한 작업을 해야 한다. pdf 파일이 있고, bookmark data가 있다. 이 둘을 합칠 수는 없을까?

## PDFtk

[PDFtk](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/)라는 놀라운 도구가 있다. PDF에 관해 매우 많은 기능을 제공하는 어플리케이션이다. Windows, mac os, linux 등 다양한 OS를 지원해준다. 또한 GUI, CLI 등 원하는 방식으로 프로그램을 사용할 수 있다. 무료버전, 유로버전 그리고 Server 버전도 있다. 만약 PDF를 다루는 backend 개발을 원한다면 Server 버전이 유용할 것이다. 

예전에는 ubuntu와 같은 linux에서 `sudo apt install pdftk`와 같이 설치하여 사용할 수 있었다. 하지만 버전이 올라가서인지 설치는 되지만 실행 중에 오류가 발생한다. 현재 Red Hat 계열이나 CentOS 계열 OS에는 설치가 용이하다. 하지만 Ubuntu와 같은 경우에는 소스 코드를 내려 받아 직접 컴파일 해야 한다. 컴파일 방법은 [공식 홈페이지 설명](https://www.pdflabs.com/tools/pdftk-server/index.html#build)와 [이 글](https://www.baeldung.com/linux/install-pdftk)을 참고하자. 

다행스러운 것은 Windows 환경에서는 무료 버전을 쉽게 설치할 수 있고, bookmark 편집도 가능하다는 것이다. 공식 홈페이지에서 Windows용 무료 버전을 다운로드 받아 설치하면 된다. 

약간 어려운 것은 사용 방법이다. 설치 후 실행하면 GUI 창이 열린다. 하지만 여기에는 bookmark 편집 기능이 없다. windows의 CLI 환경인 CMD에서 이용해야 한다. 

PDFtk windows 버전을 설치했다면 윈도우에서 CMD(명령프롬프트)를 찾아 연다. 그런 뒤에 공식 홈페이지의 설명 ["How to Export and Import PDF Bookmarks"](https://www.pdflabs.com/blog/export-and-import-pdf-bookmarks/)를 따라 실행해 보자. 주요 내용을 요약하면 아래와 같다.

```cmd
pdftk path\source.pdf dump_data output path\pdf_data.txt
```

위와 같이 하면 source.pdf 파일에 있는 데이터가 모두 pdf_data.txt로 저장된다. 이 pdf_data.txt 파일을 열어보면 중간에 다음과 같은 부분이 있다. 이것이 bookmark data이다. 

```
BookmarkBegin
BookmarkTitle: PDF Reference (Version 1.5)
BookmarkLevel: 1
BookmarkPageNumber: 1
BookmarkBegin
BookmarkTitle: Contents
BookmarkLevel: 2
BookmarkPageNumber: 3
```

이 bookmark data를 수정한 뒤에 다시 다음 명령을 실행하면 수정된 내용이 pdf file에 적용된다. 

```cmd
pdftk path\source.pdf update_info path\pdf_data.txt output path\updated.pdf
```

여기서 주의할 점은, Bookmark title이 ASCII text가 아닐 때는 HTML numerical entities를 사용해야 한다는 점이다. 예를 들어 한글 "들어가며"는 "&#xB4E4;&#xC5B4;&#xAC00;&#xBA70;"라고 써 주어야 한다. 이 변환은 [온라인 툴](https://appdevtools.com/html-entity-encoder-decoder)을 쓰거나 [python의 html library를 이용](https://stackoverflow.com/a/7088472)하여 처리할 수 있다. 

```
BookmarkBegin
BookmarkTitle: &#xB4E4;&#xC5B4;&#xAC00;&#xBA70;
BookmarkLevel: 1
BookmarkPageNumber: 1
```

## JPdfBookmarks

위의 방법은 까다롭다. 대안은 없을까? pdf bookmark를 편집하기 위한 전용 프로그램들도 존재한다. [pdfWritebookmarks](https://github.com/goerz/pdfWriteBookmarks), [JPdfBookmarks](https://flavianopetrocchi.blogspot.com/) 등이다. 양자 모두 개발이 중지된 듯하다. JPdfBookmarks의 경우 최종 배포판은 2.5.2 버전으로 2011년에 배포되었다. 하지만 아직도 잘 실행된다. JPdfBookmarks는 java에 의존하고 있기 때문에 Java Runtime Environment가 설치되어 있어야 사용할 수 있다. 

JPdfBookmarks를 설치한 뒤 실행시키면 GUI 창이 열린다. 여기서 원하는 PDF 파일을 열고 작업을 수행한다. bookmark를 쓰고 읽는 기능은 `Tools > Dump`와 `Tools > Load`에 있다. 먼저 왼쪽 bookmark view에서 샘플로 bookmark를 몇 개 만든 뒤 `Tools > Dump`를 실행시키면 bookmark 내용이 text file로 저장되어 있는 것을 볼 수 있다. 이 text file을 바탕으로 bookmark data를 추가한 다음 `Tools > Load`로 읽어들이면 bookmark를 한 번에 추가할 수 있다. 

bookmark data는 대략 다음과 같은 모습이다. 

```
본문/10,Black,notBold,notItalic,open,FitPage
	개요1/11,Black,notBold,notItalic,open,FitPage
	개요2/15,Black,notBold,notItalic,open,FitPage
```






