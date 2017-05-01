---
layout: post
title:  "HDD Clone and Migrate"
categories: 생활자동화
---

가끔 하드드라이브(HDD)를 새로 교체하거나 SSD로 바꿀 필요가 있다. 이때 단순 복사를 하면 정상적으로 작동하지 않을 수 있다. 특히 OS의 경우 작동하지 않는다. 

그래서 Clone을 통해 migration하게 되는데, 이 때 이를 수행하는 소프트웨어가 필요하다. 

자료를 찾아보니 다음과 같은 소프트웨어들을 찾을 수 있었다. 

* [Clonezilla](http://clonezilla.org/)
* [Macrium Reflect Free Edition](https://www.macrium.com/reflectfree)
* [EaseUS partition master](http://www.partition-tool.com/copy-wizard/migrate-os-to-ssd.htm)
* [Minitool partition wizard](https://www.partitionwizard.com/help/migrate-os-to-ssd-hd.html)

관련 소프트웨어를 정리해 설명한 글들도 찾을 수 있었다. 

* [Five free and reliable cloning tools](http://www.techrepublic.com/blog/five-apps/five-free-and-reliable-cloning-tools/)
* [Best Free Drive Cloning Software](http://www.techsupportalert.com/best-free-drive-cloning-software.htm)

나는 이 가운데 `Macrium Reflect Free Edition`을 써 보았다. 사용하기도 쉽고 직관적이었다. 다만 OS가 실려있는 HDD를 clone 하려면 주의해야할 점이 있는데, 설정에서 `Partition Type`을 `Active`로 하고 clone을 히야 clone 된 새 HDD나 SSD를 교체했을 때 시스템이 부팅된다.

더 자세한 것은 [꼬맹이 님의 글](http://cottonface.blog.me/220033915111)을 참고했다. 


