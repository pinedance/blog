---
layout: post
title:  "더 자유롭게 인터넷을 항해하기 위한 도구들"
categories: 생활자동화
---

중국의 경우 구글과 같은 서비스들이 막혀 있다고 한다. 우리 나라도 얼마 전 [인터넷 검열](https://namu.wiki/w/%EC%9D%B8%ED%84%B0%EB%84%B7%20%EA%B2%80%EC%97%B4)이 아니냐는 문제가 제기된 사건이 있었다.

기술적인 내용은 잘 모르겠지만, 창과 방패의 싸움 같아 보인다.

자유에는 책임이 따른다. 사회를 구성하고 살고 있는 이상, 어느 개인의 무한한 자유는 또 다른 개인의 희생을 의미하기 때문에 조율이 불가피하다. 이상적으로는 모두가 불편함 없이 자유롭다고 여기는 최적화된 지점에서 개개인의 자유가 보장되어야 하겠지만, 그 최적화 과정에서 많은 논쟁과 갈등은 불가피하다.

다만 여기에서는 꼭 써야할 때, 특정 사이트에 접근할 수 있는 방법을 적어 본다.

## VPN

[VPN](https://namu.wiki/w/%EA%B0%80%EC%83%81%20%EC%82%AC%EC%84%A4%EB%A7%9D)을 이용하는 방법이다. 유로 서비스도 존재하지만, [Opera browser](https://www.opera.com/ko)를 이용하면 자체적으로 제공하는 [VPN 서비스](https://www.opera.com/ko/computer/features/free-vpn)를 이용할 수 있다.

## Tor browser

VPN과는 조금 다른 [토어(Tor)](https://ko.wikipedia.org/wiki/%ED%86%A0%EC%96%B4) 프로젝트가 있다. 이 프로젝트에서 운영하고 있는 토어 네트워크를 이용하면 익명성을 보장받을 수 있다. 토어 네트워크를 이용하기 위해서는 [Tor browser](https://www.torproject.org/)를 사용하면 된다.

## Remote Control

다른 지역에 컴퓨터를 Remoe Control을 통해 사용하는 것도 방법이 될 수 있다. [AWS에서 windows instance](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/WindowsGuide/connecting_to_windows_instance.html)를 만들고, 이를 RDP로 제어하면 된다. 물론 돈이 많이 든다.
