---
layout: post
title:  "[Cookbook] Ubuntu, 이럴 때 이렇게 한다."
categories: [코딩삽질기, Cookbook]
---

## 디스크 및 파티션

### 디스크 및 파티션 현황을 알아보자.

File System이 어떤 종류인지 확인

```bash
sudo file -s /dev/xvd*
```

Partition 구성을 확인

```bash
lsblk
```

Volume 구성을 확인

```bash
df -h
```

REF
* [Extending a Linux File System After Resizing a Volume](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html)
