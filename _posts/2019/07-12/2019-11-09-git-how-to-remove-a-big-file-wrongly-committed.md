---
layout: post
title:  "Git에서 Commit 된 대용량 파일 삭제하기"
categories: 코딩삽질기
keywords: ['git', 'github']
---

github을 원격저장소로 사용하다보면 대용량 파일 때문에 push에 실폐할 때가 있다. github에는 100M 이 넘는 파일이 제한되어 있기 때문이다. 하지만 이 파일을 제거한 뒤에도 여전히 push에 실폐하게 된다. 이미 commit 된 히스토리 상에 이 파일이 남아있기 때문이다. 즉 현재 파일시스템에 보이지 않을 뿐, git에서 여전히 이 파일을 끌어안고 있기 때문이다.

이를 제거하는 일은 생각보다 까다롭다. 해당 파일이 commit된 이점 시점으로 되돌리고, 나머지 파일만 현재 상태로 유지해 줘야 한다. 다행히 git에 이를 위한 방법이 준비되어 있다.  아래와 같이 하면 해당 파일을 삭제할 수 있다.  다만 하나하나 삭제해 주어야 한다는 불편이 있다.

```bash
git filter-branch --tree-filter 'rm -rf path/to/your/file' HEAD
```

이런 문제를 더 잘 해결하기 위해 의로운 분께서 [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner)라는 프로그램을 만들어 배포하고 있다.홈페이지에서 프로그램을 다운로드 받아 아래와 같이 사용할 수 있다.

```bash
# in git repo folder
java -jar bfg.jar --strip-blobs-bigger-than 100M
```

잘 작동하지 않으면 아래 명령어를 수행한 뒤에 다시 실행시켜보자.

```bash
git repack && git gc
```

## REF

* [git : How to remove a big file wrongly committed](https://thomas-cokelaer.info/blog/2018/02/git-how-to-remove-a-big-file-wrongly-committed/)
* [Github에 100MB 이상의 파일을 올리는 방법](https://medium.com/@stargt/github%EC%97%90-100mb-%EC%9D%B4%EC%83%81%EC%9D%98-%ED%8C%8C%EC%9D%BC%EC%9D%84-%EC%98%AC%EB%A6%AC%EB%8A%94-%EB%B0%A9%EB%B2%95-9d9e6e3b94ef)
