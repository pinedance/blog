---
layout: post
title:  "SSL, 해결할 수 없다면 피하라."
categories: 코딩삽질기
---

> SSL로 피곤해 졌다. 

랜섬웨어 등 악질적인 문제가 생겨나면서 사내 SSL을 두는 회사가 늘고 있다. 문제는 보안을 위해 인증 기능을 사용하고 있던 기존 벤더들의 software와 충돌을 일으킬 수 있다는 점이다. 

이론적으로 OS에 SSL을 등록해 두면 해결되야 하지만, 그렇지 않은 경우도 있다. 

먼저 SSL 문제가 있다면 (특히 Ubuntu와 같은 Linux) 다음 글을 참고하여 조치할 수 있다. 

* [Adding trusted root certificates to the server](http://kb.kerio.com/product/kerio-connect/server-configuration/ssl-certificates/adding-trusted-root-certificates-to-the-server-1605.html)
* [How do you add a certificate authority (CA) to Ubuntu?](https://superuser.com/questions/437330/how-do-you-add-a-certificate-authority-ca-to-ubuntu)
* [How do I install a root certificate?](http://askubuntu.com/questions/73287/how-do-i-install-a-root-certificate)


그러나 만약 내용도 깊이 모르고 네트워크 관리자 권한도 없다면 약간의 위험을 감수하고 해당 software의 인증기능을 비활성화 시키는 것이 정신건강에 좋다. 

나는 주로 git과 pip에서 이런 문제를 만났다. 

해당 app들에서 인증기능을 비활성화 시키는 방법을 기록해 둔다. 


git 

```
git config --global http.sslVerify false
```


python package 

```
pip install --trusted-host pypi.python.org selenium
```


node package

```
npm config set strict-ssl false
```

Curl : with `-k` flag

```
curl -o- <url> -k
```