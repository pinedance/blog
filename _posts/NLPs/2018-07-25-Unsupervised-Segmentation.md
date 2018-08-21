---
layout: post
title:  "Unsupervised Segmentation"
categories: NLP
---


## Boundary prediction

### Branching Entropy（BE）를 이용한 방법

* [Accessor Variety & Branching Entropy / lovit](https://lovit.github.io/nlp/2018/04/09/branching_entropy_accessor_variety/)
* ["Branching Entropy"  / ratsgo's blog](https://ratsgo.github.io/from%20frequency%20to%20semantics/2017/05/06/BranchingEntropy/)에 잘 설명되어 있다.

library
* [Unsupervised tokenizers in soynlp project](https://lovit.github.io/nlp/2018/04/09/three_tokenizers_soynlp/)

## WordRank

[KR-WordRank, 토크나이저를 이용하지 않는 한국어 키워드 추출기](https://lovit.github.io/nlp/2018/04/16/krwordrank/)

Articles
* [A Simple and Effective Unsupervised Word Segmentation Approach](https://pdfs.semanticscholar.org/9a55/a63ce8fc4d9723db92f2f27bcd900e93d1da.pdf)
* [KR-WordRank : WordRank를 개선한 비지도학습 기반 한국어 단어 추출 방법](https://goo.gl/nQ3s2E)

Library
* [wordseg_wordrank](https://github.com/lishouguang/wordseg_wordrank) in python 

### 기타

* Mutual Information (MI) / Sun, Shen, and Tsou (1998)
* WordEnds / Fleck (2008)
* Minimum Description Length (MDL) criterion and local statistics BE / Zhikov, Takamura, and Okumura (2010)

## Word recognition

### Accessor Variety

library
* [Unsupervised tokenizers in soynlp project](https://lovit.github.io/nlp/2018/04/09/three_tokenizers_soynlp/)

### Cohesion Probability를 이용한 방법.

* [Cohesion score + L-Tokenizer / lovit](https://lovit.github.io/nlp/2018/04/09/cohesion_ltokenizer/)
* ["Cohesion Probability"  / ratsgo's blog](https://ratsgo.github.io/from%20frequency%20to%20semantics/2017/05/05/cohesion/)에 잘 설명되어 있다.

library
* [Unsupervised tokenizers in soynlp project](https://lovit.github.io/nlp/2018/04/09/three_tokenizers_soynlp/)

### 기타

* Description Length Gain (DLG) / Kit and Wilks (1999)
* Dirichlet Process (DP) and Hierarchical Dirichlet Process (HDP) /  Goldwater, Griffiths, and Johnson (2006)


## Word Embeadding

### Deeplearning을 이용한 방법

[tutorial](https://github.com/rockingdingo/deepnlp/blob/master/README.md#tutorial)

library
* [Deepnlp package](https://github.com/rockingdingo/deepnlp/blob/master/README.md#segmentation)에
