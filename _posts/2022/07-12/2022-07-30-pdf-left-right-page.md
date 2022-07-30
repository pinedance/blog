---
layout: post
title:  "PDF 양면보기 좌우 위치 바꾸기(feat. Foxit PDF Reader)"
categories: 생활자동화
tags: ['pdf']
---

## 배경

pdf로 문서를 보는 일이 점점 늘어나고 있다. PC의 가로화면에서 PDF 문서를 볼 때 양면을 한 화면에서 보면 편리하다. 하지만 드물게 일본어로 된 문서와 같이 왼쪽에서 오른쪽으로 읽어가야 하는 경우가 있다. 이럴 때 어떻게 해야 할까. 

## 방법1

[Foxit PDF Reader](https://www.foxit.com/pdf-reader/)를 사용하면 쉽게 해결할 수 있다. 

View 리본에서 양쪽 보기를 선택한 뒤, "Reverse View"를 체크하면 된다. 

![]({{site.imgurl}}/2022-07-30/001.png)

## 방법2

가장 많은 사람이 사용하는 Acrobat 프로그램의 경우는 어떠할까. 조금 어렵다. 좌우 위치를 바꾸어 보기 위해서는 문서 자체의 속성을 수정해야 한다. 메뉴에서 `파일 > 속성`을 선택한 다음 `고급` 탭에서 `읽기 옵션`의 `바인딩`을 `오른쪽 가장자리(Right Edge)`로 바꾸어주면 된다. 

![]({{site.imgurl}}/2022-07-30/002.png)

하지만 이러한 속성 수정은 일종의 PDF 편집 기능에 해당한다. 따라서 Acrobat Standard나 Pro 등 편집기능이 있는 유료 버전을 사용하면 간단히 수정할 수 있지만, Acrobat Reader와 같이 PDF 편집 기능이 없는 무료 버전의 경우 아래와 같이 속성 수정 기능이 비활성화 되어 있다. 히브리어 버전에는 좌우 위치 바꾸기 메뉴가 있다고 하지만 써 보지 않아서 모르겠다. 

![]({{site.imgurl}}/2022-07-30/003.png)

## REF

* [How can I keep page order right-to-left on two-page view?](https://answers.acrobatusers.com/How-I-page-order-left-page-view-q2723.aspx)

