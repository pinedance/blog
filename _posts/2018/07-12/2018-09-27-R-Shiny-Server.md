---
layout: post
title:  "R Shiny Server를 사용해 보자."
categories: 코딩삽질기
---

> R로 만든 plot들을 web에서 동적으로 보여줄 수 있다.

[Shiny](https://shiny.rstudio.com/)는 [Rstudio](https://www.rstudio.com/)에서 만든 R package이자 소프트웨어이다.

Shiny에서 제공하고 있는 [Gallery](https://shiny.rstudio.com/gallery/)를 보면, 어떤 것인지 바로 이해할 수 있다.

자기가 고민한 내용들을 사람들에게 직접 체험해 보게 한다는 점에서 매우 효과적이다. 2014년 처음 알게 되었을 때는 아름답다고까지 생각했다.

R로 Shiny app을 만들어 web에 deploy하는 방법은 크게 두 가지가 있다. 후자에 비해 전자가 쉽지만, free plan은 여러가지 제약이 많은 편이다.

* [Shinyapps.io](http://www.shinyapps.io/)라는 cloud service를 이용하는 방법
* 직접 server를 돌리는 방법

개인 서버가 존재한다면, 직접 shiny server를 설치하여 운영하는 것이 유리할 수 있다.

shiny server는 [여기](https://www.rstudio.com/products/shiny/download-server/)에서 다운로드 받아 설치하면 된다. 설치 방법은 해당 페이지에 잘 설명되어 있기 때문에 크게 어렵지 않다. 일단 설치가 끝나면 리부팅 후에도 자동으로 실행되기 때문에 더 필요한 일이 없다.

그러나 아래와 같이 사용자의 필요에 따라 [config file](http://docs.rstudio.com/shiny-server/#default-configuration)을 손봐야 할 때가 있다. config file은 `/etc/shiny-server/shiny-server.conf`에 위치하고 있다.

* 실행 권한 문제를 해결  `run_as shiny;`
* port 변경 `listen 3838;`
* app 실행 경로 변경 `site_dir /srv/shiny-server;`

수정 후에는 `sudo systemctl restart shiny-server`를 통해 서버를 재시작 한다.

상세한 내용들은 [Administrator's Guide](http://docs.rstudio.com/shiny-server/)에 잘 설명되어 있다. 물론 양이 많지만 말이다.

이 글에서는 몇 가지 문제들과 해결책을 기록해 둔다.


### 권한 문제

shiny server에 올바른 shiny app을 올렸으나 브라우저에 error를 내며 올바르게 실행되지 않는 경우가 있다. 이런 경우에는 log file을 확인해 본다. log file은 기본적으로 `/var/log/shiny-server`에 위치하고 있으며, 실행시킨 시간과 해당 app을 file name으로 하고 있다.

열어 보면 대부분 어떤 library가 설치되어 있지 않다고 나온다. R에 이미 설치되어 있는데도 말이다. 참으로 답답한 일이다.

이 문제의 원인은 user가 달라 생긴다. shiny server는 shiny라는 user로 실행 되는데, R console에서 library를 설치할 때는 주로 일반적인 사용자 user로 설치하기 때문이다. 따라서 shiny user 입장에서는 설치 안된 셈이 된다.

이 문제는 shiny server를 R을 다루는 user로 실행시키면 해결할 수 있다. 만약 ubuntu라는 user로 R console을 사용하고 library를 설치한다면, shiny를 ubuntu라는 user로 실행시킬 수 있다. 앞서 config file에서 `run_as shiny;`라고 되어 있는 것을 `run_as ubuntu;`라고 바꿔주면 된다.

REF
* [An error has occurred The application failed to start](https://github.com/rstudio/shiny-server/issues/153#issuecomment-261154339)

### plot에 한글이나 한자가 표시되지 않는 문제

이 문제는 shiny의 문제라기 보다는 server 자체의 문제이다. server 자체에 해당되는 font가 존재하지 않기 때문에 표시할 수 없어서 발생한다. 이런 문제는 ubuntu 등 linux 기반 서버들에서 공통적으로 나타날 수 있다.

이를 해결하기 위해서는 os에 한글이나 한자를 지원하는 font를 설치해 주면 된다. 설치 방법은 다음과 같다. (ubuntu 기준)

해당 font를 `/usr/share/fonts/` 폴더에 넣어준다.

그런 다음 아래 명령을 실행한다.

```bash
# bash
fc-cache -f -v
```
