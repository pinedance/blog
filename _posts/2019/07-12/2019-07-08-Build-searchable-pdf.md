---
layout: post
title:  "OCR을 통해 PDF를 검색하고 글자를 복사해오자."
categories: 생활자동화
tags: ["searchable pdf", "ocrmypdf", "pdfsandwich", "pdf", "tesseract", "imagemagick", "bash"]
---


## OCR and PDF

종종 책이나 문서에 적혀 있는 텍스트를 전자 파일로 입력해야 할 필요가 있다. 책이나 문서를 펼쳐 놓고 한 글자 한 글자 입력해 넣다 보면, "21세기에 이 방법 뿐인가"라는 생각을 하게 된다.

그렇다. 지금은 21세기다. 다른 방법이 있다. 해당 부분을 깨끗하게 스캔하여 OCR를 통해 전자 문서로 만드는 것이다. [OCR](https://en.wikipedia.org/wiki/Optical_character_recognition)은 "Optical character recognition"의 약자로 이미지에 포함된 문자를 인식하여 전자 텍스트 데이터로 나타내 준다. OCR 기술은 상당히 발전하여, 원본 이미지의 상태만 좋다면 인식률이 매우 높은 편이다.

이렇게 문서를 스캔하여  PDF로 만들고, OCR을 적용하면, 검색도 가능하고 텍스트도 긁을 수 있는 문서를 얻을 수 있다.


※ 참고

* 문서를 스캔하여 PDF를 만들면, 글자가 화면에 나타나기는 하지만 검색할 수도 없고 문자를 복사하여 붙여넣기 할 수도 없다. 이는 문서를 그림처럼 인식하였기 때문이다.
* 최근 스캐너들은 스캔할 때 문자를 자동으로 인식하여 PDF를 만들어 주기도 한다. 스캔 전에 해당 편의기능이 있는지 확인해 보자.

PDF를 OCR로 변환시켜 주는 기능은 [acrobat pdf pro(유료버전)](https://acrobat.adobe.com/sea/en/acrobat/acrobat-pro.html)과 [ABBYY FineReader](https://www.abbyy.com/en-us/finereader/) 같은 상용 프로그램을 이용하면 쉽게 수행할 수 있다. 다만 GUI환경에서 작업해야 하고, 유료이다.

만약 linux cli를 사용할 수 있다면 아래와 같은 라이브러리를 사용하여 목적을 달성할 수 있다. 이 프로젝트들은 open source OCR 프로젝트로 유명한 [tesseract](https://github.com/tesseract-ocr/tesseract)를 이용하여 PDF에 OCR을 수행한 뒤 그 결과를 PDF에 layer로 삽입해 준다. 이렇게 되면 검색이 가능하고 문자를 복사할 수 있는 PDF가 완성된다. 

* [ocrmypdf](https://pypi.org/project/ocrmypdf/), [document](https://ocrmypdf.readthedocs.io/en/latest/)
* [PDFsandwich](http://www.tobias-elze.de/pdfsandwich/)
* [OCRFeeder](https://wiki.gnome.org/action/show/Apps/OCRFeeder?action=show&redirect=OCRFeeder)
* [PDF2SearchablePDF](https://github.com/ElectricRCAircraftGuy/PDF2SearchablePDF)

여기에서는 ocrmypdf와 PDFsandwich를 이용한 방법을 살펴보자. 

***

## Build searchable pdf with ocrmypdf

ocrmypdf는 python module이므로 python에서 컨트롤 하기 좋다. 물론 cli로 운용도 가능하다. 

### Install

아래와 같이 하면 `tesseract`까지 모두 설치해 준다.

```bash
apt-get install ocrmypdf
```

작업 결과 PDF 용량이 늘어나는 경우가 많은데, 이 때 pymupdf가 필요하다고 한다. 설치 방법은 아래와 같은데, 그래도 경고가 계속 나오더라.

```bash
# optional install
pip install -U pymupdf
# conda install -c conda-forge mupdf
```

### Add language pack to OCR

막 설치를 마치면 OCR이 가능한 언어는 알파벳 뿐이다. 따라서 원하는언어 패키지를 추가해 주어야 한다. ORC은 tesseract에서 수행하므로, __각 언어 패키지를 `tesseract`에서 찾아서 추가해 주어야 한다.__

```bash
# tesseract 언어 데이터 설치
sudo apt install tesseract-ocr-kor\ # 한글
  tesseract-ocr-chi-sim\            # 중국어 간체
  tesseract-ocr-chi-sim-vert\       # 중국어 간체 세로 쓰기
  tesseract-ocr-chi-tra\            # 중국어 번체
  tesseract-ocr-chi-tra-vert\       # 중국어 번체 세로 쓰기
  tesseract-ocr-jpn\                # 일본어
  tesseract-ocr-jpn-vert\           # 일본어 세로 쓰기
  tesseract-ocr-eng\                # 영어
```

어떤 언어 패키지가 있는지는 [Tessdata repository](https://github.com/tesseract-ocr/tessdata)에서 확인해 볼 수 있다. 아울러 [ubuntu packages](https://packages.ubuntu.com/bionic/tesseract-ocr-all)도 참고해 보자.

### Rock OCR

OCR은 아래와 같이 수행한다. 

```bash
# 중국어 간체의 경우 (옵션이 chi-sim이 아님에 주의하라)
ocrmypdf  -l chi-sim  --output-type pdf input_scanned.pdf  output_searchable.pdf 
```

쓰다보니 옵션을 주게 된다. 

* 처리 중에 모종의 이유로 에러와 함께 중단될 수 있다. 이럴 때는 `--force-ocr` 옵션을 사용한다. 
* 스캔할 때 약간 기우뚱한 페이지 들이 있을 경우 `--deskew` 옵션을 추가한다. 
* 처리 결과 PDF가 너무 커질 수 있다. `--pdfa-image-compression jpeg` 옵션으로 압축을 사용해 본다. 
* 보관을 위해 PDF/A로 저장하고 싶다. `--output-type pdfa` 옵션을 준다. 

그래서 결과적으로 보통은 아래와 같이 한다. 

```bash
ocrmypdf  -l chi_sim --deskew --force-ocr --output-type pdfa --pdfa-image-compression jpeg  MY_INPUT.pdf OCR_OUTPUT.pdf 
```

같은 폴더에 몰아 넣고 일괄작업을 해보자. 먼저 하위에 `./OCR` 폴더를 생성한 다음 아래 스크립트를 실행한다.

```bash
for F in *; 
do 
	start=`date +%s`;
	echo "BEGIN ... ${F}"; 
	ocrmypdf  -l chi_sim  --deskew --force-ocr --output-type pdfa --pdfa-image-compression jpeg  "${F}"  "OCR/${F}"; 
	end=`date +%s`;
	echo "END ... $F / duration : $((end-start))";
done 
```

### Issue

작업 후에 결과 PDF 파일의 용량이 지나치게 커질 수 있다. 근본적인 원인의 해결방법은 모르겠다. 하지만 용량을 좀 줄일 수는 있다. [PDF 용량 축소하기 (with Ghostscript)]({{site.baseurl}}/2018/08/31/PDF-용량-축소하기)를 참조하자.

***


## Build searchable pdf with pdfsandwich

이제 pdfsandwich 사용법을 알아보자. CLI 환경에서 작업이 가능하고 아직까지는 무료이다.

### Install

pdfsandwich 설치를 위해서는 먼저 ⓐ설치 파일을 다운로드 받고, ⓑ이를 설치하고, ⓒ의존성이 있는 프로그램을 추가해 주어야 한다.

ⓐ설치 파일은 [pdfsandwich project website](http://sourceforge.net/projects/pdfsandwich/files/)에서 다운로드 가능하다. 현재 기준으로 `pdfsandwich_0.1.7_amd64.deb`를 다운로드 받으면 된다.

ⓑ다운로드 받은 폴더에서 이를 설치한다.

```bash
# install pdfsandwich
sudo dpkg -i pdfsandwich_0.1.7_amd64.deb  
```

아마 이 과정에서 몇가지 `error` 메시지를 만났을 것이다. 이는 의존 관계에 있는 프로그램이 없어서 생긴 문제점이다. 홈페이지 설명("If there are error messages due to missing dependencies, ignore them and proceed.")처럼 일단 무시하고 다음 설치를 계속 하자.

ⓒpdfsandwich는 OCR을 위해 tesseract, PDF를 다루기 위해 imagemagick를 필요로 한다. 의존성 라이브러리를 다음과 같이 설치한다.

```bash
sudo apt-get -fy install
```

설치가 끝나면 설치가 잘 되었는지, 현재 OCR에 사용 가능한 언어는 무엇이 있는지 확인해 보자.

```bash
pdfsandwich -list_langs
```

### Add language pack to OCR

위에서 설명한 방법으로 tesseract의 언어 패키지를 설치한다. 


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
