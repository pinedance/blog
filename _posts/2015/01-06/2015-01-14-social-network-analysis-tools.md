---
layout: post
title:  "Social Network Analysis Tools"
categories: Data_Science
---

검색해 보면 무척 많이 나온다. 그 중에서 써본 것들 적어 본다. (프로그래밍 언어 및 패키지 제외)

## Data Manipulation

Data Manipulation은 주로 R이나 python 등 프로그래밍 언어를 통해 수행할 수 있다. 하지만 어플리케이션에서 이를 작업할 수 있는 툴들도 존재한다.

### [KnowledgeMatrix Plus](http://mirian.kisti.re.kr/km/)

- 장점 : 무료다!, 유용한 기능들이 많다.
- 단점 : 별무

## Visualization

### [Pajek](http://vlado.fmf.uni-lj.si/pub/networks/pajek/)

- 장점 : 무료, 가장 유명하고 가장 널리 쓰인다. 기능이 무척 많다.
- 단점 : 그림이 단순함(별로 안예쁨), utf-8 인식 잘 안됨(현재는 개선 된 듯), 사용방법이 쉽지 않다.


### [Gephi](http://gephi.github.io/)

- 장점 : 무료, 높은 완성도, 그림 좋음
- 단점 : 프로그램이 약간 불안정


### [vosViewer](http://www.vosviewer.com/Home)

- 장점 : normalization 공식이 탑재되어 있음. density view, cluster view 등 직관적인 이미지 제공
- 단점 : normalization 공식이 탑재되어 있음
- works : [density](http://pinedance.github.io/data/images/CheongKangEuiGam/ClusterDensity2.png), [cluster](http://pinedance.github.io/data/images/CheongKangEuiGam/Density2.png)

관련자료

* [A tutorial for vosviewer](https://seinecle.github.io/vosviewer-tutorials/generated-html/importing-en.html)

### [Cytoscape](http://www.cytoscape.org/)

- 장점 : 익숙한 GUI 환경에서 작업할 수 있다.
- 단점 : 그림이 단순함(별로 안예쁨)
