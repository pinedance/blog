---
layout: post
title:  "Server를 DNS에 연결해 보자"
categories: 코딩삽질기
---


[AWS route53](https://aws.amazon.com/ko/route53/), [후이즈](whois.co.kr) 등과 같은 도메인 등록 서비스에서 우선 Domain 주소를 구입한다.

그런 뒤에는 어떻게 하지? 나의 서버를 DNS에 어떻게 연결할까?

방법은 대표적으로 2가지이다.


연결방법
----------

### 1. 고정IP인 경우

A record

> my.goodsite.io → 192.163.12.345


### 2. 유동IP이거나 Vendor가 제공하는 주소가 있는 경우


CNAME record

> blog.goodsite.io → blog.ap-northeast-1.elasticbeanstalk.com


둘의 차이에 대해서는 [이 글](https://www.xetown.com/qna/111581)을 참고하시라.


내게 맞는 방식 선택
---------------------

*Amazon web service의 경우* DNS를 연결하기 위해 위의 2가지 방법을 모두 사용할 수 있다.

1번을 사용하기 위해서는 AWS의 고정IP에 해당하는 Elastic IP(EIP)를 할당받아야 한다. ( region 당 5개 밖에 할당되지 않으니 아껴 쓰자)

주의할 점이 있다. EIP가 발급되기 전에도 EC2에 `public IP`가 할당되어 있는데, 이 IP는 instance가 재가동 될 때 변경될 수 있다. 그대로 A record로 설정하면 어느 순간 연결이 되지 않을 수 있다는 뜻이다.

EIP의 설명과 사용법은 [여기](http://pyrasis.com/book/TheArtOfAmazonWebServices/Chapter06)를 참고하시라.

발급된 EIP를 EC2와 연결시킨 뒤, EIP를 DNS 주소와 연결하면 된다.

2번을 사용하기 위해서는 별다른 준비가 필요 없다. AWS에서 EC2마다 발급되는 `public DNS`를 DNS vendor CNAME record에 등록해 주기만 하면 된다.

[일반적으로 Vendor에서 운영하는 클라우드 서비스를 이용한다면 후자의 방법이 더 쉽고 편하다. ](http://b.redinfo.co.kr/60)

*Github page*의 경우, DNS provider에 CNAME record로 github-page 주소를 등록한 뒤에, github page setting에서 domain 주소를 등록해 준다. github에서 관련 내용을 설명한 [문서](https://help.github.com/articles/adding-or-removing-a-custom-domain-for-your-github-pages-site/)를 참고하자.
