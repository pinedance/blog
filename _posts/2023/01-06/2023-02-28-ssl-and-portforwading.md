---
layout: post
title:  "HTTPS를 위한 몸부림 (feat SSL, Apache, port-forwading)"
categories: 코딩삽질기
tags: ['HTTPS', 'ssl', 'Apache']
---

## 배경

나는 취미로 코딩을 하고 있다. 개발 환경에 시간을 빼앗기는 일이 많기 때문에 언제라도 붙어서 작업할 수 있도록 개발 용도로 작은 서버를 운용하고 있다. 이 서버에는 몇 가지 웹서비스들이 함께 동작하고 있다. 하나의 주소에 포트를 나누어 옹기종기 모여있다. 

하지만 문제가 생겼다. HTTPS 프로토콜이 권장되면서 이 웹서비스 역시 HTTPS를 이용해 접근해야 할 필요성이 생겼다. 이를 위해 아래와 같은 문제를 해결해야 했다. 

1. HTTPS를 이용하기 위해서는 SSL certificate(인증서)가 필요하다. SSL 인증서는 유료다. 
2. SSL 인증서를 웹서버에 설치해 주어야 한다. 설정 방법도 모른다. 
3. 하나의 물리 서버에 여러가지 웹서비스들이 동작하고 있는데, 이 웹서비스들에 SSL 인증서를 모두 적용해 주어야 한다. 

취미로 코딩을 하고 있는 나는 네트워크 그리고 시스템 관련 문제가 달갑지 않다. 사실상 다른 분야로 어렵기 때문이다. 다행히 SSL 인증서를 무료로 지원해주고 서버 설정도 쉽게 해결해주는 서비스를 알게 되어 1-2번 문제들은 해결할 수 있을 것 같았다. 문제는 3번인데... 아무튼 많은 삽질 끝에 해결할 수 있었다. 그 과정을 기록해 둔다. 

## 방법

### SSL 인증서를 서버에 설치하기까지 

요약
* 웹주소(Domain 네임)를 확보하고 있어야 한다. 
* 자신의 물리 서버에 Apache2 서버를 설치하자. 
* 자신의 물리 서버에 SSL 인증서를 설치하고 Apache2 설정을 그에 맞게 업데이트 하자. 

[Route 53](https://aws.amazon.com/ko/route53/) 같은 유료 서비스가 일반적이지만, 무료로 얻을 수 있는 방법도 있다. 조금 주제에서 벗어나므로 [다른 글](https://www.websiteplanet.com/ko/blog/%EB%AC%B4%EB%A3%8C-%EB%8F%84%EB%A9%94%EC%9D%B8-%EB%84%A4%EC%9E%84-%EC%9D%B4%EC%9A%A9-%EB%B0%A9%EB%B2%95/)을 참고하자. 

도메인 주소가 확보되었다면 SSL 인증서를 얻을 차례다. 무료로 SSL 인증서를 제공하는 밴더는 몇 가지 있는 듯했다. 나는 [let's encrypt](https://letsencrypt.org/)를 선택하였다. 그 중에서 설치와 관리가 쉬워 보였기 때문이다. 

SSL 인증서 설치 방법에 대해 인터넷을 찾아보면 여러가지 글이 있지만, 조금씩 차이가 있다. let's encrypt에서는 `Certbot`이라는 CLI 도구를 제공하고 있는데, 버전이 올라가면서 사용법이 조금씩 달라졌기 때문이다. 이럴 때는 과거 글들에 의존하지 말고 공식 문서를 참고하는 편이 좋다. 하다가 꼬이면 풀기도 어렵다!

[공식페이지](https://letsencrypt.org/)에서 "Getting Started"을 선택한 다음, "With Shell Access"에 있는 ["Visit the Certbot site"](https://certbot.eff.org/)를 클릭하면 자신의 서버에 certbot을 이용하여 ssl을 설치하는 방법이 설명되어 있다. 예를 들어 ubuntu18.04에 apache에 설치하기 위해서는 [여기](https://certbot.eff.org/instructions?ws=apache&os=ubuntubionic)를 참고하면 된다. 

[let's encrypt](https://letsencrypt.org/)의 Certbot이 주기적으로 SSL 인증서를 갱신해주기 때문에 이대로 설정은 끝이다. Letsencrypt, Thank You!

### SSL 인증서를 서버에 설치하기까지 

이렇게 하면 외부에서 물리 서버 내부의 Apache 웹서버까지 HTTPS(port 443)를 통해 접속할 수 있다. 이제 문제는 하나의 물리 서버에서 동작하고 있는 여러 가지 웹서비스까지 연결해 주는 일이다. Apache는 대표적인 웹서버이지만 라우터의 역할도 훌륭히 수행할 수 있다. 따라서 외부에서 들어온 요청을 Apache에서 내부 웹서비스에 연결해주면 이 문제도 해결 가능하다. 아래와 같은 모습이라고 할 수 있다. 

```
외부 Client (웹 브라우저)
        ↕ HTTPS
내부 Apache (웹서버/라우터)
        ↕ HTTP
내부 웹서비스1, 웹서비스2, 웹서비스3    
```

Apache의 VirtualHost 기능을 이용하여 구현한다. Apache VirtualHost에 대해서는 [공식문서](https://httpd.apache.org/docs/2.4/ko/vhosts/examples.html)를 참고하자. 또한 Apache 설정에 대해서는 [참고글](https://sacstory.tistory.com/entry/Apache2-%EC%84%A4%EC%A0%95-%EA%B4%80%EB%A0%A8)을 살펴보자. 

아무튼 물리 서버의 `/etc/apache2/sites-available` 경로로 이동해 보면 [let's encrypt](https://letsencrypt.org/)의 Certbot이 만들어 놓은 `000-default-le-ssl.conf` 파일이 눈에 보일 것이다. 이 파일을 아래와 같이 복사하자. 

```bash
cp /etc/apache2/sites-available/000-default-le-ssl.conf /etc/apache2/sites-available/my-redirect-ssl.conf
```

예시의 상황은 아래와 같다. 
* 나의 도메인 웹주소는 `great.awesome-domain.com`이다. 
* `웹서비스A`가 내부 포트 `8585`에서 동작하고 있다. 이를 외부의 HTTPS 445 포트로 연결시켜 주자. 
* `웹서비스B`가 내부 포트 `8787`에서 동작하고 있다. 이를 외부의 HTTPS 447 포트로 연결시켜 주자. 

주의할 점은 아래와 같다. 
* 예시에서 `great.awesome-domain.com`과 port 번호 등은 자신의 상황에 맞게 수정해 주어야 한다. 
* HTTPS port는 8000대를 그대로 사용할 수 없었다. 이유는 알 수 없었지만 443 근처의 숫자로 설정해 주자. 

이제 `my-redirect-ssl.conf` 파일을 아래와 같이 수정하여 여러 웹서비스를 연결해 주자. 아래 예시에 약간의 설명을 주석으로 써 놓았다. 

```bash
<IfModule mod_ssl.c>

        # Apache에서 열어 놓을 외부 포트
        Listen 445
        Listen 447

#######################################################
# WebService A : local port 8585 ←→ https port 445
#######################################################
<VirtualHost *:445>
        # port forwarding 설정 
        ProxyPreserveHost On
        ProxyRequests Off

        ProxyPass / http://localhost:8585/
        ProxyPassReverse / http://localhost:8585/

        # log file 설정
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        # SSL 설정
        ServerName great.awesome-domain.com
        SSLCertificateFile /etc/letsencrypt/live/great.awesome-domain.com/fullchain.pem
        SSLCertificateKeyFile /etc/letsencrypt/live/great.awesome-domain.com/privkey.pem
        Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>

#######################################################
# WebService B : local port 8787 ←→ https port 447
#######################################################
<VirtualHost *:447>
        # port forwarding 설정 
        ProxyPreserveHost On
        ProxyRequests Off

        ProxyPass / http://localhost:8787/
        ProxyPassReverse / http://localhost:8787/

        # log file 설정
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        # SSL 설정
        ServerName great.awesome-domain.com
        SSLCertificateFile /etc/letsencrypt/live/great.awesome-domain.com/fullchain.pem
        SSLCertificateKeyFile /etc/letsencrypt/live/great.awesome-domain.com/privkey.pem
        Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>
</IfModule>
```

이제 가장 중요한 설정은 끝났다. 이제 이 설정 파일에 있는 `VirtualHost`들을 Apache에서 동작하게 해주어야 한다. 방법은 아래와 같다. 

```bash
sudo a2ensite my-redirect-ssl.conf
sudo systemctl reload apache2 # or # service apache2 reload
```

참고로 Apache를 컨트롤 하기 위해 사용되는 명령어 몇 가지를 적어본다. 

```bash
# 설정 파일에 문제가 없는지 확인
sudo apache2ctl configtest
# Apache 현재 상태 확인
sudo systemctl status apache2
# Apache 시작
sudo systemctl start apache2
# Apache 중지
sudo systemctl stop apache2
# Apache 재시작
sudo systemctl restart apache2
```

시스템에 따라 아래와 같이 해야할 수도 있다. 더 자세한 내용은 [여기](https://www.cyberciti.biz/faq/star-stop-restart-apache2-webserver/)를 참고하자.

```bash
sudo service apache2 status
sudo service apache2 start
sudo service apache2 stop
sudo service apache2 restart
```

## REF

Apache 기초
* [DigitalOcean/Apache Basics: Installation and Configuration Troubleshooting](https://www.digitalocean.com/community/tutorials/apache-basics-installation-and-configuration-troubleshooting)

Apache Redirect
* [Apache redirect to another port](https://stackoverflow.com/a/13089668)
* [How do I redirect subdomains to a different port on the same server?](https://serverfault.com/a/195831)
* [Redirect multiple https ports to multiple external ip & ports](https://serverfault.com/a/909715)