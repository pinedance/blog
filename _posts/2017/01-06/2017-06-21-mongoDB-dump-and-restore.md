---
layout: post
title:  "local mongoDB를 remote mongoDB server로 옮기다"
categories: 코딩삽질기
---

test용 cloud에서 돌고 있던 mongoDB에 app을 물려 쓰고 있었다. 이번에 ubuntu를 업그레이드 하고 나서 mongoDB가 멈추는 바람에 app이 실행되지 못했다. 

mongoDB를 다시 설치하고 문제가 해결 되었지만, 앞으로 이런 문제를 해결하기 위해 기존 cloud는 테스트용으로만 쓰고 서비스용 데이터는 별도의 mongoDB 전용 서버에 옮기기로 했다. 


remote server 준비
-------------------------

remote server (이사갈 mongoDB server)에 접근 가능하도록 세팅을 끝낸다. [이렇게](http://pinedance.github.io/blog/2017/06/20/mongoDB-on-ubuntu) 했다.

```
# local bash
mongo -u userName -p userPassword 192.168.12.345/dbName
```

위와 같이 remote mongoDB server shell (이사갈 server)에 접근한다. 

옮길 DB 이름을 `people`라고 한다면, 이 DB에 접근 가능한 user를 만든다. 

```
# local bash에서 진입한 remote mongo shell
# dbName : people, userName: jone, password: goodjob

use people

db.createUser({
    user: 'jone',
    pwd: 'goodjob',
    roles: [{ role: 'readWrite', db:'people'}]
})
```

Dump Local DB
---------------------

dump를 한다. 방법은 간단하다. 

ref : [MongoDB 백업하고 복구하기](https://blog.outsider.ne.kr/790)

```
# local bash
mongodump --host localhost --db people
```

해당 폴더에 `dump` 디렉토리가 생긴 것을 확인할 수 있다. 


Restore bson to remote server
------------------------------------

여기서 부터가 고생이었다. 처음에는 admin user로 아래와 같이 접근해 보았다. 

```
# local bash
mongorestore --host 192.168.12.345 --username myadmin --password goodday dump/  --drop
```

(`restore`의 자세한 옵션은 [공식문서](https://docs.mongodb.com/manual/reference/program/mongorestore/)를 참고하라. )

restore가 정상 작동하였으나, `Failed: people.women: error restoring from dump/people/women.bson: insertion error: EOF`이라는 에러메시지와 함께 중단되었다. 대략 찾아보니 메모리 부족 문제 때문이라고 한다. remote server를 열어보니 mongod service가 중단되어 있었다. 

다시 restart 시켰다. 

```
# remote server bash
sudo systemctl restart mongodb
```

DB를 한 번에 restore 하지 못할 상황이어서 collection 별로 따로따로 restore해 보기로 했다. 

다양한 삽질 끝에 다음과 같이 하여 모두 옮길 수 있었다. 

```
# local bash
mongorestore --host 192.168.12.345 --username jone --password 'goodjob' dump/people/men.bson --db people --collection men --drop
mongorestore --host 192.168.12.345 --username jone --password 'goodjob' dump/people/women.bson --db people --collection women --drop
```


