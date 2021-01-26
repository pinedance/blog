---
layout: post
title: "관리자 권한(sudo) 없이 selenium 스크래핑(feat headless-chromium)"
categories: [코딩삽질기]
tags: ["sudo", "server", "selenium", "headless-chromium", "headless-chrome"]
---

## 배경

[selenium](https://www.selenium.dev/)은 브라우저를 자동으로 컨트롤 하는 대표적인 library이다. [스크래핑(Scraping)](https://ko.wikipedia.org/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0_%EC%8A%A4%ED%81%AC%EB%9E%98%ED%95%91)은 크롤링(crawling)이라고도 하며, 웹에 있는 자료를 자동으로 추출하는 기술이다. 

selenium과 web browser 그리고 python을 이용하면 웹에 있는 자료들을 자동으로 추출할 수 있다. 이를 위해서는 사용하는 컴퓨터에 python, selenium, 그리고 web browser가 설치되어 있어야 한다. 

## 목적

최근 분석을 위해 서버를 대여 받았는데, 이 서버에는 분석을 위해 anaconda python이 설치되어 있었지만 관리자 권한(이하 sudo)은 주어지지 않았다. 이 서버에서 웹 상의 데이터를 수집하려면 어떻게 해야 할지 고민을 좀 해 보았다. 

## 방법

다행스럽게 serverless 환경에서 사용할 수 있도록 배포된 [chromium binary file](https://github.com/adieuadieu/serverless-chrome)을 알게 되었고, 이를 무설치 web browser로 이용할 수 있을 것 같았다. 

일단 웹 페이지 스냅샷을 성공하였기에 그 방법을 정리해 본다. 여기에서는 anaconda python 환경을 중심으로 설명한다. 

### python 환경 만들기

먼저 프로젝트 환경을 만들어 보자. 이 과정은 생략해도 좋다. 

```bash
conda create -n selenium python=3.6
conda activate selenium
```

### selenium 설치

다음으로 selenium을 설치한다. 

```bash
conda install selenium
```

### chromium binary & webdriver 설치

마지막으로 serverless headless-chromium binary file과 webdriver 파일을 원하는 위치에 저장한다. 여기에서는 `./TOOL`에 저장한다고 가정한다. 

```bash
cd TOOL

# Download Chrome Webdrive
curl -SL https://chromedriver.storage.googleapis.com/2.42/chromedriver_linux64.zip > chromedriver.zip
unzip chromedriver.zip
rm ./chromedriver.zip

# Download Headless-Chromium for Serverless env
curl -SL https://github.com/adieuadieu/serverless-chrome/releases/download/v1.0.0-55/stable-headless-chromium-amazonlinux-2017-03.zip > headless-chromium.zip
unzip headless-chromium.zip
rm ./headless-chromium.zip

cd ..
```

### Scraping Code

이제 `selenium_test.py`라는 간단한 프로그램을 작성하고 실행시켜 보자. 

```python
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from time import sleep 

options = Options()
options.add_argument("--headless")
options.add_argument("--disable-gpu")
options.add_argument("--window-size=1280x1696")
options.add_argument("--disable-application-cache")
options.add_argument("--disable-infobars")
options.add_argument("--no-sandbox")
options.add_argument('--disable-dev-shm-usage')
options.add_argument("--hide-scrollbars")
options.add_argument("--enable-logging")
options.add_argument("--log-level=0")
options.add_argument("--single-process")
options.add_argument("--ignore-certificate-errors")
options.add_argument("--homedir=./TMP")

options.binary_location = "./TOOL/headless-chromium"
chromedriver_path = "./TOOL/chromedriver"

driver = webdriver.Chrome(chrome_options=options, executable_path=chromedriver_path )
driver.get("http://www.python.org")

sleep(1) 

driver.save_screenshot("web_screenshot.png") 

driver.close()
```

실행 결과 "http://www.python.org" 페이지의 스크린샷 "web_screenshot.png"이 생성되었다면 성공이다. 

참고로 폴더와 파일 구조는 다음과 같다. 

```bash
<working folder>
└ selenium_test.py
└ TOOL
    └ headless-chromium
    └ chromedriver
```

## REF

browser 제어 개요
* [Python으로 browser를 제어해 보자.](https://pinedance.github.io/blog/2017/10/02/python%EC%9C%BC%EB%A1%9C-browser%EB%A5%BC-%EC%A0%9C%EC%96%B4%ED%95%B4-%EB%B3%B4%EC%9E%90)

무설치 chromium 사용
* [Ruby on Jets : AWS Lambda에서 Selenium 크롤링](https://kbs4674.tistory.com/108)

Chromium 실행 위치 지정
* [Set chrome browser binary through chromedriver in Python](https://stackoverflow.com/a/45503916)


