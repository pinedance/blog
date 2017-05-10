---
layout: post
title:  "윈도우10 bash에 ruby와 jekyll을 설치해 보자"
categories: 코드삽질기
---

윈도우7을 윈도우10으로 업데이트 하면서 가장 기대했던 것은 bash의 등장이다. 

사실 무언가 개발을 하기 위해서는 정신건강을 위해 윈도우를 떠나는 것이 좋다. 특히 알파벳을 쓰지 않는 곳에서는 더욱 더. 

한국에서는 윈도우를 쓰지 않을 수 없기 때문에 (거의 종속 되어 있다고 봐야지... ) 윈도우 컴, 리눅스 컴, mac 등을 전전하며 지냈었다. 

다행히 클라우드의 대중화와 [`cloud9` 설치버전](https://github.com/c9/core)을 얻을 수 있었기 때문에 윈도우에서 클라우드 위 리눅스로 원격 작업을 하는 방법을 주로 사용해 왔다. 

하지만 이제 윈도우10에 bash가 들어 왔다. 

문득 클라우드 위 리눅스 컴에서 관리하고 있던 jekyll blog를 윈도우10에서 관리할 수 있겠다는 생각이 들었다. 

맞다. mac 쓰면 애초에 이런 고민 걱정 삽질 할 필요가 없다. T.T

아무튼, 그래서 윈도우 속 우분투 속 bash에 ruby와 jekyll을 설치해 봤다. 

역시 선구자가 길을 안내해 주어 따라해 봤다. 

구체적인 내용은 [Dave씨의 글](http://daverupert.com/2016/04/jekyll-on-windows-with-bash/)을 보시라~


### 참고

`ruby`, `node` 등을 설치할 때는 `rvm`, `nvm` 등 버전관리 프로그램을 통해 설치하는 것이 좋다. 설치하기도 비교적 용이하고 여러 버전이 설치되었을 때 정리하거나 사용하기도 쉽기 때문이다. 

글을 보니 현재 윈도우 bash 환경에서는 `rvm`이 설치되지 않는다고 한다. 그래서 제안한 것이 `ruby-switch`라는 작은 프로그램이다. 

버전관리 프로그램 없이 설치된 여러 버전의 ruby 가운데 어떤 것을 쓸 것인지 환경을 전환해 주는 프로그램 같다. 

### 추가

덧글 중에 `rvm`을 설치할 수 있다고 소개한 [andygauge씨의 글](http://www.yetanother.site/jekyll/2016/06/28/Jekyll-on-Windows-Subsystem-Linux.html)도 있었다. 따라해 보지 않았지만 참고하시라.

Ruby on Rails 환경을 구축하고 싶다면 역시 [Dave씨](http://daverupert.com/2016/06/ruby-on-rails-on-bash-on-ubuntu-on-windows/)의 방법을 참고하시라.

