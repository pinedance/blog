---
layout: post
title:  "Mediawiki extension을 만들어 보자"
categories: 코딩삽질기
---

> Mediawiki extension으로 mediawiki에 날개를 달아 보자

mediawiki는 대표적인 wiki flatform으로 풍부한 기능에도 불구하고 높은 완성도를 갖추고 있으며, 사용자에게 충분한 자유도를 보장하고 있다. 무료로 사용할 수 있는 플렛폼 가운데에서는 최상위 퀄리티라고 생각한다.

최근 고민 끝에 공동 프로젝트를 위해 mediawiki를 사용하기로 하였다. 예전에는 단순히 게시판 정도로 생각했었는데, 사용하다보니 자료를 모으고 연결하는 용도로는 최고의 선택이라는 생각이 들었다.

하지만 프로젝트에 맞게 최적화되어 개발된 소프트웨어는 아니기 때문에 사용 목적에 따라 부족한 기능이 있을 수 있다. 나 역시 그러했다. 가장 불편한 기능은 알파벳 이외의 문자에 대한 검색이 잘 되지 않는다는 점이었고, 그 다음으로는 리다이렉트 페이지를 자동으로 만들어야 했는데 그런 extension이 없었다는 점이었다.

검색 문제는 구체적으로 한글과 한자 검색이었는데, mediawiki에서 게시한 안내에 따라 elasticsearch를 설치하여 full text 검색을 하는 방식으로 해결할 수 있었다. 자세한 내용은 [MediaWiki에서 Full text 검색](https://pinedance.github.io/blog/2018/08/07/full-text-search-on-mediawiki-with-cirrussearch-and-elasticsearch)에서 설명한 바 있다.

위키에서 생각보다 민감한 문제는 문서의 이름이다. 문서 이름이 일종의 ID 역할을 하고, 내부 링크에서도 사용되기 때문에 신중하게 정해야 한다. 특히 동의어 같은 경우는 처리하기 어렵다. 우리 프로젝트 같은 경우에서는 고민 끝에 `한글(한자)` 형태로 문서 제목을 정하기로 했다. 한글만으로 하면 같은 문서들이 너무 많이 양산되고, 한자만으로 하면 한글로 검색할 때 제목이 누락되는 문제가 생길 수 있기 때문이다.

이렇게 했을 때 문제는 내부링크이다. 내부링크를 걸 때 일일이 `[[한글(한자)]]` 형태로 적어 주어야 한다. 상당히 번거롭다. 그래서 우리 프로젝트에서는 `한자`가 제목인 문서를 만들어 `한글(한자)`가 제목인 문서로 redirect 해 주는 전략을 생각해 냈다. 이렇게 하면 내부링크를 `[[한자]]`로 잡아 주어도 본 문서를 찾아가게 된다. 예를 들어, `홍길동(洪吉洞)`이라는 제목의 본 문서를 만든 뒤 `洪吉洞`이라는 문서를 만들어 앞의 문서로 redirect 해 준다. 이렇게 두 문서를 만들어 두면 내부링크를 걸 때 `[[홍길동(洪吉洞)]]`라고 하든 `[[洪吉洞]]`라고 하든 결과적으로 모두 같은 페이지로 가게 된다.

문제는 매 번 신규 문서를 만들때 redirect 문서를 같이 만들어줘야 한다는 점이다. 크게 번거롭지는 않지만, 잊는 경우가 많다. 신규 문서가 저장될 때 제목에 `()`가 있다면 그 안의 문자열을 잡아 redirect 문서를 만들주는 간단한 자동화 기능이 간절했다.

사실 php까지 건드리고 싶지 않아 외면해 두었는데, 주말에 시간이 나서 좀 찾아 보았다. php 문법은 그리 생소하지 않았다. 그러나 mediawiki extension 만드는 방법이 어디에도 시원하게 나와있지 않았다. 너무 간단하거나 너무 방대했다. 이 글은 이러한 상황에서 내가 한 삽질을 기록하기 위함이다.

***

mediawiki extension을 만들기 위해서는 먼저 규약에 맞게 폴더와 파일들을 만들어 줘야 한다. 전반적인 아웃라인은 [How to become a MediaWiki hacker/Extension Writing Tutorial](https://www.mediawiki.org/wiki/How_to_become_a_MediaWiki_hacker/Extension_Writing_Tutorial)에 정리되어 있다. 물론 모두 영어로 적혀 있으나, 코드 위주로 보면 어렵지 않게 이해할 수 있다. 이 과정에서 관건은 `extension.json`을 만드는 일인데, [mediawkik / Manual:Developing_extensions](https://www.mediawiki.org/wiki/Manual:Developing_extensions)에 example boiler plate가 나와 있으니 어렵지 않게 극복할 수 있다.

본격적으로 mediawiki extension을 만들기 위해서는 mediawiki의 hook과 class를 알아야 한다. 전자는 일종의 event 같은 것으로, mediawiki에서 특정 작업을 수행한 뒤에 발생시킨다. extension에서는 해당 hook을 triger 삼아 원하는 기능을 실행시킨다. hook은 [mediawkik / Manual:Hooks](https://www.mediawiki.org/wiki/Manual:Hooks)에 비교적 잘 정리되어 있다. 나의 경우에는 페이지가 저장될 때 기능을 작동시켜야 했기 때문에 [PageContentSave](https://www.mediawiki.org/wiki/Manual:Hooks/PageContentSave)를 이용하였다.

다음으로는 php 코드로 mediawiki page를 다루려면 mediawiki의 class를 알아야 한다. [mediawiki Documentation](https://doc.wikimedia.org/)에 정말 잘 정리되어 있지만, 어마어마하게 방대하다. 특히 보아야할 문서는 [mediawiki Documentation / wiki core php](https://doc.wikimedia.org/mediawiki-core/master/php/)인데, 그림도 나오고 api도 모조리 설명되어 있지만, 내용이 많아 어떻게 사용해야 할지 막막하게 느껴진다.

따라서 비슷한 기능이 있을 법 한 extension을 찾아서 코드를 열어 보는 수 밖에 없었다. 페이지를 자동으로 생성해주는 extension으로는 다음과 같은 것들이 있어 참고할 수 있었다. mediawiki에 공개된 extension 코드들은 모두 [여기](https://gerrit.wikimedia.org)에 있다.

* [Extension:Auto Create Category Pages](https://www.mediawiki.org/wiki/Extension:Auto_Create_Category_Pages)
* [Extension:AutoCreatePage](https://www.mediawiki.org/wiki/Extension:AutoCreatePage)

가장 도움이 되었던 것은 [stackoverflow](https://stackoverflow.com/a/31277944)에서 알려준 [AutoCreatePage.php](https://goo.gl/X29A5v)의 코드였다. 해당 코드에서 페이지를 새로 만드는 부분만 적어 보면 아래와 같다.

```php
// String $pageTitleText 라는 이름으로 Title 객체 생성
$pageTitle = Title::newFromText( $pageTitleText );

if ( !is_null( $pageTitle ) && !$pageTitle->isKnown() && $pageTitle->canExist() ){
	// Title $pageTitle 객체로 새로운 wikipage 객체 생성
	$newWikiPage = new WikiPage( $pageTitle );
	// String $pageContentText를 내용으로 하는 Content 객체 생성
	$pageContent = ContentHandler::makeContent( $pageContentText, $sourceTitle );
	// 새로 만들어진 wikipage 객체의 Content를 수정함
	$newWikiPage->doEditContent( $pageContent,
		"Page created automatically by parser function on page [[$sourceTitleText]]" ); //TODO i18n
}
```

mediawiki의 각 부분은 대부분 객체(object)로 되어있다. 따라서 그냥 string 만으로 제목이나 본문 내용을 채울 수 없고, 정해진 class method를 이용해서 객체로 만들어 준 뒤에 사용할 수 있다. 그런데, 각 class 별로 생성하는 방식이 조금씩 달랐다. 문자열로 Title 객체를 생성할 때는 `Title::newFromText`라는 class method를 이용 했는데, 문자열을 이용해 Content 객체를 만들 때는 `Content::newFromText`가 아니라 ContentHandler라는 별도의 class method인 `ContentHandler::makeContent`를 이용해야 했다. 뭐 나름의 이유가 있을 것이라고 생각되지만, 직관적이지는 않았다.

* Title class의 [사용법](https://www.mediawiki.org/wiki/Manual:Title.php) 및 [상세 문서](https://doc.wikimedia.org/mediawiki-core/master/php/classTitle.html)
* ContentHandler class의 [상세 문서](https://doc.wikimedia.org/mediawiki-core/master/php/classContentHandler.html)

아무튼 페이지를 만들고 페이지 내용을 업데이트 하는 것은 대략 위의 코드를 기본으로 삼으면 된다.

이렇게 흩어진 정보들을 전전하여 결국 위에서 의도한 extension을 만드는데는 성공하였다. 해당 코드는 [github / AutoGenRedirect](https://github.com/pinedance/AutoGenRedirect)에 공개되어 있다.
