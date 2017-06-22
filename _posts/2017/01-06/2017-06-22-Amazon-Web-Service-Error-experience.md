---
layout: post
title:  "Amazon Web Service Error 체험기"
categories: 코딩삽질기
---


###★ 2017.04.27

`eb deploy` 실행 중 다음과 같은 에러 메시지를 만났다. 

```
ERROR: Operation Denied. Signature not yet current: 20170424T013926Z is still later than 20170424T013832Z (20170424T013332Z + 5 min.)
```

찾아보니 AWS 시간과 local machine 시간이 맞지 않아서 생기는 [문제](https://serverfault.com/questions/724114/attempting-to-initialize-aws-eb-getting-signature-not-yet-current-error)라고 한다. 과연 `date`로  local machine의 시간을 확인해 보니 7분 이상 빨리 가고 있었다. 

[일부 답변들](http://stackoverflow.com/questions/18703486/aws-sdk-error-signature-not-yet-current)에서는 [NTP 시간동기화](https://help.ubuntu.com/lts/serverguide/NTP.html) 같은 방법을 설명했으나, 복잡하기도 했고 그것까지야 하는 생각이 들었다. 

우분투 시간 변경 방법에 [타임서버를 이용하여 일회성으로 동기화 시켜주는 방법](http://frody.tistory.com/106)이 있어 다음과 같이 실행했다. 


```
#    rdate -s 타임서버
rdate -s time.nist.gov 
```

다시 `date`로  local machine 시간을 확인해 보니 맞게 수정되어 있었다. 

그런 뒤 `eb deploy` 실행했더니 OK!



###★ 2017.06.22

elasticbeanstalk environment를 생성하던 중에 다음과 같은 에러 메시지를 만났다. 

```
Creating EIP failed Reason: The maximum number of addresses has been reached.
```

`EIP`가 뭔지도 몰랐다. Elastic IP였다. [Elastic IP는 인터넷에서 연결 가능한 퍼블릭 IPv4 주소](http://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#elastic-ip-addresses-eip)이다.  하지만 [region별로 5개씩 밖에 지원](http://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-limit)되지 않는다. 물론 [요청](https://aws.amazon.com/contact-us/eip_limit_request/)을 하면 더 늘릴 수 있다. 

이런 사실을 알기 까지 꽤나 많은 검색을 거쳐야 했다. 

위에 에러 메시지는 이미 너에게 5개의 EIP가 모두 발급되어 생겨난 에러이다. 기본적으로 EC2가 생성될 때 EIP가 함께 생성되기 때문에 생성 과정에서 에러가 발생한 것이다. 

분명하지는 않지만 EC2를 terminate 시켜도 EIP까지 사라지지는 않는 듯하다. 콘솔에서 보니 놀고 있는 EIP가 3개나 있었다. [instance와 결합되지 않은 EIP에는 과금이 된다고 한다.](http://pyrasis.com/book/TheArtOfAmazonWebServices/Chapter06) 

콘솔에서 쓰지 않고 있는 EIP를 release하고 다시 EC2를 생성해서 이 문제를 처리할 수 있었다. 



