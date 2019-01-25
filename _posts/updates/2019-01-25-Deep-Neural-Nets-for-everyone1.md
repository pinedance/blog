---
layout: post
title:  "Deep Learning 기초1 (ML 기초)"
categories: ML
use_math: True
---

김성훈 교수님의 "모두를 위한 머신러닝/딥러닝 강의(시즌1)"를 듣고 내용을 정리해 둔다. 문서 가장 아래 적어 둔다.

이제부터 야자체로 적을거야. 내가 강의를 들으면서 생각한 것들 말이야. 전공도 아니고 공부도 짧아. 틀리는 내용도 좀 있을거야. 만약 보게된다면 주의해 주기 바래.

## Introduction

보통 어떤 분야를 시작하기 전에 그 분야가 뭘 하는 것인지, 무엇을 위한 것인지, 누가 어떻게 만들었고 발전해 왔는지를 알면 큰 줄기를 알 수 있어.

### What is Machine learning

> Field of study that gives computers the ability to learn without being explicitly programmed _ Arthur Samuel (1959)

Machine Learning（ML）은 뭘 하는 것일까. 이 개념을 처음 만든 사람이 Arthur Samuel이라는 사람이야. 없던 개념을 만들거나 모호한 개념을 확정한다는 것은 대단한 식견이 있어야 가능한거야. 그래서 나는 이런 사람들은 개념을 만든 것 자체만으로도 대단한 업적을 남긴 것이라고 생각해.

처음 시작은 이런 거야. 컴퓨터에게 일을 시키고 싶은데, 이녀석이 단순해서 일일이 하나하나 설명해 줘야만 하는거야. 하지만 내가 편하려고 쓰는 건데 일일이 설명해 주려니 싫지. 니가 좀 알아서 해주면 얼마나 좋겠어. 그래서 생각해 낸 것이 ML이야. 난 귀찮으니까 내가 데이터만 넣어줄께. 그러면 너 혼자 익혀서 일 좀 하라는 거지.

> In general, a learning problem considers a set of n samples of data and then tries to predict properties of unknown data _ [An introduction to machine learning with scikit-learn](https://scikit-learn.org/stable/tutorial/basic/tutorial.html)

현실 세계에서 ML은 무엇을 위해 사용될까. 잘 몰랐던 사실을 발견하거나 새로운 인사이트를 얻는 등의 목적도 있지만, 가장 중요한 목적은 바로 예측이야. 새로운 값이 주어졌을 때 적당한 답을 말해주고, 과거와 현재를 바탕으로 미래에 대해 이야기해 달라는거지. 우리가 ML이라는 분야를 공부하는 것이 바로 예측을 하기 위해서라는 거지.

예측을 하면 뭐가 좋은데? 예측할 수 있게 되면 두려워하지 않아도 되고 통제할 수 있게 되지. 사실 인류가 철학을, 종교를, 과학을 발전시켰던 이유도 따지고 보면 예측하고 이해해서 마지막에는 통제하고 싶어서야. 따지고 보면 ML도 통제라는 인간의 근본적인 욕구의 발현 가운데 하나인 셈이지.

자, ML은 예측을 위한 거야. 그러기 위해 기계 스스로 학습했으면 좋겠어. 그게 ML이야. 그런데 그냥 학습해 하고 말하고 끝내면 좋겠지만, 아무리 생각해도 학습할 데이터 정도는 주고 시켜야 할 것 같아. 그리고 어떤 식으로 배우라는 것도 이야기 해 주어야겠지.

### What is learning

▶ Supervised Learning : learninig with labeled examples ( training set )
* Regression
* binary Classification
* multi-label Classification

▶ Unsupervised Learning : learning with un-labeled data
* clustering
* density estimation
* dimension reduction

구분을 이렇게 하기는 하는데, 고급기술들은 대부분 Supervised Learning에 대한 것이야. Unsupervised Learning은 답안이 없는 연습 문제와 같은거지. 풀어도 맞는지 틀리는지 알 수가 없어. 그래서 평가를 못해. 난처하지. 그래서 예측 보다는 데이터를 관찰하는데 더 많이 쓰이는 것 같아.

### Data

우리가 만나는 데이터는 대부분 수치형 데이터나 범주형 데이터야. 그러니까 수치를 예측하는 문제가 있을 수 있고, 범주를 예측하는 문제가 있을 수 있어. 전자가 `Regression`이고 후자가 `Classification`이야.

데이터 측면에서 따져보자. 우선 학습을 위해 정답이 있는 학습 데이터가 필요해. `training set`이라고 해. 일종의 연습문제 같은거야. 그리고 본래 궁금한 물음이 있겠지. `test set`이라고 해. 본시험 같은 거지. 하지만 연구에서는 학습 성능을 따져보기 위해 test set도 정답을 가지고 있는 경우가 많아.

학습은 어떤 조건에 대한 답을 찾아내는 거야. 조건은 주어지는 거고 답은 찾아낼 대상이지. 함수에서 `독립변수` `종속변수` 하는 거랑 같은거야. 그래서 전자를 `x`, 후자를 `y`라고 해. 때때로 후자를 `target`이라거나 `label`이라고 하기도 해.

|  Data Set    |  입력값   |  관찰값   |  출력값<small>（예측값）</small>   |
|:------------:|:--------:|:--------:|:---------:|
| Training Set | $X$      | $Y$      | $\bar{Y}$ |
| Test Set     | $X$      | $Y$      | $\bar{Y}$ |

## How Do Machines Learn

![]({{site.imgurl}}/2019-01-25/002MLsummary.png)

자, 이제 학습 방법에 대해 살펴볼꺼야. 먼저 큰 그림을 보자.

학습을 할 때는 크게 학습 대상에 대한 와꾸가 짜여져 있어야 해. 농구를 배우는 거랑 피아노를 배우는 거랑은 다르지. 수학을 공부하는 거랑 영어를 공부하는 것도 달라. 하지만 영어를 잘 배워 놓으면 독일어를 더 편하게 배울 수 있어. 이처럼 배움에는 어떤 틀이 필요하지. 이걸 `Model`이라고 해. 예를 들어 1, 2, 3 다음에 뭐지? 했을 때 4라고 한다면 이건 `선형 모델`로 와꾸를 짜고 있어서 그런거야. 현실 세계에 수치형 데이터들은 선형모델에 적합한 경우가 많아. 그래서 ML에서 선형모델을 기본으로 하고 있지. 이게 데이터가 이런 와꾸를 가지고 있다는 `가정`이기도 하기 때문에 아래에서는 `Hypothesis`라고 할꺼야.

다음으로 중요한 것은 일단 해보고, 정답과 맞춰보고, 차이를 줄여 다시 해 보고, 다시 정답과 맞춰보고 .... 이런 과정을 반복하는 거지. 기계도 비슷해. 그럼 정답과의 `차이`를 정량화 할 수 있어야해. 그리고 이것을 모니터링 하면서 줄여나가는 방향으로 학습을 진행해야 하지. 이 차이는 함수를 함수로 구현한 것을 `Loss Function` 또는 `Cost Function`이라고 해. 학습의 목적이 된다고 해서 `Objective Function`이라고도 하지. 아래 설명에서는 같은 것을 가리킨다고 봐도 좋아.

정리하면 이런거야. 먼저 데이터가 어떤 식으로 변해 갈거라는 가정（`Hypothesis`）이 필요해. 그 가정을 통해 수식을 만들어 값을 예측해 낼거야. 그러면 처음의 수식을 개선하기 위해 예측해 낸 값（$\bar{y}$）과 실제값（$y$）의 차이를 측정해야 해（`Loss Function`）.  그러면 우리는 이 차이를 좁혀나가는 방식으로 예측하는 수식을 개선해 나가는거야. 수식을 개선한다는 것은 정해진 와꾸가 있기 때문에 사실상 상수값을 조정하는 거야.

주어진 데이터와 예측 목적에 따라 이 `Hypothesis`와 `Cost Function`이 조금씩 달라져. 이걸 중심으로 방법들을 살펴보자. 

### Linear Regression

▶ __DATA__
* Training Set
  - X : 수치형 자료
  - Y : 수치형 자료
* Test set
  - X : 수치형 자료
  - Y : __예측 목표__

▶ __Hypothesis__ (Linear)
* 주어진 데이터는 1차 함수（linear）로 표현될 수 있다.

$$
H_L(x) = \bar{Y} = Wx + b
$$

▶ __Objective Function__
* Cost Function (loss function)이 된다.
* 추정값과 실제값 사이의 차이（각각을 제곱해 평균）이다.

$$
cost(W,b) = {1 \over m} \sum_{i=1}^m { (\bar{Y} - y_i)^2 }
$$

▶ __Optimization Goal__
* $cost(W,b)$를 최소로 하는 W, b를 구하는 문제!
* $cost(W,b)$ 함수는 아래로 볼록한（Convex） W에 대한 2차 함수이므로
* W를 갱신하면서 기울기가 작아지는 쪽（미분 사용）으로 W를 찾아나간다.
* 이것이 `Gradiant descent algorithm`이다.
* 여기서 $\alpha$가 `learning rate`이 된다. 보통 0.01로 시작한다.

![]({{site.imgurl}}/2019-01-25/001convex.png)

$$
\begin{matrix}
W := W - \alpha { \partial \over \partial W } cost(W)\\
W := W - \alpha {1 \over m} \sum_{i=1}^m { ( Wx_i - y_i ) x_i }
\end{matrix}
$$


### Linear Regression (일반화)

위의 문제를 Multi variable의 문제로 일반화 시킬 수 있다.

* Hypothesis : $H(x_1,x_2,...,x_n) = w_1x_1+w_1x_1+ ... +w_nx_n + b$
* Object Function : $cost(W,b) = {1 \over m} \sum_{i=1}^m { (H(x_{1i}, x_{2i}, ...,x_{ni}) - y_i)^2 }$

다항식은 Matrix로 표현할 수 있다.

$$
\begin{pmatrix}
x_{11} &  x_{12} & x_{13} \\
x_{21} & x_{22} & x_{23} \\
...\\
x_{n1} & x_{n2} & x_{n3} \\
\end{pmatrix}
\bullet
\begin{pmatrix} w_1 \\ w_2 \\ w_3  \end{pmatrix}
= \begin{pmatrix}
x_{11}w_{1} + x_{12}w_{2} + x_{13}w_{3} \\
x_{21}w_{1} + x_{22}w_{2} + x_{23}w_{3} \\
...\\
x_{n1}w_{1} + x_{n2}w_{2} + x_{n3}w_{3} \\
\end{pmatrix}
= \begin{pmatrix}
\bar{y}_{1} \\
\bar{y}_{2} \\
...\\
\bar{y}_{n} \\
\end{pmatrix}
$$

* training set
  - 입력값（x）의 Shape : X[n, `3`] （개수는 $n$개, 변수는 $3$개 ）
  - 출력값（y）의 Shape : Y[n, `1`]
* Weight의 Shape : W[`3`,`1`]
  - 3은 입력값의 column 개수, 1은 출력값의 column 개수라고 할 수 있다.
  - 3차원 vector를 1차원으로 축소하는 선형 변환을 의미한다.
  - ∴ Weight의 차원을 보면, x와 y의 shape을 알 수 있다.

그러므로 위의 식은 Matrix를 이용하여 아래와 같이 쓸 수 있다.

* Hypothesis : $H_L(X)= \bar{Y} = XW $
* Objective Function : $cost(W) = {1 \over m} \sum (\bar{Y}-y)^2 = {1 \over m} \sum (XW-y)^2$
* Gradient desent : $W := W - \alpha { \partial \over \partial W } cost(W)$

### Logistic Regression (Binary Classification)

▶ __DATA__
* Training Set
  - X : 수치형 자료
  - Y : 범주형 자료 ( binary의 경우 0 or 1)
* Test set
  - X : 수치형 자료
  - Y : __예측 목표__

▶ __Hypothesis__
* 주어진 데이터는 0에서 1 사이의 값을 갖는 [sigmod](https://en.wikipedia.org/wiki/Sigmoid_function) 형태（[graph@desmos.com](https://www.desmos.com/calculator/rlzazkuauz)）로 표현될 수 있다.
* 여기서 $g(Z)$는 `activation function`에 해당한다.

$$
\begin{matrix}
H_L(x) = Z = XW + b\\
g(Z) = { 1 \over 1 + e^{-z} }\\
H_R(x) = g(Z) = g( H_L(x) )
\end{matrix}
$$

$$
∴ H_R(x) = \bar{Y} = { 1 \over { 1 + e^{-Z(x)} } }
= { 1 \over { 1 + e^{-XW} } }
$$

▶ __Objective Function__
* graph가 convex한 형태가 되는 function을 찾아야 한다.
* 거리에 제곱을 하는 대신 거리에 log를 취한다. （본래의 식이 지수함수이므로） [graph@desmos.com](https://www.desmos.com/calculator/ac4rpg8cky)

$$
cost( \bar{y},y ) =
\begin{cases}
-log( \bar{y}-0 ) : y = 0\\
-log( 1-\bar{y} ) : y = 1
\end{cases}
$$

$$
cost( \bar{y},y ) = - y\log( \bar{y} ) - (1-y)\log(1-\bar{y})
$$

$$
∴ cost( W ) = -{1 \over m } \sum { y\log( H(x) ) + (1-y)\log(1-H(x)) }
$$


▶ __Optimization Goal__
* $cost(W,b)$를 최소로 하는 W, b를 구하는 문제!
* cost function이 convex한 형태이므로, 역시 `Gradiant descent algorithm`으로 해결할 수 있다.


### Softmax Classification (Multinomial Classification)

▶ __DATA__
* Training Set
  - X : 수치형 자료
  - Y : 범주형 자료 ( Multinomial의 경우 k개의 범주)
* Test set
  - X : 수치형 자료
  - Y : __예측 목표__

▶ __Hypothesis__
* Logistic Classifier를 여러다발로 묶어 사용하는 문제로 볼 수 있다.
* 각각의 Logistic Classifier에 대한 Weight이 따로 생성되어야 한다. class의 개수 만큼의  column vector를 가지는 matrix W가 필요하다.
* train data set의 개수가 n, class의 종류가 A, B, C 등 K까지라면, 각각의 column vector（$[w_{1J}, w_{2J}, w_{3J}]$）들은 Logistic Classifier에 해당한다.

$$
XW = \bar{Y}
$$

$$
\begin{pmatrix}
x_{11} & x_{12} & x_{13} \\
x_{21} & x_{22} & x_{23} \\
...\\
x_{n1} & x_{n2} & x_{n3} \\
\end{pmatrix}
\bullet
\begin{pmatrix}
w_{1A} & w_{1B} & ... & w_{1K} \\
w_{2A} & w_{2B} & ... & w_{2K} \\
w_{3A} & w_{3B} & ... & w_{3K} \\
\end{pmatrix}
=\begin{pmatrix}
\bar{y}_{1A} & \bar{y}_{1B} & ... &  \bar{y}_{1K} \\
\bar{y}_{2A} & \bar{y}_{2B} & ... &  \bar{y}_{2K} \\
...\\
\bar{y}_{nA} & \bar{y}_{nB} & ... & \bar{y}_{nK} \\
\end{pmatrix}
$$

* 예측값（$\bar{Y}$）의 row vector（$[\bar{y}_{iA}, \bar{y}_{iB}, ..., \bar{y}_{iK}]$）는 i번째 클래스에 해당할 Score라고 볼 수 있다. 즉 가장 높은 값에 해당하는 클래스일 가능성이 가장 크겠다.
* 현재 score 값인 row vector의 값을 0에서 1사이의 확률 값으로 바꾸어 주기 위해 `Softmax Function`을 사용한다.
* 만약 $\bar{Y}$의 row vector가 `[2.0, 1.0, 0.1]`이라면, Softmax Fucntion을 통해 `[0.7, 0.2, 0.1]`의 확률값을 얻을 수 있다. （합계가 1이 된다） 이때 0.7이 가장 큰 값이 되므로 첫번째 class가 예측값이 된다.
* 여기서 `Softmax Function`은 `activation function`에 해당한다.

$$
S(y_i) = { e^y_i \over \sum {e^y_i} }
$$

▶ __Objective Function__
* `Cross-entropy cost function`을 사용한다. [graph@desmos.com](https://www.desmos.com/calculator/qm4yagr6r6)

$$
cost( H(x),y ) = D(\bar{Y}, Y) = - \sum_i^k { y_i \log( \bar{y} ) }
$$

* $\bar{Y}$ = `[0.7, 0.2, 0.1]`이고 $Y$ = `[1.0, 0.0, 0.0]`이라면 $cost$는 다음과 같이 된다.

$$
cost = - ( 1 \times \log(0.7) + 0 \times \log(0.2) +  0 \times log(0.1) )
$$

* 전체 데이터에 대해서 Cost Function은 다음과 같다.

$$
\begin{matrix}
cost( \bar{Y},y ) = {1 \over N} \sum_i { D(\bar{Y}, Y)  }\\
cost( H(x),y ) = {1 \over N} \sum_i { D(H(x_i), y_i)  }\\
\end{matrix}
$$

$$
cost( H(x),y ) = {1 \over N} \sum_i { D( S(wx_i + b), y_i)  }\\
$$

▶ __Optimization Goal__
* $cost(W,b)$를 최소로 하는 W, b를 구하는 문제!


### 주의사항

▶ __Learning Rate__
* too large learning rate → overshooting
* too small learning rate → stops at local minimum
* 보통 `0.01`로 놓고 학습 상태를 보아가며 조절한다.

▶ __Data Preprocessing__
* 입력데이터 X의 변수에 따라 scale이 상이하면 학습이 잘 이루어지지 않으므로, scale을 맞춰준다.
* `z- value`를 많이 사용한다.

$$
\acute{x}_{ij} = { {x_{ij} - \mu_j} \over \sigma_j }
$$

▶ __Overfitting__
* More training data
* Reduce the number of features
* Regularization
  - $\lambda$ : Regularization strength
  - $\lambda$가 0이면 Regularization을 쓰지 않는 것

$$
\acute{cost} = cost + \lambda \sum W^2
$$



## Acknowledgement

모두를 위한 머신러닝/딥러닝 강의
* [프로젝트 페이지](http://hunkim.github.io/ml/)
* [동영상 보기](https://www.youtube.com/playlist?list=PLlMkM4tgfjnLSOjrEJN31gZATbcj_MpUm)

[Scikit-learn Documents](https://scikit-learn.org/stable/documentation.html)

다크 프로그래머
* [최적화 기법의 직관적 이해](https://darkpgmr.tistory.com/149)

[Deepest 문서방](https://deepestdocs.readthedocs.io/en/latest/)
