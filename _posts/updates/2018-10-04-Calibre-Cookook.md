---
layout: post
title:  "[Cookbook] Calibre, 이럴 때 이렇게 한다."
categories: [코딩삽질기, Cookbook]
---

## 개요

## install

ubuntu와 같은 linux 계열 시스템을 기준으로 설명한다.

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

먼저 [이곳](https://download.calibre-ebook.com/)에서 설치하고자 하는 Calibre 설치파일을 다운로드 받은 다음, 다운로드 받은 폴더로 이동하여 다음 스크립트를 실행시켜 준다.

```bash
# customize variables
CALIBRE_PATH=/opt/calibre
CALIGRE_FILE=calibre-3.44.0-x86_64.txz
# excute script
sudo mkdir -p ${CALIBRE_PATH} && sudo rm -rf ${CALIBRE_PATH}/* && sudo tar xvf $(pwd)/${CALIGRE_FILE} -C ${CALIBRE_PATH} && sudo ${CALIBRE_PATH}/calibre_postinstall
```
