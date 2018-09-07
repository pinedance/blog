---
layout: post
title:  "Python으로 browser를 제어해 보자."
categories: 코딩삽질기
---

> python, selenium으로 browser를 제어해 보자.

anaconda python을 기준으로 설명한다.

## 과정

python으로 browser를 제어하는 과정은 다음과 같다. 자세한 내용은 [공식 문서](http://selenium-python.readthedocs.io/installation.html#drivers)를 참고하자.

```
python -> selenium (python package, Selenium Client) - -> webdriver -> browser
```

## 준비

### Webdriver

selenium은 나중에 설치하도록 하고, 먼저 webdriver를 다운로드 받는다. webdriver는 browser마다 다르며, [여기](http://selenium-python.readthedocs.io/installation.html#drivers)에서 목록과 주소를 찾을 수 있다.

Internet Exporer의 경우에는 따로 준비되어 있는데, [32bit](https://goo.gl/rjZrvz)를 설치해주는 것이 좋다. 64bit를 설치하면 [text가 상당히 느리게 입력되는 문제](https://goo.gl/9xQcnE)가 있기 때문이다.

주의해야 할 점은 이 webdriver들이 windows cmd 환경에서 실행될 수 있도록 `%path%` 내에 포함되어 있어야 한다는 점이다. 예를 들어 webdriver들을 `c:\webdriver` 폴더 아래 모아 두었다면, windows 환경변수에서 `%path%` 내용에 `c:\webdriver\`를 추가해 주어야 한다. 그렇지 않으면 selenium이 webdriver를 찾을 수 없다는 메시지를 내보낸다. `%path%` 설정에 대해서는 [여기](http://cezacx2.tistory.com/1173)에 자세히 설명되어 있다.

### Selenium & anaconda env

이제 selenium을 설치하면 된다. 사실 설치는 `pip install selenium`하면 간단히 설치된다. 그런데, anaconda python을 설치한 경우에는 windows cmd 환경에서 python을 찾을 수 없다고 나오기 때문에 문제가 된다. anaconda python을 이용하는 경우에는 selenium 설치 전에 [anaconda python env](https://conda.io/docs/user-guide/tasks/manage-environments.html)를 만들어주는 작업이 추가로 필요하다.

`anaconda prompt`에서 python 3.6을 이용하는 `myenv`라는 이름의 새로운 env를 추가해보자.

```
# open "anaconda prompt"
# create conda environment
conda create -n myenv python=3.6
conda env list
```

conda install로 설치할 수 있는 package의 경우에는 `conda install -n myenv packagename`로 env 환경 내에 package를 설치할 수 있다. 하지만 selenium의 경우에는 conda install로 설치할 수 없고 pip로만 설치할 수 있다. 따라서 아래와 같이 env 환경을 활성화 시킨 다음 설치해 줘야 한다.

```
# activate env
activate myenv

# install selenium for controling browser
pip install selenium
```

Tip : 회사 같은 경우 사내 ssl이 있다면 pip로 package 설치가 용이하지 않다. 이런 경우에는 `--trusted-host pypi.python.org` option을 달아 주었다. [여기](참조)

### python script 작성

이제 python으로 script를 작성해서 실행시키면 된다.

## Case by Case

### javascript를 실행시켜야 할 때

페이지에 따라 버튼이나 링크를 누르면 해당 페이지에 구현된 javascript 함수가 호출되는 경우가 있다. 이런 경우에는 버튼이나 링크를 누르는 것 보다 해당 javascript 함수를 직접 호출하는 것이 더 편리할 수 있다. 물론 해당 javascript 함수를 알아 내야 하지만 말이다.

selenium에서는 아래와 같이 javascript를 호출할 수 있다.

```python
# pop alert up
browser.execute_script("javascript:confirm('OK?');")
```

### 예상치 못한 alert 창이 뜰 수 있을 때

어떤 액션을 취한 뒤에 alert 창이 뜨는 경우가 많다. 이런 경우에는 이 alert를 체크 해주어야 다음 액션을 취할 수 있다. 다음과 같은 함수를 만들어두고 alert 창이 뜰 수 있는 곳에 넣어 두면 문제를 해결할 수 있다.

```python
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def beyondAlert( browser, delay ):
	try:
		WebDriverWait( browser, delay ).until( EC.alert_is_present(), 'Waiting for alert timed out' )
		alert = browser.switch_to_alert()
		alert.accept()
		print("alert accepted")
		state = 1
	except TimeoutException:
		print("no alert")
		state = 0

	browser.switch_to_default_content()
	return state
```

### button click이 되지 않을 때

마우스로 button을 클릭하면 액션이 나타나는데, selenium으로 하면 액션이 나타나지 않는 경우가 있다. button을 mouse-over해야 활성화되는 element를 심어 놓은 경우이다. 왜 이런 방식으로 페이지를 만들었는지는 모르겠지만, 이런 경우가 있다.

이런 경우에는 아래 코드가 작동하지 않는다.

```python
# browser = webdriver.Chrome(  )
# btn = browser.find_element_by_css_selector( "#targetButton" )
btn.click()
```

이 문제를 해결하려면, 손으로 움직이는 것처럼 button에 mouse-over한 상태에서 button을 click을 해 주어야 한다. selenium에서 이러한 동작을 수행하려면 `action chain`을 이용하여 이런 action들을 묶어준 뒤 한 번에 동작시키면 된다.

```python
from selenium.webdriver.common.action_chains import ActionChains
# browser = webdriver.Chrome(  )
# btn = browser.find_element_by_css_selector( "#targetButton" )
actions = ActionChains( browser ).move_to_element( btn ).pause(1).click( btn )
actions.perform()
```
