ref: 지킬로 깃허브에 무료 블로그 만들기(https://nolboo.github.io/blog/2013/10/15/free-blog-with-github-jekyll/)

```
git init
git checkout --orphan gh-pages

git remote add origin 저장소url
git add .
git commit -m "Initialize blog"
git push -u origin gh-pages  // 반드시 gh-pages 브랜치로 푸시해야 깃허브가 블로그 페이지를 만들어 준다.

git config --global push.default simple  # 동일한 브랜치만 push
```

먹고사니즘

* food
	+ recipe
	+ restaurant

