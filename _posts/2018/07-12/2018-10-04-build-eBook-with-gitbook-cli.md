---
layout: post
title:  "Gitbook-cli로 eBook을 만들어 보자."
categories: 생활자동화
---

## 개요

스마트 디바이스가 보편화 되면서 전자 매체를 통해 문자나 이미지, 소리나 동영상을 접하는 일이 보편화 되었다. 이는 HTML5의 사용과 브라우저 성능 개선, 그리고 어디에서나 인터넷에 접속할 수 있는 환경이 구축되면서 가능해 졌다. 한 때 각광받던 epub과 같은 eBook에 대한 수요가 폭발적으로 늘지 않는 것은 굳이 이런 포멧이 아니더라도 웹을 통해 책(혹은 정보)을 읽을 수 있게 되었다기 때문일 것이다.

하지만 아직 인류에게 책에 대한 향수가 남아 있고, 소유하거나 전달하기 쉽다는 점에서 PDF, ePub, mobi 등의 eBook 포멧에 대한 수요는 여전히 존재한다.

[Gitbook](https://www.gitbook.com/)은 eBook을 전문으로 하고 있는 플렛폼으로, markdown이라는 간단한 양식으로 문서를 작성하면, 이를 html로 웹에서 보여줄 뿐만 아니라 PDF, ePub, mobi 등 다양한 포멧으로 변환시켜주는 편리한 서비스이다.

기존 서비스를 잘 사용하고 있었는데, 최근 서비스를 완전히 개편하면서 원하는 기능이 사라졌다. 기존 서비스는 아직 [gitbook legacy](https://legacy.gitbook.com/)라는 이름으로 열려 있는 상태이지만, 조만간 폐쇄된다고 한다.

다행히 gitbook은 open source project로서 [gitbook-cli](https://github.com/GitbookIO/gitbook-cli)라는 설치형 프로그램이 공개되어 있다. 이것을 설치하면 local machine에서 기존에 온라인에서 서비스되던 gitbook을 사용할 수 있다. （GUI editor 같은 기능은 지원되지 않는다.）

gitbook-cli는 흡사 [jekyll](https://jekyllrb.com/)과 같이 markdown으로 집필된 원고를 html로 build（static page） 해 주는 역할을 하며, eBook management 프로그램 [Calibre](https://calibre-ebook.com/)를 통해 이를 pdf, epub, mobi 등 다른 포멧으로 변환시켜 준다.


## Gitbook-cli 및 Calibre 설치

### install [gitbook-cli](https://github.com/GitbookIO/gitbook-cli)

먼저 gitbook-cli를 설치한다.

```bash
npm install -g gitbook-cli
gitbook install
```

### install Calibre

다음으로 gitbook-cli가 의존하고 있는 Calibre를 설치한다.

[install Calibre](https://pinedance.github.io/blog/2018/10/04/Calibre-Cookbook#install) 참조


※ 참고

managing gitbook version

```bash
# https://github.com/GitbookIO/gitbook-cli
gitbook ls                ## List installed versions
gitbook ls-remote         ## List installed versions
gitbook fetch 2.1.0       ## Install a specific version
gitbook update            ## Update to the latest version
gitbook uninstall 2.0.1   ## Uninstall a specific version
```


## 사용법

gitbook을 이용하기 위해서는 원고를 gitbook에서 인식할 수 있는 폴더 구조와 포멧으로 만들어 줘야 한다. 이에 대해서는 [document](https://toolchain.gitbook.com/)에 설명되어 있으므로 생략하고, 여기에서는 gitbook-cli에 대한 것만 간단히 적어 본다.

### 주요 command

build HTML

```bash
gitbook help
```

```bash
# 책을 만들 폴더 안으로 이동
gitbook init
gitbook build
# gitbook build ./mybook --gitbook=2.0.1
gitbook serve
```

build other ebook format

```bash
# Calibre needed
gitbook pdf
gitbook epub
gitbook mobi
```

## eBook 배포

github page를 이용하여 만들어진 html ebook을 공개할 수 있다.

* [깃헙 Pages에 깃북 배포하기](https://beomi.github.io/2017/11/20/Deploy-Gitbook-to-Github-Pages/)
* [윈도우에서 깃북 제작 및 깃헙 페이지로 호스팅하기](https://blog.psangwoo.com/coding/2018/01/31/gitbook-on-windows.html)
