---
layout: post
title:  "ubuntu에 usb flash drive 연결하기"
categories: 생활자동화
---

ubuntu에 usb flash drive 연결하기

다음 명령어들을 이용해 보자.

```
# USB drive가 연결 되었는지 확인하고, 장치명과 저장소 타입을 확인한다. 
sudo fdisk -l

# 장치명이 /dev/sdh, mount할 파티션이 /dev/sdh1이라고 하였을 때 다음과 같이 하여 mount시킨다. (ntfs의 경우)
sudo mount -t ntfs /dev/sdh1 /media/usb

# 장치가 잘 마운트 되었는지 확인한다. 
df -h

# 장치를 제거할 때는 다음과 같이 한다. 
sudo umount /dev/sdh1

# partition 문제가 있다면, 다음 GUI tool을 이용하여 정리한 다음 위의 과정을 다시 수행한다. 
sudo gparted
```

REF

* [Ubuntu에 대용량 USB 외장하드디스크 연결하여 사용하기](http://blog.saltfactory.net/mount-external-harddisk-on-ubuntu/)

