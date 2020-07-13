---
layout: post
title:  "jupyter notebook에서 anaconda env를 사용해보자."
categories: [코딩삽질기]
tags: ["python", "anaconda_python", "jupyter_notebook"]
---

## 배경

python은 매우 유용한 언어이지만, 환경설정 등이 상대적으로 복잡한 것이 사실이다. 나는 주로 anaconda python을 사용하고 있다. 그런데, jypyter notebook에서 anaconda python env에 접근할 수 없을 때가 있다. 

각각의 environment에는 필요한 셋팅이 되어 있는 상태이기 때문에 jupyter notebook에서 이미 만들어 놓은 anaconda env를 kernel로 사용하여 개발을 진행해야 할 때가 많다. 

아래와 같은 방법으로 anaconda env를 jupyter notebook kernel로 연결시킬 수 있다. 

## 방법

현재 연결되어 있는 jupyter notebook kernel을 먼저 확인하자. 

```bash
jupyter kernelspec list
```

원하는 kernel이 없다면 아래와 같이 추가한다. 

```bash
# 환경 진입
conda activate <MY_CONDA_ENV_NAME>

# conda kernel package 설치
conda install nb_conda_kernels

# kernel 연결 확인
jupyter kernelspec list
```

만약 kernel이 활성화 되어 있는 anaconda env와 연결되지 않았다면 해당 ENV에 jupyter kernel package가 설치되지 않았기 때문일 수 있다. 아래와 같이 설치하자.

```bash
# kernel package 설치
pip install ipykernel

# kernel 등록
python -m ipykernel install --user --name <MY_KERNEL_NAME> --display-name "<DISPLAY_NAME>"
```

## Jupyter Notebook Kernel 관리

현재 연결되어 있는 jupyter notebook kernel 확인

```bash
jupyter kernelspec list
```

kernel 설치

```bash
jupyter kernelspec install <MY_KERNEL_PATH>
# OR
python -m ipykernel install --user --name <MY_ENV_NAME> --display-name "<DISPLAY_NAME>"
```

kernel 삭제

```bash
## 커널 지우기
jupyter kernelspec uninstall <MY_KERNEL_NAME>
```


## REF

* [anaconda로 설치한 가상 환경 jupyter notebook kernel에 추가하기](https://data-newbie.tistory.com/113)
* [jupyter notebook에 가상환경 kernel 추가하기](https://medium.com/@5eo1ab/jupyter-notebook%EC%97%90-%EA%B0%80%EC%83%81%ED%99%98%EA%B2%BD-kernel-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0-ed5261a7e0e6)
* [Conda environments not showing up in Jupyter Notebook
](https://stackoverflow.com/a/43197286)
