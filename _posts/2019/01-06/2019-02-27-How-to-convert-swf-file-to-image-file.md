---
layout: post
title:  "swf 파일을 png 파일로 변환시켜 보자."
categories: 생활자동화
---

아주 드문 일이지만, adobe flash 파일인 swf 파일을 사용해야 할 때가 있다. HTML5가 사용되는 시점에서 swf를 사용해야 하는가에 대한 의문이 들지만, 아무튼 사용되고 있는 플랫폼이니 따를 수 밖에 없다.

작은 깨달음을 공유하자면,

> 대중적이지 않은 작업은 우선 linux에서 답을 찾아라!

보통 수요가 적은 작업 툴은 linux용으로 만들어지기 때문이다.

그래서 찾아보니 `swftools`라는 app이 있었다. 이를 설치하고, 폴더에서 `swf` 파일을 모두 찾아 `png`파일로 변환하는 작업을 해보자

아래 코드에는 swftools에 포함되어 있는 `swfrender`를 사용하였다. 구체적인 옵션은 [여기](https://helpmanual.io/help/swfrender/)에 설명되어 있다.

`-r`은 `resolution dpi`를 의미하는데, default 값이 75로 되어 있어 옵션 값을 주지 않으면 너무 흐린 이미지가 된다.  출력을 염두해 둔다면 200 이상을 주어야 한다.


```bash
# swftools 설치
sudo apt-get install swftools -y

# convert each swf file to png file
for x in *.swf; do
    swfrender ${x} -r 200 -o ../png/${x%.swf}.png
    echo "file created : ../png/${x%.swf}.png"
done
```

REFs
*  [Batch converting swf to png](https://askubuntu.com/questions/434259/batch-converting-swf-to-png)
