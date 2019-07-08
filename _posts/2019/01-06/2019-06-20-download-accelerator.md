---
layout: post
title:  "file을 빠르게 다운로드 해보자"
categories: 생활자동화
---

온라인 file을 빠르게 다운로드 받아 보자.

온라인 파일을 다운로드 받을 때 주로 `curl`이나 `wget` 등을 사용한다.

```bash
curl -O http://www.file.path.com/target_file
```

```bash
wget http://www.file.path.com/target_file
```

그러나 file의 용량이 큰 경우에 속도가 느려 오래 기다려야 할 수 있다. 이럴 때 사용할 수 있는 것이 `axel` 이다. 아래와 같이 설치한 뒤에 사용하며 된다.

```bash
apt-get install axel
```

```bash
axel -a http://www.file.path.com/target_file
```

자주 사용되는 옵션은 다음과 같다.

* `-a`: Show an alternate progress indicator
* `-s`: Limit speed
* `-n`: Limit a number of connection

```bash
axel -a -n 3 -s 5242880 http://www.file.path.com/target_file
```

windows 용도 있다. [여기](https://github.com/Rergis/axel-for-windows)

## REF

* [github/axel](https://github.com/axel-download-accelerator/axel)
* [linux/man/axel](https://linux.die.net/man/1/axel)
