---
layout: post
title:  "공기어(collocation) 문제에서 g-Score와 p-Value"
categories: ["NLP"]
use_math: True
---

## 배경

NLP(Natural Language Processing)의 여러 task 가운데 [collocation](https://en.wikipedia.org/wiki/Collocation) 문제가 있다. 공기어(co-occurrence) 혹은 연어(collocation)를 찾아내는 과제이다. 즉, 인접하는 단어가 함께 하나의 의미를 나타내는 경우를 찾아내는 문제이다.

보통 공기어의 출현 빈도를 정량화(점수)하여 평가하는 방식을 사용한다. 정량화 방법에는 여러가지 있지만 t-score가 일반적으로 많이 사용된다. 일반적인 t-test는 정규성을 만족해야 의미를 가지지만, NLP 문제에서는 정규성이 인정되지 않기 때문에 t-score값은 순위를 표시할 뿐 확률값을 알려주지는 못한다.

이런 문제 때문에 g-Score가 거론된다.

## g-Score

g-Score는 Dunning’s log-likelihood, g2-Value 등으로도 불리우는데, g-Test를 위해 산출된 값이다.

[g-Test](https://en.wikipedia.org/wiki/G-test)는 두 범주형 변수의 독립성을 비교하는 방법으로 chi-squared Test를 대신하기 위해 제안되었다. chi-squared Test는 관찰빈도와 기대빈도 사이의 유클리디안 거리로 해석될 수 있다. 하지만 이 거리는 샘플 크기에 영향을 많이 받는다(Sample Size Effects). 이런 문제를 극복하기 위해 g-Test가 권장되고 있다.

한편, g-Test와 chi-squared Test는 모두 적합도(goodness of fit)를 검정하는 방법이다. 접합도라는 것은 모델에 얼마나 잘 fitting 되었는가를 살피는 것으로, 모델에 의해 기대된 값과 실재로 관측된 값 사이의 차이를 보게 된다. 적합도 검정에 대해서는 [이 글](http://blog.naver.com/leerider/220168446210)을 참조해 보자.

## g-Score의 도출

g-Score는 chi-Score에 비해 샘플 사이즈에 영향을 덜 받으며, 또한 p-Value를 도출해 낼 수 있다는 장점이 있다. 아래와 같이 구할 수 있다.

* $O$ : observed value (observed frequency)
* $E$ : expected value (expected frequency)

|        | TERMa | TERM^a | MARGIN  |
|:------:|:-----:|:------:|:--------:|
|  TERMb | $O_{ab}$ | $O_{\lnot a b}$  | $B$ |
| TERM^b | $O_{a \lnot b}$ | $O_{\lnot a \lnot b }$ | $S-B$ |
| MARGIN |   $A$   |  $S-A$   |  $S$  |

관찰값을 바탕으로 기대값을 구할 수 있다. 예를 들어 $E_{ab}$는 아래와 같이 구한다.

$$
E_{ab} = S\left(\frac{A}{S}\right)\left(\frac{B}{S}\right)
$$

|        | TERMa | TERM^a | MARGIN  |
|:------:|:-----:|:------:|:--------:|
|  TERMb | $E_{ab}$ | $E_{\lnot a b}$  | $B$ |
| TERM^b |  $E_{a \lnot b}$  |   $E_{\lnot a \lnot b}$  | $S-B$ |
| MARGIN |   $A$   |  $S-A$   |  $S$  |

이 때 g-Value는 다음과 같다.

$$
\begin{alignat}{2}
G  =  \; -2 \sum_{i=1}^m O_i \ln\left(\frac{E_i}{O_i}\right) \\
   =      2 \sum_{i=1}^m O_i \ln\left(\frac{O_i}{E_i}\right)
\end{alignat}
$$

여기서 $O_{ab}$와 $E_{ab}$의 관계가 가장 중요하다. 그런데 이 두 값은 $S$에 비해 매우 작을 뿐만 아니라 다른 $O_{\lnot a b}$, $O_{a \lnot b}$, $O_{\lnot a \lnot b }$에 비해서도 매우 작다.

따라서 값을 모두 더하는 위의 공식은 포아송 분포(Poisson distribution)를 가정하였을 때 $O_{ab}$와 $E_{ab}$의 값만으로 아래와 같은 근사 공식으로 대신할 수 있다. 근사공식의 도출 방법은 Stefan Ever의 연구에 보인다.

$$
G  \thickapprox  \; 2 \left( O_{ab} \ln\left(\frac{O_{ab}}{E_{ab}}\right) - ( O_{ab} - E_{ab} ) \right)
$$

g-Score는 $O_{ab}$와 $E_{ab}$의 차이가 클 수록 커진다. $O_{ab}$가 $E_{ab}$보다 큰 경우에도 값이 커지지만, $O_{ab}$가 $E_{ab}$보다 작은 경우에도 값이 커진다. 그러나 공기어 문제에서는 $O_{ab}$가 $E_{ab}$보다 큰 경우에만 관심이 있다. 따라서 $O_{ab} < E_{ab}$인 경우에는 $O_{ab} > E_{ab}$와 구분하기 위해 g-Score에 -1을 곱하는 것이 좋다. 즉, 최종 g-Score는 다음과 같다.

$$
\text{g-Score}  =  \; \begin{cases}
   G, & \text{if } O_{ab} \geq E_{ab} \\
   -G, & \text{if } O_{ab} < E_{ab}
  \end{cases}
$$


## g-Score의 p-Value

Ted Dunning의 "Accurate Methods for the Statistics of Surprise and Coincidence"에 따르면, 텍스트 collocation의 경우, g-Score 값은 자유도1의 chi-squared 분포에 근사한다.

자유도1의 chi-squared 분포에서 p-Value가 0.05일 때 chi-score는 약 3.838이다. ( 확인은 [여기](http://www.statdistributions.com/chisquare?p=0.05&df=1)에서 ) 즉, g-Score가 3.838 이상인 사건은 상위 5%에 해당할 만큼 희소한 확률을 가진다. 이와 관련하여 더 자세한 내용은 [여기](http://ucrel.lancs.ac.uk/llwizard.html)에 있다. 

p-Value에 따른 g-Score 값은 아래와 같다.

* 95th percentile; 5% level; p < 0.05; critical value = 3.84
* 99th percentile; 1% level; p < 0.01; critical value = 6.63
* 99.9th percentile; 0.1% level; p < 0.001; critical value = 10.83
* 99.99th percentile; 0.01% level; p < 0.0001; critical value = 15.13

보통 공기어 문제에서는 g-Score가 높은 경우가 많이 나타난다. 따라서 hueristic하게 g-Score의 cutoff 기준을 정해야 할 때는 g-Score 10.83 (p-Value 0.001 )에서 시작하는 것이 좋다. 

## REF

이상의 내용을 뒷받침하는 주요한 논문 또는 자료는 다음과 같다.

* [Dunning, T. (1993). Accurate Methods for the Statistics of Surprise and Coincidence. Computational Linguistics, 19, 1, March 1993, pp. 61-74.](https://www.aclweb.org/anthology/J93-1003/)

* Rayson, P. and Garside, R. (2000). Comparing corpora using frequency profiling. In proceedings of the workshop on Comparing Corpora, held in conjunction with the 38th annual meeting of the Association for Computational Linguistics (ACL 2000). 1-8 October 2000, Hong Kong, pp. 1 - 6.

* [Stefan Ever. (2007). Corpora and collocations. Corpus Linguistics. An International Handbook 2, 1212–1248.](http://www.stefan-evert.de/PUB/Evert2007HSK_extended_manuscript.pdf)

* [SAS® Help Center / g-Score](https://documentation.sas.com/doc/en/tmhpprcref/15.2/tmhpprcref_hpboolrule_details06.htm)