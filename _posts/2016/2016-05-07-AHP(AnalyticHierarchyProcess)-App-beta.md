---
layout: post
title:  "AHP로 결정장애 극복해 보자!"
categories: code
---

![](http://s5.postimg.org/rpxwtq7hj/ahp_App.png)

[app 바로가기](https://pinedance.github.io/spa/ahp/ahp.html)

### 야호~!

전부터 만들고 싶었던 [ahp app](https://pinedance.github.io/spa/ahp/ahp.html)을 만들어 보았다. 바로 AHP (Analytic Hierarchy Process)로 결과를 도출해 주는 어플이다. 

AHP는 선택지들을 쌍대비교(pairwise comparison)하여 최종적으로 내가 원하는 것이 무엇인지 찾아가는 결정 방법론 가운데 하나이다. 쌍대비교는 예전에 모 방송국에서 했던 "이상형 월드컵"을 떠올리면 쉽다. 여러개를 한 번에 비교하는 것이 아니라 둘 씩 짝지어 비교하는 것이다. 

듣기로 미국에서는 정부에서 중요한 결정을 할 때 이 방법론을 통해 위원들이 내리는 결정의 신뢰성을 파악하고 결정에 공정을 기한다고 한다. 우리나라에도 기업이나 정부에 도입하려는 시도가 있었으나 윗분들이 싫어하셔서 실패하였다고 ...  

이 방법에 대해서는 이름만 알고 있었는데, [양군님의 블로그 글](http://egloos.zum.com/yjhyjh/v/33462)과 wiki의 [설명](https://en.wikipedia.org/wiki/Analytic_hierarchy_process)과 [예시](https://en.wikipedia.org/wiki/Analytic_hierarchy_process_%E2%80%93_car_example)를 참고하여 가닥을 잡을 수 있었다. 이쪽으로 문외한이고 영어도 잘 못하여 고생 좀 했다. 

인류 최대의 난재인 "오늘 점심은 무엇을 먹지?"부터, 이상적인 이성에 대한 질문까지 사용 범위는 무재한이다. 

다만 선택지가 너무 많으면 쌍대비교를 무척 많이 해야 하기 때문에 주의해야 한다. 

### 사용법

나름 직관적으로 만든다고 만들었는데 어떨지 모르겠다. 

1. `어떤 문제(Goal)`인지 정하고,
2. 나에게 주어진 `선택지(Alternatives)`를 선정한 뒤에
3. `선택 기준(Criterias)`을 상정한다. 

예를 들면 이렇다. 

	Goal : 오늘 점심은 무엇을 먹지?
	Alternatives : 짜장면, 국밥, 샌드위치
	Criterias : 맛, 값, 거리

app에는 Criterias를 2번째 입력하게 되어 있으니 주의하자. 

각각을 입력난에 입력이 끝나면 버튼을 눌러 결정을 진행해 나가면 된다. 

1) 기본적으로 쌍대비교이기 때문에 더 좋은 것을 선택하고, 다음으로 2)얼마나 좋은지 입력한다. `얼마나 좋은지`에 대한 기준은 대략 다음과 같다.

* 1 : 둘을 똑같이 선호한다.
* 3 : 중간 정도 더 선호한다.
* 5 : 강하게 더 선호한다.
* 7 : 아주 강하게 더 선호한다.
* 9 : 절대적으로 더 선호한다.

### 부탁

사실 AHP를 잘 알고 만든 것은 아니라 걱정이 되기는 하다. 계산 오류 등 app의 문제에 대해서는 [github issue](https://github.com/pinedance/spa/issues)로 알려주면 좋겠다. 



