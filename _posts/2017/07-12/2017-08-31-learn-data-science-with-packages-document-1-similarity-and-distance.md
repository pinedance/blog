---
layout: post
title:  "Package 공식문서로 배우는 Data Science 01 : similarity and distance"
categories: Research
---

> Package의 Official Document를 단서로 Data Science를 배워보자. 



## Backgound

전공을 하지 않은 분야에 대해 체계적인 지식을 얻는 것은 매우 어렵다. 대부분 해당 분야 사람들이 기본으로 여기는 textbook이 있기 마련이지만 비전공자는 그것을 알아내는 것 부터 쉽지 않다. 게다가 알아낸 뒤에도 자료의 내용이 어려워 독학하기 만만치 않다. 

나 역시 Data Science, 특히 Text Mining에 관심이 생기고 부터 이런 저런 자료들을 찾아 공부하고 있지만, 쉽지 않았다. 워낙 광범위하고 깊은 분야이기도 하거나와 내 수준에 맞는 자료를 찾는 일, 자료의 옥석을 가리는 일에 많은 시간을 소비하고 있다. 

자료를 익힌 뒤에도 문제는 남는다. 대부분의 설명들은 중립적으로 적혀 있기 때문에 실제로는 어떤 것을 `주로` 적용하는지 알기 어렵다. 즉, 방법이나 parameter의 우선순위를 알기 어렵다는 것이다. 

다행히 Data Science의 경우에는 전문가들이 만들어 놓은 package들이 많이 있다. 이 package들에는 만든 전문가들의 생각이 자연스럽게 들어가는데, 이를 통해 좀 더 실무적인 단서를 찾을 수 있다. 따라서 web에서 package 예문만 가져다 쓰지 말고 해당 package의 official document를 살펴보는 편이 도움이 된다. package 사용법(입출력 데이터 형태 등)과 parameter 설명(특히 default value를 살필 것)을 살펴보면 좀 더 피부에 와 닿는 느낌을 얻을 때가 있다. 



## Similarity and Distance

Text Mining에서 많이 쓰이는 Vector Space에서 Similarity와 Distance를 구하는 방법을 살펴보자. 



###  [R stats::dist](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/dist.html)

기본 package이다. measure method로는 `["euclidean", "maximum", "manhattan", "canberra", "binary", "minkowski"]`를 지원하고 있다. 이런 방법들이 기본적으로 중요한 방법들이며, 이 가운데 특히 `euclidean distance`가 대표적인 방법이라는 점을 추측할 수 있다. 설명문서에는 각 method들의 의미와 계산법도 같이 나온다. `euclidean`의 경우 다음과 같이 설명되어 있다.  

> Usual distance between the two vectors (2 norm aka L_2), sqrt(sum((x_i - y_i)^2)).

Missing values, `Inf` values 등이 섞여 있는 row는 계산에서 제외된다는 설명을 통해 데이터에서 이런 값들이 있는지 신경써야 한다는 점도 알 수 있다. 



### [R proxy::dist](http://finzi.psych.upenn.edu/library/proxy/html/dist.html)

기능이 더 강화된 package이다. 내부 모습은 [이렇다](https://github.com/cran/proxy/blob/master/R/dist.R)

다음의 설명을 통해 거리(distance)와 유사도(similarity)를 변환하는 기본적인 방법을 알 수 있다. 

> default: pr_simil2dist(d) = 1 - s and pr_dist2simil(s) = 1 / (1 + d)

다양한 method 들에 대해서도 R console에서 `summary(pr_DB)`를 실행해 보면 알 수 있다. 


### python::scipy

python scipy의 경우 아래와 같이 위치하고 있다. 

sciPy > Spatial algorithms and data structures (scipy.spatial) > [scipy.spatial.distance](https://docs.scipy.org/doc/scipy/reference/spatial.distance.html)

크게 대상이 numeric vector인가 boolean vector인가에 따라 measure를 나누어 설명해 놓았다. 지원하는 함수는 다음과 같다. 나열 순서는 abc 순서라 어떤 방법이 더 일반적인지 알 수는 없었다. 세부 링크로 들어가면 어떤 공식을 사용했는지도 확인 가능하다. 

| vector type     | method                                                                                                                                  |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| numeric vectors | [braycurtis](https://goo.gl/2w7Kft), [canberra](https://goo.gl/S53Gbt), [chebyshev](https://goo.gl/iPdvkn), [cityblock](https://goo.gl/yQwRAv), [correlation](https://goo.gl/mcCkiq), [cosine](https://goo.gl/GoJJcn), [euclidean](https://goo.gl/Pk4334), [mahalanobis](https://goo.gl/neiy1f), [minkowski](https://goo.gl/HRCvjx), [seuclidean](https://goo.gl/BBnKJ2), [sqeuclidean](https://goo.gl/2a2GXM), [wminkowski](https://goo.gl/JE3ZeH) |
| boolean vectors | [dice](https://goo.gl/b6TzTp), [hamming](https://goo.gl/M4bo9d), [jaccard](https://goo.gl/BmgDw2), [kulsinski](https://goo.gl/pCN9vN), [matching](https://goo.gl/w8bWrk), [rogerstanimoto](https://goo.gl/9tBBTa), [russellrao](https://goo.gl/9w6yD6), [sokalmichener](https://goo.gl/iLWist), [sokalsneath](https://goo.gl/hVuWCE), [yule](https://goo.gl/ewPrv2)                               |

[pdist()](https://goo.gl/83jm1N)로 pairwise 연산을 수행할 수 있다. parameter에 method 이름을 넣거나 function을 직접 넣어 사용할 수 있다. 기본적으로 지원하는 method는 아래와 같다. 

```
The distance metric to use. The distance function can be ‘braycurtis’, ‘canberra’, ‘chebyshev’, ‘cityblock’, ‘correlation’, ‘cosine’, ‘dice’, ‘euclidean’, ‘hamming’, ‘jaccard’, ‘kulsinski’, ‘mahalanobis’, ‘matching’, ‘minkowski’, ‘rogerstanimoto’, ‘russellrao’, ‘seuclidean’, ‘sokalmichener’, ‘sokalsneath’, ‘sqeuclidean’, ‘yule’
```


### python::scikit

python scikit의 경우 아래와 같이 위치하고 있다. 

sklean > metrics > [sklearn.metrics.pairwise](http://scikit-learn.org/stable/modules/classes.html#module-sklearn.metrics.pairwise)


다소 간략한 편이다. [manhattan_distances](https://goo.gl/LgHvKh), [cosine_distances](https://goo.gl/9aXazS), [euclidean_distances](https://goo.gl/AKDct1) 이렇게 3가지를 지원한다. 
