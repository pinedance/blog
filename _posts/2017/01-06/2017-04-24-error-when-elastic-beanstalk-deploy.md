---
layout: post
title:  "[Error] AWS elastic beanstalk에서 deploy할 때 발생한 error 처리"
categories: 코딩삽질기
---


현상
-----

`eb deploy` 실행 중 다음과 같은 에러 메시지를 만났다. 

```
ERROR: Operation Denied. Signature not yet current: 20170424T013926Z is still later than 20170424T013832Z (20170424T013332Z + 5 min.)
```


원인
------

찾아보니 AWS 시간과 local machine 시간이 맞지 않아서 생기는 [문제](https://serverfault.com/questions/724114/attempting-to-initialize-aws-eb-getting-signature-not-yet-current-error)라고 한다. 과연 `date`로  local machine의 시간을 확인해 보니 7분 이상 빨리 가고 있었다. 


해결
------

[일부 답변들](http://stackoverflow.com/questions/18703486/aws-sdk-error-signature-not-yet-current)에서는 [NTP 시간동기화](https://help.ubuntu.com/lts/serverguide/NTP.html) 같은 방법을 설명했으나, 복잡하기도 했고 그것까지야 하는 생각이 들었다. 

우분투 시간 변경 방법에 [타임서버를 이용하여 일회성으로 동기화 시켜주는 방법](http://frody.tistory.com/106)이 있어 다음과 같이 실행했다. 


```
#    rdate -s 타임서버
rdate -s time.nist.gov 
```

다시 `date`로  local machine 시간을 확인해 보니 맞게 수정되어 있었다. 

그런 뒤 `eb deploy` 실행했더니 OK!