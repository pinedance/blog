---
layout: post
title:  "회사 SSL 인증서를 ubuntu에 설치하자"
categories: 코딩삽질기
tags: ['bash', 'ssl']
---

## 배경

회사 보안을 위해 자체 SSL 인증서(SSL certificate)를 사용하는 경우가 있다. 이로 인해 외부 인터넷 연결이 실패할 수 있다. 나의 경우에도 회사 정책에 따라 회사에서 배포한 인증서 설치 프로그램을 윈도우 시스템에 설치하였다. 윈도우에서 인터넷에 접근할 때는 문제가 없다. 그러나 Ubuntu와 같은 OS에서는 무수한 오류가 생겨났다. 특히 Ubuntu에서 프로그램이나 package를 설치할 때 문제가 많았다.

흥미로운 사실은 윈도우 시스템 내의 [WSL(The Windows Subsystem for Linux)](https://learn.microsoft.com/en-us/windows/wsl/install)에서도 SSL 인증서 문제가 생겨난다는 점이다. 윈도우에 종속된 시스템이지만 네트워크 설정은 윈도우와 별도로 동작하는 모양이다.

Ubuntu와 같은 Linux OS에서는 프로그램이나 package를 설치할 때 이를 도와주는 bash 스크립트들을 이용하는 경우가 많다. 이 스크립트들은 내부적으로 인터넷에서 소스 파일을 내려받아 설치하게 된다. 이 과정에서 인터넷 접속에 실패하여 프로그램을 설치할 수 없는 경우가 있다. 대부분은 [인증서를 회피하는 방식]({{ site.baseurl }}/2017/11/02/how-to-bypass-SSL)으로 대응 가능하지만, 어떤 경우에는 전혀 해결할 수 없는 경우도 있다.

결국 회사에서 배포한 인증서 파일을 Ubuntu에 적용시켜주어야 근본적인 문제를 해결할 수 있다.  

그 방법을 아래 간략히 적어본다. 더 자세한 내용은 글 말미에 REF 부분을 보시라. 해당 글 지은이께 감사드린다!

## 방법

### 윈도우에 설치된 SSL 인증서를 파일로 내려받기

먼저 `windows key + R` 혹은 윈도우 CMD를 열고 `certmgr.msc` 명령어를 실행하여 인증서 관리 창을 연다.

인증서 관리 창이 열리면 `신뢰할 수 있는 루트인증 기관 / 인증서`로 들어가 회사에서 배포한 인증서를 선택한다.

인증서를 선택한 후 우클릭하여 `내보내기` 명령을 실행시킨다. 내보낼 형식은 가장 위의 `DER로 인코딩된 바이너리 x509(.CER)`를 선택한다. 해당 파일을 `awesome.cer`이라고 해보자.

### 내려받은 SSL 인증서 형식 변환하기

내려받은 인증서를 Ubuntu에 적용하기 앞서 형식을 바꾸어야 한다. 내려받은 인증서를 Ubuntu로 옮긴 뒤 해당 디렉토리에서 아래와 같이 실행한다. `openssl`이 필요하므로 설치되지 않았다면 이에 앞서 설치해준다.

```bash
# bash
openssl x509 -inform DEM -in awesome.cer -out awesome.crt
```

이렇게 하면 `awesome.crt` 파일이 새로 생성된 것을 볼 수 있다.

### SSL 인증서를 Ubuntu에 적용시키기

새롭게 생성한 `awesome.crt` 파일을 Ubuntu에 적용시킨다. 아래와 같이 파일 위치를 옮겨준 뒤 설치 마법사를 실행시킨다.

```bash
# bash
# 파일 이동
sudo mkdir /usr/share/ca-certificates/extra
sudo cp -rf awesome.crt /usr/share/ca-certificates/extra/
sudo chmod 644 /usr/share/ca-certificates/extra/*
```

```bash
# bash
# 설치 마법사 실행
sudo dpkg-reconfigure ca-certificates
```

설치 마법사에서 새로 추가된 인증서를 체크한 뒤 확인을 누르면 설치가 완료된다.

## 추가

windows와 WSL 사이에 SSL 인증서를 공유하는 방법도 있을 듯하지만, 신뢰할 수 있는 방법을 아직 찾지 못했다.

## REF

* [회사의 윈도우용 SSL 인증서를 ubuntu에 설치하기](https://nameng.tistory.com/139)
* [How to import all Root CAs from Windows store into WSL automatically?](https://github.com/microsoft/WSL/issues/3161#issuecomment-945384911)
