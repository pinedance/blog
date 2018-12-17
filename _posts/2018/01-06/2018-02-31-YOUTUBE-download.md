---
layout: post
title:  "YOUTUBE 활용하기, 동영상 음성 다운로드"
categories: 생활자동화
---

Youtube 동영상/음성을 다운로드 해 보자.

[youtube-dl](https://github.com/rg3/youtube-dl)

```
# Install
sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl
```

```
# Download mp3
youtube-dl --extract-audio --audio-format mp3 -l [Youtube link address]
```

Ref

* [Convert youtube to mp3](https://askubuntu.com/questions/218932/convert-youtube-to-mp3)
