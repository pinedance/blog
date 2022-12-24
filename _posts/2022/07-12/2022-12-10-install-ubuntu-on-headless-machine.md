---
layout: post
title:  "LAN선만으로 서버에 Ubuntu를 설치해 보자"
categories: 코딩삽질기
tags: ['Ubuntu', 'Linux']
---

## 배경

개인적으로 코딩을 편리하게 하려고 집에 작은 개발 서버를 운영하고 있다. 이 서버는 LAN선을 통해 공유기와 연결되어 있을 뿐 모니터도 키보드도 달려 있지 않다. 그런데, 처음에 Ubuntu 일반 버전을 설치하는 바람에 안그래도 사양이 좋지 않은 서버에 부담을 주고 있다. 그래서 서버용 최소 설치 버전 Ubuntu를 새로 설치하고 싶어졌다. 하지만 그려려면 설치용 USB를 만들고 어디선가 모니터와 키보드를 가져다 서버에 물린 다음 작업을 해야 하는데, 집에 여분의 모니터와 키보드가 없다. 웃기지만 난처한 상황이다. 

생각해보니 LAN선과 SSH만으로 Linux를 설치하는 방법이 있을 것 같았다. 새 OS 설치 중에는 SSH로 접근할 수 없으니 아마 미리 환경값을 만들어 두고 일괄 설치를 하는 방법이 있지 않을까? Linux는 서버로 가장 많이 사용되는 OS가 아닌가! 구글신의 신탁을 받아야 할 때다!

## 방법

구글신께 몇 차례의 신탁을 구한 끝에 `preseed.cfg`라는 파일로 미리 설치 옵션을 정해 두면 이후 자동 실행이 이루어진다는 사실을 알게 되었다. 그렇다면 이제 다음과 같이 진행하면 된다. 

기존 개발 서버에 SSH로 접속한 뒤
* 앞으로 설치하고 싶은 OS 이미지를 받아 둔다. 
* `preseed.cfg`를 만들어 둔다. 
* 이제 새로운 OS를 설치한다. 

사실 개요는 간단하지만 각 단계가 모두 수작업으로 이루어지기 때문에 여간 어려운 일이 아니다. 궁하면 통한다고 했던가. 또 어떤 현자께서 초짜들을 위해 자동화 스크립트를 만들어 공개해 두셨다. [Ubuntu OverSSH Reinstallation](https://gitlab.com/aasaam/ubuntu-overssh-reinstallation)이 그것이다. 여기에 설명된 내용을 차근차근 따라하면 SSH를 통해 Ubuntu를 다시 설치할 수 있다. 

중요한 내용은 위 글에서 코드와 함께 설명되어 있으므로 생략한다. 다만 다소 혼동될 수 있는 부분만 몇 가지 적어둔다. 

* 중간에 preseed server에 대한 내용이 나온다. `preseed.cfg` 파일을 네트워크 상에 두고 설치 할 때 받아다가 설치하는 개념이다. 
  - 이 단계가 꼭 필요한지 잘 모르겠다. `preseed.cfg`가 로컬에만 있어도 되지 않을까 추측되지만 ... 귀찮아서 테스트 해보지는 않았다. 
  - `preseed.cfg` 파일에는 권한에 대한 모든 정보까지 담겨 있으므로 오픈된 일반 web에 올려서는 안된다. 
  - 위 글에서는 도커를 이용하는 방법을 제시했지만, 내부 네트워크에 있는 다른 컴퓨터에서 [VS Code live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 같은 기능으로 올려 두는 편이 가장 간단해 보인다. 
* 실행 스크립트의 일부는 `sudo` 권한으로 실행해야 한다. 
* `preseed.cfg` 파일을 만드는 단계에서 여러가지 정보를 입력해 주어야 한다. 이 때 혼동하지 말아야 할 것은 user 계정 외에 installer 계정 정보를 설정해야 한다. 설치를 위해 임시로 설치 권한을 가지는 또 다른 user가 필요하기 때문이다. user 계정에는 당신이 로그인 할 때 사용할 user name과 password를 사용하면 된다. installer 계정에서는 설치를 위해 사용하는 계정이므로 이와 구분해야 하며, 입력해 놓고 잊어버리면 설치 최종 단계에서 서버에 접근할 수 없어 난처하게 될 수 있다. 

## Good Luck!!

구글신과 'Ubuntu OverSSH Reinstallation'을 공개해 주신 aasaam에게 감사한다. 

## REF

* [server - How can I install Ubuntu on a headless machine? - Ask Ubuntu](https://askubuntu.com/questions/13106/how-can-i-install-ubuntu-on-a-headless-machine)
* [aasaam / Ubuntu OverSSH Reinstallation · GitLab](https://gitlab.com/aasaam/ubuntu-overssh-reinstallation)
* [Cobbler/Preseed - Community Help Wiki](https://help.ubuntu.com/community/Cobbler/Preseed)


