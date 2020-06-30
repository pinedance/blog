---
layout: post
title:  "Apply Functional Way to Your Code"
categories: 코딩삽질기
tags: ['ruby', 'python', 'javascript', 'r']
---

평소 Functional Programming(FP)에 관심이 있었다. FP 정신을 가장 잘 구현했다고 알려진 [haskell](https://www.haskell.org/) 강의도 잠깐 들어 보고, FP 언어로 찬사가 많은 [clojure](https://clojure.org/) 책도 좀 보았다. 하지만 모두 중도 하차. 소문대로 집입장벽이 만만치 않았다.

FP를 처음 접하는 이들에게 전적으로 FP를 지향하는 새로운 언어를 배우는 것은 어려운 일이다. FP의 개념도 잘 잡히지 않았는데, 문법도 생소한 코드들을 보다 보면 머리에 한계가 느껴진다. clojure의 경우 괄호만 보다 나온 기분이었다.

그 대신 기존에 익숙한 언어에 FP 방식을 도입하는 것은 보다 쉽고 간편하다. FP를 알 수 있는 과도기적인 방법으로  좋다고 생각한다.


## ruby

내가 처음 자발적으로 배운 언어이기 때문에 ruby에 애착이 많다. 최근에 science 계통에서는 경쟁관계에 있는 python이 강세고, ruby를 널리 알린 web programming 분야에서는 node가 급격히 성장했다. 그래서 ruby 커뮤니티는 좀 정체된 상태 같다.

하지만 성능 뭐 이런 걸 다 떠나서 문법이 정말 아름답다. 일관성도 뛰어나고 예측가능하다. OOP에 대한 개념을 잡는 데도 좋다. chaining에 익숙해 지면 코딩 길이도 무척 짧아진다.  

아무튼, ruby도 FP 방식으로 운용 가능하다. ruby community에서는 for loop 보다도 each를 많이 쓰는데, map을 알고 나면
 상당히 많은 each 용례를 쓸모 없는 변수를 빼고 map으로 구현할 수 있다.

다음 글들이 도움이 된다.

* [Having Fun With Functional Programming in Ruby](http://aurelien-herve.com/blog/2014/02/27/some-cool-functional-programming-with-ruby/)
* [Using a Ruby Class To Write Functional Code](http://patshaughnessy.net/2014/4/8/using-a-ruby-class-to-write-functional-code)
* [Adventures in functional programming with Ruby](http://naildrivin5.com/blog/2012/07/17/adventures-in-functional-programming-with-ruby.html)


## python

python 커뮤니티는 정말 크다. 그래서 computer science의 개념들을 설명할 때 python으로 예제 코드가 짜여져 있는 경우가 많다.

python을 약간 배우기는 했지만, 함수 호출 방식에서 일관성이 떨어지는 점이 불만이다. 또 코드가 닫히는 부분도 indentation으로 처리되는데, 층차가 많아지면 꽤 혼란스럽다. 역시 개인의 기호는 서로 다른 듯하다.

당연히, python도 FP 방식으로 활용 가능하다.

* [An introduction to functional programming](https://codewords.recurse.com/issues/one/an-introduction-to-functional-programming)

* [Functional Programming in Python](http://www.oreilly.com/programming/free/files/functional-programming-python.pdf)

## javascript


javascript 커뮤니티가 커지다 보니 관련된 글들도 가장 많은 편이다. 이 가운데는 FP 방식에 대한 의견들을 종종 볼 수 있다. javascript에 익숙한데 FP에 관심이 있다면 도움을 얻을 수 있을 것이다.

몇 가지씩 적용해 보면 코드가 효율적으로 변하는 것을 체험할 수 있다. 꼭 적용해 보시라.

최근에 좋은 포스트를 알게 되어 적어 둔다.

* [How I rediscovered my love for JavaScript after throwing 90% of it in the trash.](https://hackernoon.com/how-i-rediscovered-my-love-for-javascript-after-throwing-90-of-it-in-the-trash-f1baed075d1b)
* [Functional JavaScript: Function Composition For Every Day Use.](https://hackernoon.com/javascript-functional-composition-for-every-day-use-22421ef65a10)
* [Rethinking JavaScript: Death of the For Loop](https://hackernoon.com/rethinking-javascript-death-of-the-for-loop-c431564c84a8)
* [Rethinking JavaScript: The if statement](https://hackernoon.com/rethinking-javascript-the-if-statement-b158a61cd6cb)
* [Functional programming in JavaScript @ Youtube](https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)


그 밖에 글들도 유용하다.

* [JavaScript and Functional Programming](https://bethallchurch.github.io/JavaScript-and-Functional-Programming/?utm_source=javascriptweekly&utm_medium=email)
* [Functional Programming in JavaScript](https://dzone.com/refcardz/functional-programming-with-javascript)


## R


통계 언어로 알려져 있는 R은 데이터 형식과 연산 자체가 기본적으로 벡터를 기반으로 하고 있기 때문에 다른 언어들과 접근이 상당히 다르다. 그래서 사실 FP 방식을 이해하지 못하면 사용하기 어려운 언어이다. R이 어렵다고 느끼는 사람들은 우선 FP 방식을 약간 익히고 나서 관련 코드들을 다시 보기를 권한다. 특히 apply 시리즈는 FP의 전형적인 형태이기 때문에 FP를 이해하지 못하면 프로젝트에 적용하기 어렵다.

사실 나도 apply를 잘 사용하지 못하고 있었는데, FP 방식이라고 이해한 뒤로는 즐겨 사용하게 되었다. data manipulation 관련된 많은 package 들이 있지만, R 을 FP 방식으로 연구해 보면 꽤 많은 작업들이 이들 package 없이도 처리가 가능하다.

찾아보니 의외로 많은 글들이 있었다. 특히 Wickham의 글은 현실적인 감각을 키우는데 도움을 준다.

* Hadley Wickham, [Functional programming / Advanced R](http://adv-r.had.co.nz/Functional-programming.html) : 정리가 매우 잘 되어 있다.
* Text book github repo [Functional Programming in R](https://github.com/mailund/functional-programming-in-R) : 2017년 초에 나온 따끈한 책
* PPT [Functional Programming in R](http://www.rmanchester.org/presentations/2013/05/ManchesterR_-_FP_in_R_-_David_Springate_-_20130502.pdf) : 요점만 간단히
* [Functional programming in R / R bloggers](https://www.r-bloggers.com/functional-programming-in-r/)
