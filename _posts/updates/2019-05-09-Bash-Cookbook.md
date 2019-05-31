---
layout: post
title:  "[Cookbook] Bash, 이럴 때 이렇게 한다."
categories: [코딩삽질기, Cookbook]
---

### Bash 스크립트에서 자기 자신이 어떤 폴더에 위치해 있는지 알아야 할 때가 있다.

```bash
#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DIR="$( cd "$(dirname "$1")"; pwd -P)/$(basename "$1")"
```

REF
* [Get the source directory of a Bash script from within the script itself](https://stackoverflow.com/a/246128)

### Bash 스크립트에서 환경변수 설정하기

```file
CURRENTDIR="$(cd "$(dirname "$1")"; pwd -P)/$(basename "$1")"
LIBDIR="/LIB"

echo $CURRENTDIR
export PYTHONPATH=${PYTHONPATH}:${HOME}:${CURRENTDIR}${LIBDIR}
echo ${PYTHONPATH}
```


```bash
# use this
. activate_env_var.sh
# or this
source activate_env_var.sh
# but this is not working
./activate_env_var.sh
```
