---
layout: post
title:  "youtube 동영상을 mp3로 다운로드 해보자."
categories: [생활자동화]
tags: ['youtube']
---

youtube에 올라온 영상 가운데, 출퇴근 시간에 귀로 듣고 싶은 것들이 있다. 이럴 때 데이터가 많다면 동영상 그대로 재생시켜 보거나 들어도 되지만, 가난한 나에게는 음성만 추출하여 핸드폰에 넣고 듣는 것이 최선이다.

YouTube에 올라온 동영상에서 mp3를 추출하여 다운로드 하는 방법은 여러가지가 있다. 간단히는 [YTmp3](https://ytmp3.cc/en11/)와 같은 온라인 서비스를 이용할 수 있다. 이런 종류의 온라인 서비스는 무척 많으므로 구글에서 문의해 보자.

컴퓨터에서 직접 다운로드 하고 싶다면 아래를 보라.

## USE youtube-dl

[youtube-dl](https://github.com/ytdl-org/youtube-dl)라는 훌륭한 프로그램이 존재한다. bash에서 사용해야 한다. 윈도우라면 [WSL](https://docs.microsoft.com/ko-kr/windows/wsl/about)을 이용하자.  

매우 풍부한 기능을 가지고 있는 어플리케이션이므로 공식 페이지를 꼭 참고하자. 

```bash
# install
sudo apt install youtube-dl
# or
# sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
# sudo chmod a+rx /usr/local/bin/youtube-dl
```

```bash
# update
sudo youtube-dl -U
# or
sudo -H pip install --upgrade youtube-dl
```

Download MP3 Track from Youtube Video

```bash
# download file as mp3
youtube-dl -x --embed-thumbnail --audio-format mp3 〈YOUTUBE URL〉
```

Download Multiple MP3 Tracks from YouTube Playlist

```bash
youtube-dl -x --audio-format mp3 --playlist-start 1 --playlist-end 〈LAST(int)〉 〈YOUTUBE PLAYLIST URL〉
```

Download Multiple MP3(64k) Tracks from YouTube Playlist with Output File Name

```bash
youtube-dl -x --audio-format mp3 --audio-quality 64k --playlist-reverse --playlist-start 1 --playlist-end 100  -o '%(playlist)s/%(playlist_index)s-%(upload_date)s-%(title)s.%(ext)s' https://www.youtube.com/playlist?list=abcdefghijklmn
```

Issue

이 프로그램은 [ffmpeg](https://pinedance.github.io/blog/2018/01/13/manipulating-media-files-with-ffmpeg)에 의존하고 있기 때문에 ffmpeg가 설치되어 있지 않다면 "ffprobe/avprobe and ffmpeg/avconv not found" 등의 오류메시지를 만날 수 있다. 이때는 아래와 같이 ffmpeg를 설치해 주면 된다.

```bash
sudo apt-get install ffmpeg
```

REF
* [How to Download MP3 Tracks from a YouTube Video Using YouTube-DL](https://www.tecmint.com/download-mp3-song-from-youtube-videos/)

## USE 4K YouTube to MP3

윈도우 사용자라면 [4K YouTube to MP3](https://www.4kdownload.com/ko/products/youtubetomp3)를 사용하자. 무료 버전에서는 약간의 사용제한이 있지만 크게 불편함이 없다.
