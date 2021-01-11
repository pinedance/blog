---
layout: post
title:  "python package를 만들어 보자"
categories: [코딩삽질기]
tags: ["python"]
---

## 배경

## 개발 환경 만들기

### Create Dev Environment

Create conda environment for development

```
# conda env list
conda create -n dev-my-packages-py36 python=3.6
conda activate dev-my-packages-py36
```

Setup dev package for development

```
# cd my-pypackage
python setup.py develop --user
```



## REF
