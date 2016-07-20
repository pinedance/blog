---
layout: post
title:  "웹 페이지에 소셜 공유 링크를 넣어보자 <br>(특히 Jekyll Blog)"
categories: 코딩삽질기
---

웹 페이지에 소셜 공유 링크를 직접 넣어보자. 

구글신께 문의해 보면 너무 많은 정보가 나와서 오히려 알기 어렵다. 그래서 간단히 정리해 둔다. 

특히 최근 static page로 많이 사용되고 있는 jekyll의 경우를 살펴보자.

생각보다 단순하다. 아래 html code를 원하는 곳에 넣어주면 된다. 

어떤 페이지에 나타나게 하고 싶은지에 따라, 또 개발된 code에 따라 다르지만 

일반적으로 `_layout` 폴더에 있는 `default.html`나 `post.html`에 넣거나 `_includes` 폴더에 있는 `header.html`나 `footer.html`에 넣으면 된다. 

{% raw %}

```html
<!--twitter-->
<a href="https://twitter.com/share?text={{ page.title }}&url={{ site.url }}{{ page.url }}" target="_blank">
	<img src="{{ site.baseurl }}/assets/img/socialSharing/twitter.png">
</a>

<!--facebook-->
<a href="http://www.facebook.com/sharer.php?u={{ site.url }}{{ page.url }}&p[title]={{ page.title }}" target="_blank">
	<img src="{{ site.baseurl }}/assets/img/socialSharing/facebook.png">
</a>

<!--google plus-->
<a href="https://plus.google.com/share?url={{ site.url }}{{ page.url }}" target="_blank">
	<img src="{{ site.baseurl }}/assets/img/socialSharing/google.png">
</a> 

<!--linkedin-->
<a href="http://www.linkedin.com/shareArticle?mini=true&url={{ site.url }}{{ page.url }}&title={{ page.title }}">
	<img src="{{ site.baseurl }}/assets/img/socialSharing/linkedin.png">
</a> 
```

blog 설정에 따라 `{{ site.url }}{{ page.url }}`를 `{{ site.url }}{{ site.baseurl }}{{ page.url }}`로 해야 하는 경우도 있다. 링크가 오류 없이 잡히는지 확인한 뒤에 공개하도록 하자. 

link에 사용할 이미지는 구글신께 문의하면 많이 얻을 수 있다. 귀찮다면 이 post 아래 있는 아이콘을 사용해도 된다. 
{% endraw %}
***

참고자료

* [Simple Share buttons for Jekyll blog](https://superdevresources.com/share-buttons-jekyll/)

