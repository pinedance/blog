---
layout: post
title:  "file을 빠르게 다운로드 해보자"
categories: 생활자동화
---

온라인 file을 빠르게 다운로드 받아 보자. 물론 [orbit downloader](https://orbit.kr.uptodown.com/windows)와 같이 많이 우수한 GUI 프로그램이 존재한다. 하지만 작업을 자동화 한다거나 여러가지 작업을 묶어 하기 위해서는 CLI 기반의 프로그램들이 유용하다.

windows에서 [WSL](https://docs.microsoft.com/ko-kr/windows/wsl/about)을 통해 bash를 사용할 수 있으니, 이용해 보자

## curl, wget

보통 온라인 파일을 다운로드 받을 때 주로 `curl`이나 `wget` 등을 사용한다. 개발 역사도 오래 되었고 상당히 많이 사용되는 프로그램들이다.

```bash
curl -O http://www.file.path.com/target_file
```

```bash
wget http://www.file.path.com/target_file
```

## axel

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

## aria2

command line으로 다양한 형식의 자료들을 다운로드 받을 수 있다. `aria2`를 사용하면 된다.

axel처럼 멀티커넥션을 지원한다. 또 torrent나 metalink를 통해서도 다운로드 가능하다. 마지막으로 여러 url을 파일로 만들어 연속해서 다운로드 받을 수 있다.

```bash
# 설치
sudo apt-get install aria2
```

```bash
# Download from URL
aria2c http://releases.ubuntu.com/disco/ubuntu-19.04-desktop-amd64.iso
# Download using Two connections
aria2c -x2 http://releases.ubuntu.com/disco/ubuntu-19.04-desktop-amd64.iso
# Download from Metalink
aria2c http://example.org/mylinux.metalink
# Download from BitTorrent
aria2c http://releases.ubuntu.com/disco/ubuntu-19.04-desktop-amd64.iso.torrent
# Download URLs found in a text file
aria2c -i downloadurls.txt
```


## REF

* [github/axel](https://github.com/axel-download-accelerator/axel)
* [linux/man/axel](https://linux.die.net/man/1/axel)
* [Aria2 – A Multi-Protocol Command-Line Download Tool for Linux](https://www.tecmint.com/aria2-multi-protocol-commandline-download-tool-for-linux/)
