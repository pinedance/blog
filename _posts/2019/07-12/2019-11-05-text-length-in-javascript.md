---
layout: post
title:  "python과 javascript에서 문자열 길이가 다르다고?"
categories: ["코딩삽질기"]
tags: ["javascript", "python"]
---

## Summary

> javascript로 ASCII 이외의 문자, 특히 한자를 문자열로 다루면서 index로 문언가를 해야한다면, `[...srtring]`으로 array로 만들어 계산해야 한다.

## Background

최근 한자(漢字)로 이루어진 문자열 사이에 유사한 substring을 찾아주는 [python-quotesfinder](https://github.com/pinedance/python-quotesfinder)를 만들었다. 여기서 결과를 리포팅할 때 html 파일로 출력하도록 하였는데, 어떤 경우에는 정상적으로 출력되었지만 어떤 경우에는 문자열의 인덱스 값이 밀려 있는 것을 발견할 수 있었다.

## Cause

문제를 추적하다보니 python에서 계산한 인텍스 값을 javascript로 문자열에 적용할 때 때때로 예상과 다른 결과를 보인다는 사실을 알게 되었다. 흥미롭게도 python에서 계산한 문자열 길이와 javascript에서 계산한 길이가 달랐던 것이다. 그러다보니 javascript로 텍스트에서 index를 통해 substring을 추출할 때 잘못된 결과가 나타났다. 예전에도 이와 비슷한 문제가 있었던 기억이 있어 겨우 원인을 찾아낼 수 있었다.

유니코드의 일정 범위를 넘어서는 영역의 문자에 대해 javascript가 길이를 1이 아니라 2자로 반환하기 때문이었다. 한자의 경우 아래와 같이 일반 cjk영역과 extention A까지는 1자로 측정하지만, 그 이상 영역의 문자들은 모두 길이를 2로 연산하였다.

이런 문제는 emoji를 사용할 때도 나타나는데, 이에 대한 자세한 설명은 [이에 대한 글](https://medium.com/better-programming/slicing-strings-containing-emoji-differences-between-python-and-javascript-4716c419718f)에서 찾을 수 있었다.

```javascript
var unicode_cjk = "一丁丂七丄"
var unicode_cjk_extention_a = "㐀㐁㐂㐃㐄"
var unicode_cjk_extention_b = "𠀀𠀁𠀂𠀃𠀄"
var unicode_cjk_extention_c = "𪜀𪜁𪜂𪜃𪜄"
var unicode_cjk_extention_d = "𫝀𫝁𫝂𫝃𫝄"
var unicode_cjk_extention_e = "𫠠𫠡𫠢𫠣𫠤"
```

```javascript
\\ chrome ver. 78.0.3904.87
console.log( unicode_cjk.length ) \\ 5
console.log( unicode_cjk_extention_a.length ) \\ 5
console.log( unicode_cjk_extention_b.length ) \\ 10
console.log( unicode_cjk_extention_c.length ) \\ 10
console.log( unicode_cjk_extention_d.length ) \\ 10
console.log( unicode_cjk_extention_e.length ) \\ 10
```

## Resolution

아직까지는 해결책이 없다. 번거롭지만 문자열에서 길이나 인텍스가 중요하게 적용되는 경우에는  array로 변환시켜  작업할 수 밖에 없다.  문자열도 내부적으로는 array나 list로 만들어지는 것이기 때문에 성능차이가 크지는 않을 것 같다.

```javascript
console.log( [...unicode_cjk].length ) \\ 5
console.log( [...unicode_cjk_extention_a].length ) \\ 5
console.log( [...unicode_cjk_extention_b].length ) \\ 5
console.log( [...unicode_cjk_extention_c].length ) \\ 5
console.log( [...unicode_cjk_extention_d].length ) \\ 5
console.log( [...unicode_cjk_extention_e].length ) \\ 5
```
