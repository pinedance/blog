---
layout: post
title:  "Python 문법의 장점과 단점 (내 기준)"
categories: 코딩삽질기
tags: ['python']
---

```python
{"pros" : "list comprehension", "cons": "so many parenthesis"}
```


Background
-------------

얼마 전부터 python을 써보고 있다. 관심은 있었지만, 하던 거나 잘 하자는 생각에 발을 들이지 않고 있었는데, text mining을 배우다 보니 `package 깡패` python을 들여다보지 않을 수 없었다.

하지만 유명세에 비해 문법의 일관성이나 직관성은 좀 떨어진다는 생각을 지울 수 없다. 그래서 python 문법에 대한 내 생각을 좀 정리해 두려고 한다.

물론 나는 이런 주제를 논할 만큼 전문적인 지식을 가지고 있지 않다. Ruby, Javascript, R을 조금 사용할 줄 아는 수준이다. 따라서 python 문법에 대한 내 생각도 이런 언어들과의 비교에서 도출된 것일 뿐임을 밝힌다.


Syntax of Python
-------------------

### Pros

python 언어에서 가장 눈에 띄는 것은 [`list comprehension`](https://goo.gl/iB2b)이다([`dictionary comprehension`](https://goo.gl/qZniCw)도 있다).

반복적인 작업을 수행하는데 매우 편리하다. 특히 list 자료를 다룰 때 map, filter 등 다양한 작업을 한 번에 대신할 수 있다. 처음에 잘 이해 못하는 초심자들도 있는 듯한데, 일단 이해가 되면 더 없이 편리하다. 다만 측정해 보지는 못했지만, builtin function 들에 비해 조금 느리다는 인상이다.

```python
mylist = [ 1, 2, 3, 4 ]
list_updated = [ it + 1 for it in mylist ]    # [2, 3, 4, 5]

# Ruby style ... list.map{ |it| it + 1 }
# Javascript style ... list.map( x => x + 1 )

list_filtered = [  it for it in mylist if it % 2 == 0 ]    # [2, 4]

# Ruby style ... list.select{ |it| it %2 == 0 }
# Javascript style ... list.filter( x => x % 2 == 0  )
```

다음으로 dictionary에서 key가 없을 때 `key error`를 호출한다는 점이다.

처음에는 불편했었는데, debugging을 해 보니 생각이 바뀌었다. Ruby나 JS 같은 경우에는 error을 발생시키지 않고 결과를 내 주기 때문에 오류가 있어도 인지하기 어렵다. 심지어 잘못된 결과가 나와도 믿게 되는 경우가 있다. 하지만 python은 확실이 error을 내 주기 때문에 문제가 된 지점을 알 수 있다.

```python
mydict = {"a": 1, "b": 2, "c": 3}
mydict["d"]            #  KeyError: 'd'
mydict.get("d", "") # ""
```

```Ruby
# Ruby style
mydict = {a: 1, b: 2, c: 3}
mydict[:d]            # nil
( mydict[:d] )? mydict[:d] : ""  # ""
```

다소 불편한 점이 있다면 초기 값이 있는지 없는지 모를 때이다. 이 때문에 `setdefault`나 defaultdict package를 사용해 줘야 한다.


```python
mydict = {"a": 1, "b": 2, "c": 3}
# mydict["d"]  = mydict["d"] + 2          #  KeyError: 'd'
mydict.setdefault( 'b', 0 )
mydict.setdefault( 'd', 0 )
mydict["b"]  = mydict["b"] + 1          
mydict["d"]  = mydict["d"] + 4              #  mydict = {'a': 1, 'b': 3, 'c': 3, 'd': 4}
```

```Ruby
# Ruby style
mydict = {a: 1, b: 2, c: 3}
# mydict["d"]  = mydict["d"] + 2          # undefined method `+' for nil:NilClass
mydict[:b]  ||= 0
mydict[:d]  ||= 0
mydict[:b]  = mydict[:b] + 1          
mydict[:d]  = mydict[:d] + 4              #  mydict = {:a=>1, :b=>2, :c=>3, "b"=>1, "d"=>4}
```


### Cons

가장 불편한 것은 builtin function에서 [method chaining](https://en.wikipedia.org/wiki/Method_chaining)이 별로 없다는 점이다.

특히 python3에서는 return 결과가 다른 object로 변환되는 경우가 많아서 적극적으로 사용하기 어렵다. 결과적으로 python에서는 괄호를 자주 사용하게 된다. 괄호가 많아지면 나중에 코드의 가독성이 현저히 떨어진다.

```python
mylist = ["a ", " b", "c", " d", " a", "e", "d"]
list_uniq = sorted( list( set( [ it.strip() for it in mylist ] ) ) )

# Ruby style ... mylist.map{ |it| it.strip }.uniq.sort
```

다음으로 불편한 점은 function을 call하는 방식이 일관되지 않다는 점이다.

Ruby나 Javascript는 [OOP](https://goo.gl/l1bXJU)에 가깝기 때문에 function이 object에 종속되어 있다고 생각하면 된다. python의 경우도 class가 있기는 하지만, object라기 보다는 function을 모아 둔 module에 더 가깝다. 따라서 function이 class에 종속되어 있기는 하지만, 대상 class가 내 생각과 다를 때가 있다. 때문에 function을 불러올 때 일관성이 떨어지는 것처럼 느껴진다.

```python
mylist = ["c", "a", "b"]
len( mylist)         # 3
sorted( mylist)   # ["a", "b", "c"]
", ".join(mylist)   # "c, a, b"

# Ruby style
## mylist.size
## mylist.sort
## mylist.join(", ")
```

```python
import re
mystring = "a,b;c:d"
sep = re.compile("[,;:]")
re.split( sep, mystring )
sep.split( mystring )    # ['a', 'b', 'c', 'd']

# Ruby style ... mystring.split( /[,;:]/ )
```

다음으로 함수에서 넣어주는 값이 변할지 변하지 않을지 예측하기 어렵다는 점이다.

일반적으로 하나의 function을 보면, 넣어준 값(input value)과 결과 값(return value)이 있기 마련이다. 그런데 function을 수행하고 난
 뒤에 넣어준 값이 변하게 되면 예상치 못한 문제가 생겨날 수 있다. 이런 문제 때문에 functional programming에서는 아예 최초에 선언된 variable은 재할당 할 수 없도록 강제하고 있다.

```python
input_value = [5, 2, 4, 3, 1]
output_value = input_value.sort()
print( input_value)      # [1, 2, 3, 4, 5]  => muation
print( output_value )   # None
```

```Ruby
# Ruby style
input_value = [5, 2, 4, 3, 1]
output_value = input_value.sort
p( input_value)         # [5, 2, 4, 3, 1]   => immutation
p( output_value )     # [1, 2, 3, 4, 5]
```

* python3에서 이런 문제를 피하려면 sorted 함수를 써야 한다. 하지만 함수만 보고는 어떤 변화를 줄지 예측하기 어렵다.
* ruby에서는 input value를 변화시키는 함수에 대해서는 `sort!`와 같이 "!"를 붙여 경고하고 있다.


Summary
-----------

다양한 언어를 접할 때마다 어려움도 있지만, 언어를 만든 사람들의 생각을 엿볼 수 있어 흥미롭다. 같은 문제를 바라보는 다양한 시각을 배울 수 있다.

위의 언급한 python의 특징들은 내가 오해하고 있는 부분들도 있고 좋은 기능인데 내가 불편하게 여기는 것일 수도 있다. 결과적으로 python에 대한 나의 이해가 부족하기 때문이리라.
