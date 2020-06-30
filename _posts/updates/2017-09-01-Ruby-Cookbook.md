---
layout: post
title:  "[Cookbook] Ruby, 이럴 때 이렇게 한다."
categories: [코딩삽질기, Cookbook]
---

## 배경

Ruby를 사용하면서 얻은 잔기술들을 기록해 둔다.

## 내용이 많아 따로 작성한 페이지

{% include post_list_subject.html subject="ruby" %}

## Install Ruby

ubuntu를 기준으로 설명한다. 가장 간단한 방법은 `apt install ruby`를 통해 설치하는 것이다. 그러나 이렇게 하면 최신 버전을 설치할 수 없을 뿐만 아니라 gem으로 package를 설치할 때 권한 문제가 생겨날 수 있다. 따라서 [RVM](https://rvm.io/)과 같은 버전관리 도구를 이용할 것을 강력하게 권장한다.

```bash
# install ruby via rvm
gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
curl -sSL https://get.rvm.io | bash -s stable --ruby
```

ruby를 설치하거나 package를 설치할 때 SSL 문제로 연결이 되지 않을 수 있다. 이 때는 [여기](https://pinedance.github.io/blog/2017/11/02/how-to-bypass-SSL)를 참고하라.

## Gem

Ruby에서는 package를 `gem`을 통해 설치한다.

```bash
gem install <package-name>
```

ubuntu와 같은 linux 계열의 시스템의 경우 권한 문제로 package가 설치되지 않을 수 있다. 가장 좋은 방법은 ruby를 설치할 때 바로 설치하지 않고 [RVM](https://rvm.io/)과 같은 버전 관리자를 통해 설치하는 것이다. 하지만 이미 설치한 상태라면 다음과 같이 package가 설치되는 폴더를 수정하여 이 문제를 회피할 수 있다. ☞ [ref](https://stackoverflow.com/a/50361633)

```bash
# make new package path
mkdir ~/.ruby
# set new package path as system variable
echo 'export GEM_HOME=~/.ruby' >> ~/.bashrc
echo 'export PATH="$PATH:~/.ruby/bin"' >> ~/.bashrc
# apply new env
source ~/.bashrc
```


***

## Packages

### Natural Language Processing

* [nlp-with-ruby](https://github.com/arbox/nlp-with-ruby/blob/master/readme.md)
* [Text](https://github.com/threedaymonk/text/blob/master/README.rdoc) A collection of text algorithms.
* [Treat](https://github.com/louismullie/treat) is a toolkit for natural language processing and computational linguistics in Ruby
* [Rseg](https://github.com/yzhang/rseg/blob/master/README) is a Chinese Word Segmentation(中文分词) routine in pure Ruby

## Deep Dive

Ruby를 더 깊이 사용하기 위해 도움이 되는 자료 목록을 정리해 둔다.

[AWESOME RUBY](http://awesome-ruby.com/)
