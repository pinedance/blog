---
layout: post
title:  "Bash에서 파일 확장자를 제거하고 싶다면?"
categories: [코딩삽질기]
tags: ['bash']
---


## 배경

bash는 약간의 진입장벽이 있지만 익숙해지면 편리한 기능들이 많다. 그 중 `${}`은 변수에 담긴 값을 삽입할 때 사용하지만 여기에는 보다 많은 기능들이 담겨 있다.

## 설명

내용 설명은 쓰는 사람도 읽는 사람도 지루하니 몇가지 대표적인 예시를 적어 둔다. 자세한 사항은 [공식문서](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html#Shell-Parameter-Expansion)를 참조하자. 

### Slice String

```bash
string=01234567890abcdefgh
echo ${string:7}       # 7890abcdefgh
echo ${string:7:2}     # 78
echo ${string: -7:-2}  # bcdef
```

### Remove String

```bash
x="./foo/fizzbuzz.bar.zip"
echo ${x#*/}     # foo/fizzbuzz.bar.zip
echo ${x##*/}    # fizzbuzz.bar.zip

y=${x##*/}       # fizzbuzz.bar.zip

echo ${y%.*}     # fizzbuzz.bar
echo ${y%%.*}    # fizzbuzz
```

### Replace String

```bash
t="test"
echo ${test/t/-}   # -es-
echo ${test/#t/-}   # -est
echo ${test/%t/-}   # tes-
echo ${test/#*es/-} # -t
```

## REF

* [Bash manual > 3.5.3 Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html#Shell-Parameter-Expansion)
* [How do I remove the file suffix and path portion from a path string in Bash?](https://stackoverflow.com/questions/125281/how-do-i-remove-the-file-suffix-and-path-portion-from-a-path-string-in-bash)
* [What does the hash in ${parameter/#pattern/string} do?](https://unix.stackexchange.com/a/423937)