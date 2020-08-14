---
layout: post
title:  "ffmpeg로 media file을 다루어 보자."
categories: 생활자동화
---

> ffmpeg로 할 수 있는 일들을 Cookbook 스타일로 정리해 본다.

media file을 편집하는데 가장 유명한 프로그램 중 하나는 `ffmpeg`이다. 동영상을 자르고 붙이는 일부터 형식을 바꾸는 일까지 사용 범위는 매우 넓다. 게다가 cli 기반이기 때문에 어렵기는 하지만 bash에서 대량의 작업을 자동으로 수행할 수 있다는 장점이 있다.

하고자 하는 일에 따라 정리해 보았다. 계속 업데이트 할 생각이다.

## merge mp3

ref : https://trac.ffmpeg.org/wiki/Concatenate

```
printf "file '%s'\n" ./*.mp3 > mylist.txt
```

```
ffmpeg -f concat -safe 0 -i mylist.txt -c copy output.mp3
```

```
printf "file '%s'\n" ./*.mp3 > mylist.txt && ffmpeg -f concat -safe 0 -i mylist.txt -c copy output.mp3
```


## convert stereo to mono

```
FILES=*
for f in $FILES
do
	ffmpeg -i "${f}" -ac 1 "mono/${f}"
done
```

## convert m4a to mp3

```
for foo in *.m4a; do ffmpeg -i "$foo" -acodec libmp3lame -aq 2 "${foo%.m4a}.mp3"; done
```

## convert mp3 to mp4 (for uploading to youtube)

ref

* [Convert mp3 music to video for youtube upload](https://ubuntuforums.org/showthread.php?t=1686664)
* [ffmpeg mp3 + jpg = mp4 howto make video smaller](https://askubuntu.com/questions/868283/ffmpeg-mp3-jpg-mp4-howto-make-video-smaller)

```
# must prepare picture.jpg
for foo in *.mp3; do ffmpeg -loop 1 -i "background.jpg" -i "$foo" -shortest -acodec copy "${foo%.mp3}.mp4" -crf 0; done
```

## slice, segment

```
# slice per 120 seconds
ffmpeg -i LONGVIDEO.mkv -codec copy -f segment -segment_time 120 -reset_timestamps 1 tmp/out%03d.mkv
```

## reduce bitrate

```bash
ffmpeg -i INPUT.mp3 -codec:a libmp3lame -b:a 64k OUTPUT.mp3
```

## REF
* [How to automatically segment video using ffmpeg without re-encoding?](https://askubuntu.com/questions/948304/how-to-automatically-segment-video-using-ffmpeg-without-re-encoding)
* [ffmpeg increases video segments length when used with -segment_time - how to fix?](https://superuser.com/questions/1065683/ffmpeg-increases-video-segments-length-when-used-with-segment-time-how-to-fix)
