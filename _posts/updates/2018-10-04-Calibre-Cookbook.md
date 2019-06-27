---
layout: post
title:  "[Cookbook] Calibre, 이럴 때 이렇게 한다."
categories: [코딩삽질기, Cookbook]
---

## 개요

[Calibre](https://calibre-ebook.com/)는 eBook 관리자(E-book management)이자 뷰어이다. 하지만 개발자들은 epub을 pdf로 만들거나 pdf를 epub으로 만드는 작업에 많이 활용한다. gui 환경 뿐만 아니라 cli 환경까지 지원하기 때문에 활용도가 높다. ebook으로 어떤 작업을 해야 한다면 고려해 볼 어플리케이션이다.

## install

Calibre는 윈도우용, mac용, linux용 등 다양한 os를 지원한다. 여기에서는 설치가 비교적 까다로운 ubuntu와 같은 linux 계열 시스템을 기준으로 설명한다.

Calebre를 설치하는 가장 쉬운 방법은 `sudo apt install calibre`를 실행시키는 것이다. __하지만__ 아주 오래된 옛 버전이 설치된다. 따라서 아래의 방법을 따라해 보자.

"[Calibre 공식 문서 / install](https://calibre-ebook.com/download_linux)"에 따라 다음과 같이 하면 설치가 완료된다. 시스템에 python이 설치되어있어야 한다.

```bash
# https://calibre-ebook.com/download_linux
sudo -v && wget -nv -O- https://download.calibre-ebook.com/linux-installer.sh | sudo sh /dev/stdin
```

※ 만약 설치 중에 "ImportError: cannot import name QImage"와 같은 에러메시지가 나타나면 python이 의존하고 있는 linux library가 구비되지 않은 것이다. 다음과 같이 설치해 주고 다시 install을 진행한다. [ref](https://github.com/yomun/youdaodict_5.5/issues/5)

```bash
sudo apt install python3-pyqt5 python3-pyqt5.qtmultimedia python3-pyqt5.qtquick -y
sudo apt install python3-pyqt5.qtwebkit -y
```

※ 만약 SSL 문제로 스크립트를 통해 파일을 다운로드 받아 설치할 수 없다면 다음과 같이 한다.

"[Calibre 공식 문서 / install](https://calibre-ebook.com/download_linux)"에서 "Manual binary install or reverting to a previous version" 부분을 찾아 설명에 따른다. 이 방법은 이미 설치되어 있는 Calebre를 지우고 업데이트를 시킬 때 사용하는 방법이다. 당연히 업데이트 때도 사용할 수 있다.

먼저 [이곳](https://download.calibre-ebook.com/)에서 설치하고자 하는 Calibre 설치파일 정보를 확인한 다음 다음 스크립트를 수정하여 실행시킨다.

```bash
# customize your variables
## find your target file on https://download.calibre-ebook.com/
CALIBRE_VER=3.44.0
CALIBRE_FILE=calibre-3.44.0-x86_64.txz
## set location to install
CALIBRE_PATH=/opt/calibre

# excute script
curl -O -k https://download.calibre-ebook.com/${CALIBRE_VER}/${CALIBRE_FILE}
sudo mkdir -p ${CALIBRE_PATH} && sudo rm -rf ${CALIBRE_PATH}/* && sudo tar xvf $(pwd)/${CALIBRE_FILE} -C ${CALIBRE_PATH} && sudo ${CALIBRE_PATH}/calibre_postinstall
```

만약 설치 파일을 수동으로 다운로드 했다면 다운로드된 파일이 있는 폴더로 이동하여 다음과 같이 실행시켜 준다.

```bash
# customize your variables
CALIBRE_FILE=calibre-3.44.0-x86_64.txz
CALIBRE_PATH=/opt/calibre
# excute script
sudo mkdir -p ${CALIBRE_PATH} && sudo rm -rf ${CALIBRE_PATH}/* && sudo tar xvf $(pwd)/${CALIBRE_FILE} -C ${CALIBRE_PATH} && sudo ${CALIBRE_PATH}/calibre_postinstall
```

## Convert files

다른 형식의 파일로 변환해 보자.

### epub2pdf

epub을 pdf로 변환시켜 보자.

```bash
ebook-convert file.epub file.pdf
```

변환이 잘 이루어지지 않는다면 다음과 같이 실행시켜 보자.

```bash
ebook-convert myfile.epub myfile.pdf --enable-heuristics
```

변환이 잘 끝났는지 file type을 확인해 보자.

```bash
# Confirm file type.
file myfile.pdf
```

REF
* [How to Convert ePub file to PDF Format on Linux CLI](https://computingforgeeks.com/how-to-convert-epub-file-to-pdf-format-on-linux-cli/)
