---
layout: post
title: "VSCode：Python Interactive Window"
categories: [코딩삽질기]
tags: ["vscode", "ide", "python", "jupyter"]
---

## 배경

요즘 개발자들 사이에서 [Visual Studio Code](https://code.visualstudio.com/)(AKA VSCode)가 많이 사용되고 있다. 이 가운데 python 개발에 유용한 Python Interactive Window를 소개한다. 

### Python Interactive Window

많이 사용되는 [python jupyter notebook](https://jupyter.org/)은 편리하지만, IDE로서의 기능이 미비하고 내용을 확인하거나 코드를 외부에서 바로 실행시킬 수 없다. 물론 아래와 같이 `.ipython`에서 `.py` 코드만 추출해서 따로 저장할 수 있지만, 코드 변화가 빈번할 경우 번거로운 것이 사실이다. 

```bash
jupyter nbconvert --to script MYNOTEBOOK.ipynb 
# or 
# ipython nbconvert --to script MYNOTEBOOK.ipynb
# Output : MYNOTEBOOK.py
```

이런 경우에는 VScode에서 제공하는 `Python Interactive window`를 사용해 보자. 사용 방법은 [공식문서](https://code.visualstudio.com/docs/python/jupyter-support-py)에 자세히 설명되어 있다. 

이를 요약하면 다음과 같다. 

1. 현재 프로젝트에 `jupyter` package를 설치해야 한다. 

2. Command Palette에서 `Python: Select Interpreter`를 통해 해당 코드를 실행시킬 Interpreter를 선택한다. 

3. python 코드에 아래와 같이 `# %%`로 cell을 표시해 준 다음 jupyter notebook과 비슷한 방식으로 사용하면된다. 

4. Plot을 표시하기 위해서는 python jupyter notebook과 같이 코드에 `%matplotlib inline`을 추가해 주어야 한다. 

```python
# %%
msg = "Hello World"
print(msg)

# %%
msg = "Hello again"
print(msg)
```

## Shorcut

자주 사용하는 단축키는 아래와 같다. 

* `ctrl + enter` : 현재 셀 실행
* `shift + enter` : 현재 셀 실행 후 다음 셀로 이동

![Python Interactive Window](https://code.visualstudio.com/assets/docs/python/jupyter/code-cells-02.png)

![Python Interactive Window2](https://code.visualstudio.com/assets/docs/python/jupyter/plot-viewer.gif)

