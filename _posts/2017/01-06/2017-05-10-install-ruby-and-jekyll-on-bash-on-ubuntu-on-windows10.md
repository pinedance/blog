---
layout: post
title:  "윈도우10 bash에 ruby와 jekyll을 설치해 보자"
categories: 코딩삽질기
tags: ['ruby', 'jekyll']
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

#### ruby-switch

`ruby`, `node` 등을 설치할 때는 `rvm`, `nvm` 등 버전관리 프로그램을 통해 설치하는 것이 좋다. 설치하기도 비교적 용이하고 여러 버전이 설치되었을 때 정리하거나 사용하기도 쉽기 때문이다.

글을 보니 현재 윈도우 bash 환경에서는 `rvm`이 설치되지 않는다고 한다. 그래서 제안한 것이 `ruby-switch`라는 작은 프로그램이다.

버전관리 프로그램 없이 설치된 여러 버전의 ruby 가운데 어떤 것을 쓸 것인지 환경을 전환해 주는 프로그램 같다.

#### gem 설치 (sudo 없이 설치 & 실행)

ruby를 시스템에 그대로 설치하면 생기는 문제는 gem을 설치할 때 sudo를 써야 한다는 점이다.

일단 아래 명령어로 gem path를 확인해 보자. `/var/lib/gems/2.3.0`아래와 `/home/<username>/.gem/ruby/2.3.0`와 같이 보통 2개가 보인다.

```bash
gem env
```

그냥 `gem install jekyll`을 하면 전자 위치에 설치를 시도하기 때문에 권한 문제가 발생한다.

후자 위치에 설치하면 sudo 권한 없이 설치 실행이 가능하다.

그럼 어떻게 바꿔줄 수 있을까.

gem을 설치할 때 다음과 같이 하면 된다.

```bash
gem install --user-install gem_name
```

매번 `--user-install` 옵션을 주는 것이 귀찮다면 다음과 같이 설정을 바꾸면 된다.

```bash
echo "gem: --user-install" > ~/.gemrc
```

이제 마지막으로 gem을 bash에서 실행시킬 수 있어야 한다. 지금 상태로는 찾을 수 없다며 실행되지 않는다.

아래 명령을 실행시켜 gem 폴더를 등록하자.

```bash
echo "export PATH=$PATH:/home/<username>/.gem/ruby/2.3.0" > ~/.bashrc
```

#### jekyll 설치

```bash
gem install jekyll
```

계속 실폐다. 찾아보니 [여러가지 이유](https://github.com/jekyll/jekyll-help/issues/209)가 있을 수 있단다.

나의 경우에는 허탈하게도 `make` package가 설치되어 있지 않아서였다.

다음 명령으로 설치 후 jekyll을 설치할 수 있었다.

```bash
sudo apt-get install make
```

#### bundle install

`jekyll new <name>`을 한 뒤에는 `bundle install`을 하게 된다. 일반적으로는 gem directory에 설치되지만, 앞에서 sudo를 쓰지 않기 위해 경로를 바꾸었다.

고민하지 말고 bundle gem 들을 아래와 같이 프로젝트 폴더 안에 설치하자.

```bash
bundle install --path vendor/bundle
```

#### jekyll 실행

```bash
jekyll s	# => "Auto-regeneration may not work on some Windows versions"
```

위와 같이 실행하면 애러와 함께 jekyll server가 중단된다. windows bash의 문제이다. 아직 해결되지 않은 이슈인 듯하다.

임시로 다음과 같이 하면 사용할 수 있다. [ref](https://github.com/Microsoft/BashOnWindows/issues/216)

```bash
jekyll serve --force_polling
```


### 추가

덧글 중에 `rvm`을 설치할 수 있다고 소개한 [andygauge씨의 글](http://www.yetanother.site/jekyll/2016/06/28/Jekyll-on-Windows-Subsystem-Linux.html)도 있었다. 따라해 보지 않았지만 참고하시라.

Ruby on Rails 환경을 구축하고 싶다면 역시 [Dave씨](http://daverupert.com/2016/06/ruby-on-rails-on-bash-on-ubuntu-on-windows/)의 방법을 참고하시라.
