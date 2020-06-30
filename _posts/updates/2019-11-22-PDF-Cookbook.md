---
layout: post
title:  "[Cookbook] PDF, 이럴 때 이렇게 한다."
categories: [Cookbook, 생활자동화]
---

## 배경

PDF는 전자문서의 표준으로 다양한 분야에서 사용되고 있다. PDF를 보는 것은 [Adobe Acrobat Reader DC](https://get.adobe.com/kr/reader/)나 [foxit reader](https://www.foxitsoftware.com/pdf-reader/)를 통해 쉽게 할 수 있다. 그러나 편집을 하려고 하면 문제가 복잡해진다. 주머니 사정이 괜찮다면 [Adobe Acrobat Pro DC](https://acrobat.adobe.com/kr/ko/free-trial-download.html)를 구입하여 사용하는 편이 정신건강에 좋다. 사용하기도 쉽고, 제공하는 기능도 다양하다. 하지만 PDF 파일을 단순히 병합하거나 분리하거나 하기 위해 고가의 프로그램을 구입해야 할까. 다른 방법도 있다. [postscrip](https://namu.wiki/w/%ED%8F%AC%EC%8A%A4%ED%8A%B8%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8)를 다루기 위해 만들어진 [Ghostscript](https://www.ghostscript.com/)를 이용하면 된다. Windows10 부터는 [WSL(Windows Subsystem For Linux)](https://docs.microsoft.com/ko-kr/windows/wsl/install-win10)을 통해 linux를 이용할 수 있기 때문에 사용 가능하다.

Ghostscript에 대해서는 이전 글[PDF 용량 축소하기 (with Ghostscript)]({{site.baseurl}}/blog/2018/08/31/PDF-%EC%9A%A9%EB%9F%89-%EC%B6%95%EC%86%8C%ED%95%98%EA%B8%B0)에서 소개한 바 있다.

## 내용이 많아 따로 작성한 페이지

{% include post_list_subject.html subject="pdf" %}

## 설치

먼저 설치한다. 간단하게 apt-get으로 설치할 수 있다. windows의 경우, wsl 환경으로 들어가서 실행시킨다.

```bash
sudo apt-get install ghostscript
```

최신 버전을 설치하려면 [Ghostscript 공식 홈페이지](https://www.ghostscript.com/)에서 다운로드 받아 설명된 설치 방법에 따른다.

## 사용법(일부)

자세한 사용법은 공식 홈페이지의 [설명](https://www.ghostscript.com/doc/current/Use.htm)을 참조하라. 공식 설명이 너무 길기 때문에 [gs (GhostScript) cheat sheet](http://flukylogs.blogspot.com/2012/08/gs-ghostscript-cheat-sheet.html)을 먼저 보자.

* `-dBATCH`: 파일 변환후 `GS>`프럼프트를 표시하지 않고 종료
* `-dNOPAUSE`: 페이지마다 멈추지 않고 계속 진행
* `-sDEVICE`: 출력형식을 지정. PDF라면 `-sDEVICE=pdfwrite`
* `-sOutputFile`: 결과물을 OutputFile로 저장한다.

## PDF 용량  축소

이전 글[PDF 용량 축소하기 (with Ghostscript)]({{site.baseurl}}/2018/08/31/PDF-%EC%9A%A9%EB%9F%89-%EC%B6%95%EC%86%8C%ED%95%98%EA%B8%B0)을 참조하라.

## PDF 병합

여러개의 PDF를 하나의 PDF로 병합해 보자.

대상이 되는 파일이 input1.pdf, input2.pdf이고, 결과 파일 명을 merged.pdf라고 하였을 때, 다음과 같이 할 수 있다. `-dPDFSETTINGS=/prepress`는 압축을 위한 것이므로 생략할 수 있다.

```bash
# merge pdf
gs -dBATCH -dNOPAUSE -q \
   -sDEVICE=pdfwrite \
   -dPDFSETTINGS=/prepress \
   -sOutputFile=merged.pdf \
   input1.pdf input2.pdf
```

현재 폴더에 있는 파일 전체를 merged.pdf로 합치려면 다음과 같이 해야 한다. 이때 `ls`를 통해 파일 순서를 먼저 살펴보자. 파일이 원하는 순서로 정렬되지 않았다면 파일 이름을 바꾸거나 해야 한다.

```bash
# merge pdf of folder
gs -dBATCH -dNOPAUSE -q \
   -sDEVICE=pdfwrite \
   -dPDFSETTINGS=/prepress \
   -sOutputFile=merged.pdf \
   *
```

## 페이지 추출

특정 페이지를 추출할 수 있다. input.pdf 파일에서 3페이지만을 추출하여 output.pdf로 만들고자 한다면 다음과 같이 할 수 있다.

```bash
gs -q -dBATCH -dNOPAUSE \
   -sDEVICE=pdfwrite \
   -dFirstPage=3 \
   -dLastPage=3 \
   -sOutputFile=output.pdf input.pdf
```

## PDF 색반전

가끔 PPT를 PDF로 변환한 경우, 배경이 검은색일 때가 있다. 검은색 배경은 눈의 피로를 줄여주지만, 이를 출력하면 대참사가 벌어진다. 이럴 때는 색반전(invert)을 통해 검은색을 흰색으로, 흰색을 검은색으로 바꿔준 뒤에 출력해야 한다. 좀 복잡하지만 아래와 같이 하면 된다. 원본 파일이 input.pdf이고 결과 파일이 inverted.pdf이다.

```bash
# invert color
gs -sDEVICE=pdfwrite  \
   -dPDFSETTINGS=/prepress \
   -c "{1 exch sub}{1 exch sub}{1 exch sub}{1 exch sub} setcolortransfer" \
   -o inverted.pdf
   -f input.pdf
```

## PDF를 image(jpg, png)로

DEVICE options
* `png16m`: 24-bit RGB color
  * `png256`: 8-bit color
  * `png16`: 4-bit color
* `pnggray`: grayscale
  * `pngmono`: black-and-white for special needs
* `pngalpha`: 32-bit RGBA color with transparency indicating pixel coverage. (The background is transparent unless it has been explicitly filled)

```bash
gs -dNOPAUSE -dBATCH \
   -sDEVICE=png16m \
   -r100x100 \
   -sOutputFile=page-%03d.jpg \
   target.pdf
```

※ ghostscript는 pdf를 다루는 library이므로 image를 PDF로 만드는 일은 하기 어렵다. 이 작업은 [ImageMagick](https://imagemagick.org/index.php)을 이용하여 할 수 있다. 다만 용량이 늘어나는 문제가 생길 수 있다. 따라서 `-compress jpeg` 옵션이 필요하다.

```bash
convert -compress jpeg *.jpg output.pdf
```

## PDF 회전

아래와 같이 하면 된다. 하지만 결과가 내가 원하는 것과 다르게 나타날 수 있다. 자세한 내용은 [여기](https://stackoverflow.com/a/3108179)를 참조하자.

```bash
gs -dNOPAUSE -dBATCH -q\
  -sDEVICE=pdfwrite \
   -c "<</Orientation 2>> setpagedevice" \
  -sOutputFile=output.pdf \
  input.pdf
```

ghostscript로 페이지를 임의로 회전하는 것은 어려운 것 같다. 이 역시 [ImageMagick](https://imagemagick.org/index.php)을 사용하자

```bash
convert -rotate -90 -density 200 input.pdf output.pdf
```

## PDF unlock

잠겨 있는(locked) pdf인 경우 PDF를 OCR 하거나 일부 잘라내는 등의 가공을 할 수 없다. 이럴 때는 "unlcok pdf"라는 키워드로 검색하여 나오는 [smallpdf](https://smallpdf.com/kr/unlock-pdf), [sodapdf](https://www.sodapdf.com/ko/unlock-pdf/) 등 온라인 툴로 해결할 수 있다. 하지만 하나하나 해결해야 하므로 번거롭고, 개수 제한이 걸려 있는 걸려 있는 경우에는 충분히 사용할 수 없다. 원칙적으로는 password를 알아야 하지만 잃어버린 경우에는 방법이 없다. 이런 경우에는 Ghostscript를 이용하여 다음과 같은 방법으로 이를 해결할 수 있다. 

```bash
gs -q -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=unencrypted.pdf -c .setpdfwrite -f encrypted.pdf
```

폴더에 있는 여러 파일에 모두 적용하려면 다음과 같이 한다.

```bash
for F in *;
do
   gs -q -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile="un_${F}" -c .setpdfwrite -f "${F}"
done
```

## make PDF searchable 

문서를 그냥 스캔한 경우, 이미지로 내용을 확인할 수 있지만 텍스트를 복사하거나 검색할 수 없다. PDF 안에 그러한 데이터가 존재하지 않기 때문이다. 이런 경우 OCR을 한 후에 OCR 결과를 PDF에 layer로 삽입해 주어야 한다. [Acrobat Pro DC](https://acrobat.adobe.com/kr/ko/acrobat.html)를 사용하는 것이 정신건강에 좋다. 그러나 때때로 많은 파일을 일괄처리 하고 싶다면 open source program으로 해결할 수 있다. [검색 가능한 PDF 만들기(feat OCR)]({{site.baseurl}}/2019/07/08/Build-searchable-pdf)를 참조하라.

## REF

* [RedMon과 Ghostscript](http://chitchat2014.blogspot.com/2014/07/redmon-ghostscript.html)
* [프로그램에서 AI 파일을 보여주기: Ghostscript](http://blog.devquest.co.kr/imp/305)
* [Ghostscript to merge PDFs compresses the result](https://stackoverflow.com/questions/8158584/ghostscript-to-merge-pdfs-compresses-the-result)
* [Reverse white and black colors in a PDF](https://stackoverflow.com/questions/30284327/reverse-white-and-black-colors-in-a-pdf)
* [Converting PDF to PNG using Ghostscript](https://www.opentechguides.com/how-to/article/tools/42/pdf-to-pnf.html)
* [stackoverflow / How to change page orientation of PDF?](https://stackoverflow.com/a/3108179)
* [HowTo: Linux Remove a PDF File Password Using Command Line Options](https://www.cyberciti.biz/faq/removing-password-from-pdf-on-linux/)
