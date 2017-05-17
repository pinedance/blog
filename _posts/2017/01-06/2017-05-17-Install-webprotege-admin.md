2017-05-17-Install-webprotege-admin.md

---
layout: post
title:  "WebProtege를 설치해 보자"
categories: 코딩삽질기
---



protege의 web 버전인 [WebProtege](https://webprotege.stanford.edu/)를 설치해 보자!


Install Tomcat7 
----------

```
sudo apt-get install tomcat7
```

설정 변경은 여기서

```
# /var/lib/tomcat7/conf/server.xml
# ... connector port=8989
service tomcat7 restart
```

실행되는지 test해 보자 

```
http://localhost:8989
# CATALINA_HOME in /usr/share/tomcat7 and CATALINA_BASE in /var/lib/tomcat7
# => webapp folder : /var/lib/tomcat7/webapps
```

ref : [How to Deploy a WAR File to Tomcat](http://www.baeldung.com/tomcat-deploy-war)

앱을 올려 test해 보자 

[Sample app](https://tomcat.apache.org/tomcat-6.0-doc/appdev/sample/) `war` file을 webapp folder에 넣고 브라우저에서 결과가 나오면 정상 적동 중이다. 

```
http://localhost:8989/sample
```



Install webprotege admin
-------------------------

ref : [WebProtégé ](https://protegewiki.stanford.edu/wiki/WebProtege), [WebProtégé Administrator's Guide](https://protegewiki.stanford.edu/wiki/WebProtegeAdminGuide)

data 저정 폴더 생성

```
mkdir /data/webprotege
chown tomcat7 /data/webprotege
```

설정 변경

```
webprotege.data.directory=/data/webprotege
webprotege.application.host=<hostname>:8989
```


test해 보자

```
http://localhost:8989/webprotege
```


아직 동작 시키지 못했다.... 오늘은 여기까지. 
