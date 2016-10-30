---
layout: post
title:  "Heroku server 재우지 않기"
categories: 코딩삽질기
---

heroku에서 무료 테스트 서버를 이용하고 있는데(*HEROKU 쌩유!*), heroku 정책 상 1시간 동안 request가 없으면 server가 sleep 모드로 들어가게 된다. 

이번에 alarm을 주는 서버를 시도해 보았는데, 이게 문제였다. alarm을 해야할 시점에 server가 sleep mode로 들어가 있으면 alarm을 줄 수 없기 때문이다. 

이를 해결하는 방법은 다음과 같이 server가 자기 자신에게 주기적으로 request를 던지는 것이다. 

```
var http = require("http");
setInterval(function() {
    http.get("http://<your app name>.herokuapp.com");
}, 300000); // every 5 minutes (300000)
```

ref: [6 Easy Ways to Prevent Your Heroku Node App From Sleeping](https://quickleft.com/blog/6-easy-ways-to-prevent-your-heroku-node-app-from-sleeping/)