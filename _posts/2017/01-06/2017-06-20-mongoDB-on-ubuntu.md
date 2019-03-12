---
layout: post
title:  "Ubuntu 16.04에 MongoDB 3.4를 설치하고 외부에서 접근해 보자"
categories: 코딩삽질기
---


ubuntu library 업데이트를 하다가 mongoDB가 멈췄다. 아.... [ubuntu를 이용하면서 가장 난처한 경우이다](http://pinedance.github.io/blog/2017/06/19/web-and-my-own-server).

이참에 mongoDB만 돌아가는 서버를 만들고, 이 서버에 원격으로 접근하는 방식을 취해야겠다고 생각했다.

그런데, [mongoDB 공식문서에서 설명한 방식](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)으로 설치했더니 `service mongod start`가 작동하지 않는다.

검색 끝에 다음 두 글을 참고하여 완수할 수 있었다. 그 내용을 요약해 본다.

[How to Install MongoDB on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)

[How to connect to your remote MongoDB server](https://ianlondon.github.io/blog/mongodb-auth/)

***

# Repository 추가 및 MongoDB 설치

자주 나오는 내용이니 코드만 보고 가자.

```
# add key
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
# add library repo to repo list
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
# update repos
sudo apt-get update
# install mongodb
sudo apt-get install -y mongodb-org
```

여기까지는 공식문서에서 설명한 것과 같다.

# Service 등록

이 부분이 좀 다르다. 이전 버전에서는 설치만으로 끝이었다. DB 관리는 다음과 같이 처리할 수 있었다.

```
sudo service mongod start  # 기동
sudo service mongod restart  # 재기동
sudo service mongod stop  # 정지
sudo service mongod status   # 상태보기
```

그런데, ubuntu 16.04에서는 [`unit file` 형식](http://manpages.ubuntu.com/manpages/zesty/man5/systemd.unit.5.html)으로 service로 등록해 주어야 했다. 정확히 차이는 잘 모르겠다.

방법은 아래와 같다.

`/etc/systemd/system/mongod.service` 파일을 만들어 아래와 같이 입력해 준다.


```
sudo nano /etc/systemd/system/mongod.service
```

```
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target

[Service]
User=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target
```

mongoDB가 `/usr/bin/mongod`에 설치되어 있지 않다면 환경에 맞게 바꿔 주어야 한다.


이제 mongoDB를 기동해 보자.

```
sudo systemctl start mongod
```

아무것도 출력되지 않는 것이 정상이다. 정상작동 하고 있는지 확인해 보자.

```
sudo systemctl status mongod
```

마지막으로 시스템 실행 시 같이 실행되도록 다음과 같이 명령한다.

```
sudo systemctl enable mongod
```

최초에 `sudo service mongod start`가 성공했다면 다음과 같이 한다.

```
sudo systemctl enable mongod.service
```


# 원격으로 접속하기

mongDB는 원칙적으로 같은 localhost에서 접근하도록 되어 있다. 하지만 외부에서 접근할 수 있도록 설정할 수도 있다.

## network 및 firewall 설정

이를 위해서 먼저 firewall이 있는 경우 mongoDB가 사용하는 27017 port를 열어주어야 한다. ubuntu 내부 설정도 있고 cloud vendor에서 제공하는 네트워크 설정도 있으니 유의해야 한다.

참고로 AWS의 경우 instance의 Security Groups의 Inbound에 27017 TCP port를 anywhere로 추가해 준다.

## mongoDB user 만들기

네트워크가 열리고 mongoDB 설정이 허락하면 이론적으로 누구나 mongoDB에 접근할 수 있다. 따라서 권한이 있는 user만 사용할 수 있도록 user를 만들어 둔다.

특정 db 별로 user를 생성하고 싶다면 mongo shell 환경에서 다음과 같이 생성한다.


```
# dbName이라는 db에 접근할 user 생성
use dbName

db.createUser({
    user: 'userName',
    pwd: 'userPassword',
    roles: [{ role: 'readWrite', db:'dbName'}]
})
```

모든 db에 admin 권한으로 접근할 user를 만들고자 한다면 mongo shell 환경에서 다음과 같이 생성한다.

```
use admin

db.createUser({
    user: 'userName',
    pwd: 'userPassword',
    roles: [ "userAdminAnyDatabase",  "dbAdminAnyDatabase",  "readWriteAnyDatabase"]
})
```


## mongoDB 환경 변경

이제 다음과 같이 mongoDB 설정파일(`/etc/mongod.conf`)을 바꾸어 localhost 이외에서도 접근할 수 있도록 하자.

```
sudo vim /etc/mongod.conf
```

```
# network interfaces
net:
  port: 27017
  bindIp: ::,0.0.0.0
```

조금 아래 `security` 부분에는 다음과 같이 입력해 둔다.

```
security:
  authorization: 'enabled'
```

환경변경 후에는 mongoDB를 다시 실행시켜야 한다.


```
sudo systemctl restart mongodb
```

## test

이제 원격으로 접근해 보자. 참고로 현재 machine에도 mongo shell이 설치되어 있어야 한다.


```
mongo -u userName -p userPassword 192.168.12.345/dbName
```

admin 계정을 만들었다면 다음과 같이도 접근 가능하다.

```
mongo -u userName -p userPassword 192.168.12.345/admin
```
