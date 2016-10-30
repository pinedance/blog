---
layout: post
title:  "Heroku에서 local time 변경하기"
categories: 코딩삽질기
---


heroku에 deploy할 경우, heroku local time이 한국으로 되어 있지 않기 때문에 한국 사람을 대상으로 서비스 할 때 시간의 문제가 발생할 수 있다. 해당 server의 local time은 아래와 같이 heroku cli를 이용해 바꿀 수 있다.

```
heroku config:add TZ="Asia/Seoul" --app [APPNAME]
```