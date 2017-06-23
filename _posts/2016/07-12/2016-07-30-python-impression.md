---
layout: post
title:  "Python 기초 강좌를 듣고"
categories: 코딩삽질기
---


python

http://cool.kaist.ac.kr/python/

182.216.161.204:7782

https://repl.it/languages

http://dnjswns2942.tistory.com/m/post/43
http://youtu.be/-73cDPqlYeA

http://exercism.io/
***

https://slides.com/

python 메모
--------------

[variable mutable과 immutable의 차이](http://ledgku.tistory.com/54)

[PYTHON OBJECTS: MUTABLE VS. IMMUTABLE](https://codehabitude.com/2013/12/24/python-objects-mutable-vs-immutable/)

[Immutability in Ruby Part 1: Data Structures](http://blog.deveo.com/immutability-in-ruby-part-1-data-structures/)

[Immutability in Ruby Part 2: Domain Models](http://blog.deveo.com/immutability-in-ruby-part-2-domain-models/)


ruby와 python의 차이점
---------------------------

* https://www.ruby-lang.org/en/documentation/ruby-from-other-languages/to-ruby-from-python/
* http://c2.com/cgi/wiki?PythonVsRuby
* http://mitsuhiko.pocoo.org/pythonruby.html
* http://stackoverflow.com/questions/4769004/learning-python-from-ruby-differences-and-similarities
* http://blog.nacyot.com/articles/2014-12-17-diffrence-of-ruby-and-python/

boolean

```
# python
0, [], {} => False
# ruby
0, [], {} => true
```

```
# python
":".join(['a','b','c'])

# ruby
['a','b','c'].join(":")
```

```
a = [3,4,1,2]

# python
a.sort  # None
print a # [1,2,3,4]

# ruby
a.sort # [1,2,3,4]
p a     # [3,4,1,2]
```

python의 `sort` == ruby의 `sort!`

***

문자열 뒤에서 끝까지 자르려면?

`-`를 이용한 offset으로 끝에서 부터 인텍싱 할 수 있다.

```
"abcde"[-3:-1]  # "cd"
```

하지만a-b까지 slicing 할 때 index b는 포함되지 않기 때문에 [-3:-1]이렇게 하면 맨 마지막 글자는 빠지게 된다.

어떻게 하면 될까? 다음과 같이 하면 된다.

```
"abcde"[-3:]  # "cde"
```

dictionary에서 아직 존재하지 않는 key를 호출하면 error가 발생

```
# python
dic = {'a': 1, 'b': 2}
dic['c'] # KeyError: 'c'
dic.setdefault( 'c', 0 )  # 초기값을 설정하기 위해서는

# ruby
dic = {a: 1, b: 2}
dic[:c] # nil
dic[:c] ||= 0
***

python의 특별 기능
----------------------

### list comprehension

* https://blog.engineyard.com/2014/ruby-list-comprehension

```python
[k*k for k in range(10) if k%2]
# => [1, 9, 25, 49, 81]
```
