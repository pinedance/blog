---
layout: post
title:  "Node, windows에서 global package에 접근하기"
categories: 코딩삽질기
---

`npm install -g underscore`을 하고  `var _ = require("underscore");`를 했는데 `Error: Cannot find module 'underscore'`오류가 생겼다.

node에서 global package의 path를 인식하지 못했기 때문이다. 

windows system variable에 global package의 path를 추가 시켜 줘야 비로서 node가 찾을 수 있다. 

`Computer (우클릭) > System Properties > Advanced`로 접근한 뒤에 variable을 다음과 같이 추가해 준다. 

```
# Windows XP
NODE_PATH : %USERPROFILE%\Application Data\npm\node_modules 

# Windows 7
NODE_PATH : %AppData%\npm\node_modules
```

아니면 command에서 다음과 같이 입력한다. 

```
set NODE_PATH=%AppData%\npm\node_modules
```

