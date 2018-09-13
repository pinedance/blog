---
layout: post
title:  "Natural Language Processing Overview"
categories: NLP
use_math: True
---


> 자연어처리(Natural Language Processing)의 큰 그림을 그려보자.



## Background

* [NLP의 기본 절차와 Lexical Analysis](https://ratsgo.github.io/natural%20language%20processing/2017/03/22/lexicon/)


## Segmentation

### N-gram

### Dictionary based Tokenization

### Unsupervised  Segmentation

☞ [Unsupervised  Segmentation]({{site.baseurl}}/{% post_url 2018-07-25-Unsupervised-Segmentation %})


## Matrix

### Term-Document Matrix

### Term-Co-occurence Matrix

### 차원축소 (Dimensionality Reduction)

* [SVD와 PCA, 그리고 잠재의미분석(LSA)](https://ratsgo.github.io/from%20frequency%20to%20semantics/2017/04/06/pcasvdlsa/)
* [Dimensionality Reduction (PCA, LDA) / SanghyukChun's Blog](http://sanghyukchun.github.io/72/)

#### PCA (principal component analysis), unsupervised learning

* [PCA / 데이터사이언스스쿨](https://datascienceschool.net/view-notebook/f10aad8a34a4489697933f77c5d58e3a/)
* [R을 활용한 주성분 분석(principal component analysis) 정리 :: Data 쿡북](http://datacookbook.kr/35)

#### LDA (Linear Discriminant Analysis, Fisher’s LDA), supervised learning

#### LSA (Latent semantic analysis)

#### LDA (Latent Dirichelt Allocation)


## Models

### Bag of words

#### Word Weighting

* [Word Weighting(1)](https://ratsgo.github.io/from%20frequency%20to%20semantics/2017/03/28/tfidf/)

* [Word Weighting(2)](https://ratsgo.github.io/from%20frequency%20to%20semantics/2017/04/14/wordweighting/)


### Vector space model

* [idea of statistical semantics](https://ratsgo.github.io/from%20frequency%20to%20semantics/2017/03/10/frequency/)

#### Similarity

* [문서 유사도 측정](https://ratsgo.github.io/from%20frequency%20to%20semantics/2017/04/20/docsim/)

#### Distance


### Generative model

* [언어모델(Language Model)](https://ratsgo.github.io/from%20frequency%20to%20semantics/2017/09/16/LM/)


## Semantics

###  Word Embedding

☞ [Word Embedding]({{site.baseurl}}/{% post_url 2018-08-05-Word-Embedding %})


### Sequence-to-Sequence

* [Sequence-to-Sequence 모델로 뉴스 제목 추출하기](https://ratsgo.github.io/natural%20language%20processing/2017/03/12/s2s/)


## Applications

### Collocations

☞ [Collocations]({{site.baseurl}}/{% post_url 2018-02-03-Collocations %})



### Topic Modeling

* [LSA / PLSA / LDA](https://cs.stanford.edu/~ppasupat/a9online/1140.html)

* [Probabilistic Latent Semantic Analysis](https://ratsgo.github.io/from%20frequency%20to%20semantics/2017/05/25/plsa/)

* [Topic Modeling, LDA](https://ratsgo.github.io/from%20frequency%20to%20semantics/2017/06/01/LDA/)


### Comparing Corpuses

* [Comparing Corpuses by Word Use](http://sappingattention.blogspot.com/2011/10/comparing-corpuses-by-word-use.html)


## Score

### Probability

#### T-score

#### Z-score

#### Chi-Square Statistic (χ2)

관찰값과 기대값 사이의 거리(Distance)

$$
\chi^2=\sum_{k=1}^{n} \frac{(O_k - E_k)^2}{E_k}
$$


#### log-likelihood ratio G2

* [Log-likelihood for comparing texts](http://wordhoard.northwestern.edu/userman/analysis-comparewords.html)

### Information Theory

* [Information Theory / SanghyukChun's Blog](http://sanghyukchun.github.io/62/) Entropy, KL divergence, Mutual information

#### Entropy

#### KL divergence

#### MI (Mutual information)

* [Mutual information / Scholarpedia](http://www.scholarpedia.org/article/Mutual_information)




## Visualization

☞ [Data Visualization]({{site.baseurl}}/{% post_url 2018-04-07-data-visualization %})



## Lectures

☞ [자연어처리 강의들]({{site.baseurl}}/{% post_url 2018-08-07-Lectures-about-NLP %})
