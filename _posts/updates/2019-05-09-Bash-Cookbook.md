---
layout: post
title:  "[Cookbook] Bash, 이럴 때 이렇게 한다."
categories: [코딩삽질기, Cookbook]
---

### Bash 스크립트에서 자기 자신이 어떤 폴더에 위치해 있는지 알아야 할 때가 있다.

```bash
#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
```

REF
* [Get the source directory of a Bash script from within the script itself](https://stackoverflow.com/a/246128)
