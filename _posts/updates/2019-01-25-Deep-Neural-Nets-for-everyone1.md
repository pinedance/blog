---
layout: post
title:  "Deep Learning 기초1 (ML 기초)"
categories: ML
use_math: True
---

김성훈 교수님의 "모두를 위한 머신러닝/딥러닝 강의(시즌1)"를 듣고 내용을 정리해 둔다. 문서 가장 아래 적어 둔다.

## Introduction

### What is Machine learning

> Field of study that gives computers the ability to learn without being explicitly programmed
> _ Arthur Samuel (1959)

※ 머신러닝의 목적 : 예측(predict)!

> In general, a learning problem considers a set of n samples of data and then tries to predict properties of unknown data
> _ [An introduction to machine learning with scikit-learn](https://scikit-learn.org/stable/tutorial/basic/tutorial.html)

### What is learning

Supervised Learning : learninig with labeled examples ( training set )
* Regression
* binary Classification
* multi-label Classification

Unsupervised Learning : learning with un-labeled data
* clustering
* density estimation
* dimension reduction

## Machine Learning

|  Data Set    |  입력값   |  관찰값   |  출력값<small>（예측값）</small>   |
|:------------:|:--------:|:--------:|:---------:|
| Training Set | $X$      | $Y$      | $\bar{Y}$ |
| Test Set     | $X$      | $Y$      | $\bar{Y}$ |



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

![](assets/img/2019-01-25/001convex.png)

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

## Sumary

 ![](assets/img/2019-01-25/002MLsummary.png)


## Acknowledgement

모두를 위한 머신러닝/딥러닝 강의
* [프로젝트 페이지](http://hunkim.github.io/ml/)
* [동영상 보기](https://www.youtube.com/playlist?list=PLlMkM4tgfjnLSOjrEJN31gZATbcj_MpUm)

[Scikit-learn Documents](https://scikit-learn.org/stable/documentation.html)

다크 프로그래머
* [최적화 기법의 직관적 이해](https://darkpgmr.tistory.com/149)

[Deepest 문서방](https://deepestdocs.readthedocs.io/en/latest/)
