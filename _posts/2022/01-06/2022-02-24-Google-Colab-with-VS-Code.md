---
layout: post
title:  "Google Colab을 VS Code에서 사용해 보자"
categories: [코딩삽질기]
tags: ['Colab', 'VS-Code']
---

## Background

※ 2022년 6월 현재 이 방법은 Google 측에서 막은 상태이다. 아쉽다..... 기록 차원에서 글은 남겨둔다. 

Google에서 제공하고 있는 [Colab](https://colab.research.google.com/?hl=ko)은 클라우드 기반의 가상 개발 환경이다. 구글 아이디만 있으면 누구나 무료로 사용할 수 있다. 개발 환경을 따로 구성하지 않아도 되고, GPU를 사용할 수 있다는 점이 큰 매력이다. 

Colab은 간단하게 사용할 수 있도록 만들어졌다는 생각이 든다. 복잡한 절차 없이 Web Browser로 접속하는 것만으로 모든 준비가 끝난다. 사용자는 자신의 웹브라우저로 [Google Colab](https://colab.research.google.com/?hl=ko)에 접근한 다음 jupyter notebook 환경 아래서 python으로 코딩을 하고 실행시키면 된다. 프로그래밍 언어로서 [python](https://www.python.org/)과 개발 환경으로서 [jupyter notebook](https://jupyter.org/)에 익숙하지 않다면 다소 어렵게 느껴질 수 있으니 여기에 대한 배경 지식이 필요하다. 

Colab은 실습용으로 최적의 환경을 제공하지만, 프로젝트를 진행할 때에는 다소 불편한 점이 있다. 첫째는 Terminal 접근 되지 않는다는 점이고, 둘째는 사용 리소스에 제약이 있다는 점이다. 둘째 문제에 대해서는 글 말미에 다시 언급하기로 하고 첫번째 문제를 해결해 보자. 

Colab은 웹브라우저에서 동작하는 jupyter notebook를 통해 개발이 이루어지는 구조이다. 물론 jupyter notebook에서 `!`를 붙여 bash 명령을 실행시킬 수 있지만 일반 개발 환경과 다르므로 불편할 수 있다. 게다가 Colab은 런타임이 종료되면 가상 환경이 소멸하므로 설치했던 모든 library가 사라질 뿐 아니라 넣어 두었던 데이터도 모두 사라진다. 런타임의 생성은 내가 새로운 컴퓨터를 만드는 것이고 런타임 종료는 사용하던 컴퓨터를 없애는 것이기 때문이다. 

이를 보완하기 위한 대안이 있다. 웹브라우저의 jupyter notebook이 아닌 Local 컴퓨터의 [Visual Studio Code](https://code.visualstudio.com/)를 이용하여 개발하는 방법이다. Visual Studio Code(이하 VS Code)는 많은 개발자들이 사용하고 있는 코드 에디터(code editor)로서 Microsoft에서 제공하고 있다. 자신이 사용하고 있는 로컬 컴퓨터에 설치하여 사용할 수 있다. VS Code에는 ssh를 이용하여 리모트 서버와 연결하여 개발할 수 있는 기능이 있다. 즉, 사용자가 로컬 컴퓨터에 설치된 VS Code를 이용하여 리모트 컴퓨터를 컨트롤하고 그 곳의 자원을 사용하는 것이다. 원격 서버를 관리하는데 매우 편리한 기능이다. 이 기능을 응용하여 Colab이 제공하는 가상 환경을 리모트 컴퓨터로 컨트롤 할 수 있다. 

이 방법은 Jacques Thibodeau가 쓴 [How to Connect to VSCode to Colab](https://jacquesthibodeau.com/deep-learning-setup/vscode/google-colab/2021/09/27/connect-to-colab-from-local-vscode.html)이라는 글에 잘 소개되어 있다. [해당 글은 Colab에서도 확인 가능하다](https://colab.research.google.com/github/JayThibs/jacques-blog/blob/master/_notebooks/2021-09-27-connect-to-colab-from-local-vscode.ipynb).

## Summary

개념적으로는 다음과 같다. 

Colab (개발을 진행할 가상 환경) 상에서 
* SSH 접근이 가능하도록 colab_ssh라는 library를 설치한다. 
* 개발을 진행 할 Github 저장소를 내려받고 colab_ssh를 활성화 시킨다.

VS Code 상에서 
* colab에서 활성화된 ssh에 접근한다. 
* 일반 서버를 다루 듯이 개발을 진행한다. 
  
## Code

자세한 설명은 Jacques Thibodeau의 글에 있으므로 여기에서는 요약된 코드와 간단한 설명만 기술하겠다. 

### Github Repo 가져오기 위한 준비 

Github 저장소에 접근하기 위해서는 [github access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)이 필요하다. google drive 적당한 경로(`<PATH>`) 아래 `.env`라는 파일을 만든 뒤 아래와 같이 내용을 채워 두자. 

```bash
# .env
GITHUB_ACCESS_TOKEN="YOUR_SECRET_GITHUB_ACCESS_TOKEN"
```

Colab에서 자신의 구글 드라이브에 접근할 수 있다. Colab에서는 데이터를 저장할 수 없으므로 구글 드리이브를 mount 시켜 구글 드라이브에 저장된 데이터를 사용하는 일이 많다.  이런 경우에 아래 코드가 필요하다. 여기에서는 앞의 `.env` 파일에 접근하기 위해 필요하다. 

```python
from google.colab import drive
drive.mount("/content/drive")
```

이제 `.env` 파일의 내용을 데이터로 읽어들일 차례이다. `open()`으로 읽어들여도 되지만, 편리한 `python-dotenv` library를 사용하자. 

```python
!pip install python-dotenv --quiet
import dotenv
import os
dotenv.load_dotenv(
        os.path.join('/content/drive/<PATH>/', '.env')
    )
github_access_token = os.getenv('GITHUB_ACCESS_TOKEN')
```

이제 개발에 사용할 나의 github repository 주소와 branch 이름을 선언해 주자. 

```python
git_repo, git_branch = 'https://github.com/<GITHUB_USERNAME>/<REPOSITORY_NAME>', 'main'  # or 'master'
```

이제 Colab에서 github에 접근하여 사용할 git 저장소를 가져올 준비가 모두 끝났다. 

### SSH 연결하기 위한 준비

Colab에서 SSH 접근을 허용하기 위해서는 `colab_ssh`라는 library가 필요하다. 설치하고 import 시켜주자. 

```python
# Install colab_ssh on google colab
!pip install colab_ssh --upgrade --quiet
from colab_ssh import launch_ssh_cloudflared, init_git_cloudflared
```

이제 모든 준비를 마치고 Colab에서 Github에서 Repository를 내려받고 SSH 접근을 허용할 차례이다. `<PASSWORD_FOR_SSH>`는 VS Code에서 SSH로 접근할 때 인증할 패스워드이다. 자신이 원하는 것으로 넣어 두면 된다. 

```python
launch_ssh_cloudflared( "<PASSWORD_FOR_SSH>" )
init_git_cloudflared(repository_url=git_repo + ".git",
         personal_token=github_access_token, 
         branch=git_branch,
         email="<YOUR_email_for_GITHUB>",
         username="<GITHUB_USERNAME>")
```

이상의 준비를 모두 마치고 Colab의 jupyter notebook에서 이 코드들을 차례로 모두 실행시켜보자. 

### VS Code로 Colab에 접근하기

실행 결과 마지막에 `Open <REPOSITORY_NAME>`라는 버튼이 나타난다. 이 버튼을 누르면 VS Code를 열겠냐는 팝업이 뜨는데, 이를 허용하면 VS Code가 실행되면서 SSH 주소까지 자동으로 입력된다. VS Code에서 몇가지 질문을 차례로 입력해 주고 위에서 자신이 설정해 두었던 `<PASSWORD_FOR_SSH>`를 올바르게 입력하면 VS Code에서 Colab 가상 개발 환경에 접근할 수 있게 된다. 

사실 이 전에 해주어야 할 일이 있다. SSH는 [Cloudflare의 Argo Tunnel이라는 서비스](https://developers.cloudflare.com/argo-tunnel/getting-started/installation)를 경유하여 연결된다. 따라서 Cloudflare에서 제공하는 binary file을 local 컴퓨터에 내려받아 두고 local의 SSH config file(주로 `~/.ssh/config`)에 아래와 같이 입력해 주어야 한다. `<PUT_THE_ABSOLUTE_CLOUDFLARE_PATH_HERE>`는 앞에서 내려 받은 binary file의 경로이다. 

```bash
Host *.trycloudflare.com
	HostName %h
	User root
	Port 22
	ProxyCommand <PUT_THE_ABSOLUTE_CLOUDFLARE_PATH_HERE> access ssh --hostname %h
```

이제 VS Code를 통해 Terminal 접근이 가능하다. git과 같은 bash 명령어도 사용하 수 있고 일반 python 코드도 실행시킬 수 있다. 

## 나가며

Colab은 매우 유용한 도구이지만 [런타임에 제약](https://research.google.com/colaboratory/faq.html)이 있다. 대략 30-60분 정도 웹브라우저의 jupyter notebook에 별다른 입력이 없으면 런타임이 끊어진다. 이렇게 되면 개발 서버가 사라지는 꼴이 되기 때문에 VS Code와 SSH의 연결도 끊어지게 된다. `git push`를 해두지 않았다면 수정된 코드를 모두 잃게 될 수 있다. 특히 VS Code로 연결하여 사용할 경우 jupyter notebook은 더더욱 사용하지 않게 되므로 사용 중에 갑지가 SSH가 끊어졌다는 메시지와 함께 멘붕에 빠질 수 있다. 필자 또한 여러차례 쓴 맛을 보아야 했다. 자신의 개발 서버가 어느 순간 증발할 수 있다는 것은 실제 프로젝트를 진행할 때 매우 치명적인 문제이다. 

[웹브라우저 개발자 도구에서 javascript로 주기적으로 신호를 주는 방법](https://stackoverflow.com/questions/57113226/how-to-prevent-google-colab-from-disconnecting)이 있지만, 근본적인 해결책은 아니다. 이에 대해서는 아직 어떻게 대처해야 할지 모르겠다. 
