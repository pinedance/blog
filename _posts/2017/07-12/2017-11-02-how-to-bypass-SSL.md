---
layout: post
title:  "SSL, 해결할 수 없다면 피하라."
categories: 코딩삽질기
tags: [ssl, git, curl, python, ruby, node, conda]
---

> SSL로 피곤해 졌다.

랜섬웨어 등 악질적인 문제가 생겨나면서 사내 SSL을 두는 회사가 늘고 있다. 문제는 보안을 위해 인증 기능을 사용하고 있던 기존 벤더들의 software와 충돌을 일으킬 수 있다는 점이다.

이론적으로 OS에 SSL을 등록해 두면 해결되야 하지만, 그렇지 않은 경우도 있다.

먼저 SSL 문제가 있다면 (특히 Ubuntu와 같은 Linux) 다음 글을 참고하여 조치할 수 있다.

* [Adding trusted root certificates to the server](http://kb.kerio.com/product/kerio-connect/server-configuration/ssl-certificates/adding-trusted-root-certificates-to-the-server-1605.html)
* [How do you add a certificate authority (CA) to Ubuntu?](https://superuser.com/questions/437330/how-do-you-add-a-certificate-authority-ca-to-ubuntu)
* [How do I install a root certificate?](http://askubuntu.com/questions/73287/how-do-i-install-a-root-certificate)

그럼에도 불구하고 소프트웨어(어플리케이션, 라이브러리, 패키지 등등)를 설치할 때 `error certificate verify failed`과 같은 에러 메시지를 만난다면 SSL 문제가 해결되지 않은 것이다. 에러 메시지들은 대략 다음과 같다.

* node: `ERROR: cannot verify 192.168.0.0's certificate`
* python : `error:14090086:SSL routines:SSL3_GET_SERVER_CERTIFICATE:certificate verify failed`
* curl : `SSL Certificate: Invalid certificate chain`


내용도 깊이 모르고 네트워크 관리자 권한도 없다면 약간의 위험을 감수하고 해당 software의 인증기능을 비활성화 시키는 것이 정신건강에 좋다.

해당 app들에서 인증기능을 비활성화 시키는 방법을 기록해 둔다.


## Bash apps

### git

```bash
git config --global http.sslVerify false
```

### Curl

아래 option을 사용하면 insecure mode로 사용할 수 있다.

* `-k` or `--insecure` : https 사이트를 SSL certificate 검증없이 연결한다.

```bash
curl -k -O <url>
```

curl을 통해 모든 연결을 insecure mode로 실행시키려면 아래와 같이 curl에 대한 설정파일을 별도로 만들어 주면 된다.

```bash
# set curl as insecure mode
echo insecure >> ~/.curlrc
```

### wget

아래 option을 사용하면 insecure mode로 사용할 수 있다.

* `--no-check-certificate`: https 사이트를 SSL certificate 검증없이 연결한다.


## python

### python package

더 자세한 내용은 [여기](https://stackoverflow.com/a/29751768) 참고

```bash
pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org <package_name>
```

anaconda python `conda` command

```bash
# anaconda prompt
conda config --set ssl_verify false
```

## Node


### Node itself

Node는 권한 문제 때문에 [nvm](https://github.com/nvm-sh/nvm)을 이용하여 설치하는 것이 편리하다. 그런데 nvm은 curl으로 설치 스크립트를 받아와 실행시키기 때문에 ssl 내부 보안이 걸려 있는 경우 파일을 다운로드 받지 못하게 된다.

이런 경우에는 아래 curl에 대한 설명을 보고 `-k` option을 사용하거나 `.curlrc` 파일을 만들어준 뒤에 nvm을 사용하면 된다.


### Node package

```bash
npm config set strict-ssl false
```

```bash
export NVM_NODEJS_ORG_MIRROR=http://nodejs.org/dist
nvm install 10.15.3
```

atom package (`apm`)

```bash
apm config set strict-ssl false
```

## Ruby

### Ruby itself

Ruby는 권한 문제 때문에 [rvm](https://rvm.io/)을 이용하여 설치하는 것이 편리하다. 그런데 RVM은 내부적으로 curl로 파일을 받아오기 때문에 ssl 내부 보안이 걸려 있는 경우 파일을 다운로드 받지 못하게 된다.

이런 경우에는 아래 curl에 대한 설명을 보고 `.curlrc` 파일을 만들어준 뒤에 rvm을 사용하면 된다.

### Ruby Gem

package source를 https에서 http로 수정하면 된다. ☞ [ref](https://stackoverflow.com/a/20400761)

```bash
gem install rails --source http://rubygems.org
```

아예 설정 자체를 바꾸어 두면 편하다.

```bash
gem sources --add http://rubygems.org
gem sources --remove https://rubygems.org
gem sources --list
```

bundler의 경우에도 source를 아래와 같이 바꾸어 줄 수 있다.

```bash
bundle config source http://rubygems.org
# bundle config
```

또한 `Gemfile`의 첫머리를 다음과 같이 바꾸어 준다.

```
# Gemfile
source "http://rubygems.org"
```

## REF

* [Node Version Manager and failing certificate verification](https://juffalow.com/other/node-version-manager-and-failing-certificate-verification)
* [How to ignore invalid and self signed ssl connection errors with curl](https://www.cyberciti.biz/faq/how-to-curl-ignore-ssl-certificate-warnings-command-option/)
