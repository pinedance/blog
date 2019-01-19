---
layout: post
title:  "Python, 이럴 때 이렇게 한다."
categories: 코딩삽질기
---

## print 결과를 파일에 출력하기

`stdout`으로 출력하는 print와 file에 적는 write는 그 결과에서 차이가 있다.

때때로 `format`을 이용하여 복잡하게 모양을 만들어 파일에 적는 대신, 그냥 프린트 되는 내용을 파일에 담고 확인해 보고 싶을 때도 있다. 이럴 때 어떻게 할까?

```python
import sys

# system의 stdout을 파일로 바꿔 준다.
sys.stdout = open("result.txt", 'w', encoding="utf-8")

print("Hello World!")    # 화면 대신 "result.txt" 파일에 출력된다.

# 다시 본래 상태로 되돌리려면 다음과 같이 입력한다.
sys.stdout = sys.__stdout__

# ref : https://stackoverflow.com/questions/4675728/redirect-stdout-to-a-file-in-python
```



***

## python 정보들 강좌들 (초급 탈출?)

* [파이썬(Python) 초급부터 고급까지](https://www.youtube.com/playlist?list=PLRx0vPvlEmdD8u2rzxmQ-L97jHTHiiDdy)

* [파이썬 텐서플로우 & 머신러닝 기초](https://www.youtube.com/playlist?list=PLRx0vPvlEmdAbnmLH9yh03cw9UQU_o7PO)

* [파이썬을 배우는 최고의 방법@n0lb00's Blog](https://nolboo.kim/blog/2014/08/10/the-best-way-to-learn-python/)
