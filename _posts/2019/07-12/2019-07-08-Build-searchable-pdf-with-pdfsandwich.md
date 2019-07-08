---
layout: post
title:  "OCR을 통해 PDF를 검색하고 글자를 복사해오자."
categories: 생활자동화
keywords: ["searchable pdf", "pdfsandwich", "pdf", "tesseract", "imagemagick", "bash"]
---


## OCR and PDF

종종 책이나 문서에 적혀 있는 텍스트를 전자 파일로 입력해야 할 필요가 있다. 책이나 문서를 펼쳐 놓고 한 글자 한 글자 입력해 넣다 보면, "21세기에 이 방법 뿐인가"라는 생각을 하게 된다.

그렇다. 지금은 21세기다. 다른 방법이 있다. 해당 부분을 깨끗하게 스캔하여 OCR를 통해 전자 문서로 만드는 것이다. [OCR](https://en.wikipedia.org/wiki/Optical_character_recognition)은 "Optical character recognition"의 약자로 이미지에 포함된 문자를 인식하여 전자 텍스트 데이터로 나타내 준다. OCR 기술은 상당히 발전하여, 원본 이미지의 상태만 좋다면 인식률이 매우 높은 편이다.

이렇게 문서를 스캔하여  PDF로 만들고, OCR을 적용하면, 검색도 가능하고 텍스트도 긁을 수 있는 문서를 얻을 수 있다.


※ 참고

* 문서를 스캔하여 PDF를 만들면, 글자가 화면에 나타나기는 하지만 검색할 수도 없고 문자를 복사하여 붙여넣기 할 수도 없다. 이는 문서를 그림처럼 인식하였기 때문이다.
* 최근 스캐너들은 스캔할 때 문자를 자동으로 인식하여 PDF를 만들어 주기도 한다. 스캔 전에 해당 편의기능이 있는지 확인해 보자.

## Build searchable pdf with pdfsandwich

PDF를 OCR로 변환시켜 주는 기능은 [acrobat pdf pro(유료버전)](https://acrobat.adobe.com/sea/en/acrobat/acrobat-pro.html)과 [ABBYY FineReader](https://www.abbyy.com/en-us/finereader/) 같은 상용 프로그램을 이용하면 쉽게 수행할 수 있다. 다만 GUI환경에서 작업해야 하고, 유료이다.

만약 linux cli를 사용할 수 있다면 다른 옵션이 있다. [pdfsandwich](http://www.tobias-elze.de/pdfsandwich/)가 그것이다. 이 프로젝트는 opensource OCR 프로젝트로 유명한 [tesseract](https://github.com/tesseract-ocr/tesseract)를 이용하여 pdf를 OCR하여 검색이 가능하고 문자를 복사할 수 있는 상태로 만들어준다. CLI 환경에서 작업해야 하고, 아직까지는 무료이다.

pdfsandwich를 통해 PDF를 변환하는 방법을 기록해 둔다.

### Install

pdfsandwich 설치를 위해서는 먼저 ⓐ설치 파일을 다운로드 받고, ⓑ이를 설치하고, ⓒ의존성이 있는 프로그램을 추가해 주어야 한다.

ⓐ설치 파일은 [pdfsandwich project website](http://sourceforge.net/projects/pdfsandwich/files/)에서 다운로드 가능하다. 현재 기준으로 `pdfsandwich_0.1.7_amd64.deb`를 다운로드 받으면 된다.

ⓑ다운로드 받은 폴더에서 이를 설치한다.

```bash
# install pdfsandwich
sudo dpkg -i pdfsandwich_0.1.7_amd64.deb  
```

아마 이 과정에서 몇가지 `error` 메시지를 만났을 것이다. 이는 의존 관계에 있는 프로그램이 없어서 생긴 문제점이다. 홈페이지 설명("If there are error messages due to missing dependencies, ignore them and proceed.")처럼 일단 무시하고 다음 설치를 계속 하자.

ⓒpdfsandwich는 OCR을 위해 tesseract, PDF를 다루기 위해 imagemagick를 필요로 한다. 이를 설치한다.

```bash
sudo apt-get -fy install
```

설치가 끝나면 설치가 잘 되었는지, 현재 OCR에 사용 가능한 언어는 무엇이 있는지 확인해 보자.

```bash
pdfsandwich -list_langs
```

### Add language pack to OCR

막 설치를 마치면 OCR이 가능한 언어 중에 한글(kor)은 없을 것이다. 그렇다면 한글을 추가해 주어야 한다. 그러나 ORC은 pdfsandwich가 아니라 tesseract에서 수행하므로, __한글 언어 패키지는 `tesseract`에서 찾아서 추가해 주어야 한다.__

```bash
sudo apt install tesseract-ocr-kor
```

어떤 언어 패키지가 있는지는 [Tessdata repository](https://github.com/tesseract-ocr/tessdata)에서 확인해 볼 수 있다. 아울러 [ubuntu packages](https://packages.ubuntu.com/bionic/tesseract-ocr-all)도 참고해 보자.


### Rock OCR

한글과 영어로 이루어진 test.pdf라는 파일을 변환시켭보자.

```bash
pdfsandwich -lang kor+eng test.pdf
```

결과로 test_ocr.pdf가 생성되어 있는 것을 확인할 수 있다.


### Issues

변환 과정에서 `not authorized`와 관련된 에러로 인해 작업이 완료되지 않을 수 있다. 이는 pdfsandwich의 문제가 아니라 pdf를 다루기 위해 의존하고 있는 imagemagick의 보완 정책 때문에 발생한다.  imagemagick 설정 파일을 수정해 주면 해결할 수 있다.

`/etc/ImageMagick-6/policy.xml` (or `/etc/ImageMagick/policy.xml`) 파일을 열고 아래 내용을 수정한다.

`<policy domain="coder" rights="none" pattern="PDF" />` 부분을 찾아 `<policy domain="coder" rights="read|write" pattern="PDF" />`와 같이 수정한다.

REF : [stackoverflow](https://stackoverflow.com/questions/42928765/convertnot-authorized-aaaa-error-constitute-c-readimage-453)
