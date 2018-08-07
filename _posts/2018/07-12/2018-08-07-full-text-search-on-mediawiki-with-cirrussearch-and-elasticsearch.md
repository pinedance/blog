---
layout: post
title:  "MediaWiki에서 Full text 검색"
categories: 코딩삽질기
---

> MediaWiki에서 Full text 검색을 위해 CirrusSearch와 Elasticsearch를 이용하는 방법을 기록해 둔다.

## 배경

작년부터 mediawiki를 활용하여 프로젝트 결과물들을 정리해 보고 있다. 사용해 보니 여러가지 목적으로 사용 가능하고, 무료인데다 완성도도 높아 만족스러웠다.

하지만 검색 기능은 많이 부족했다. mediawiki의 [기본 검색은 단어 검색만 지원한다](https://www.mediawiki.org/wiki/Help:Searching). 따라서 한글이나 한문의 경우 검색 결과가 누락되는 경우가 많았다. 예를 들어 "완성도도"라고 검색하면 이 페이지가 검색되지만, "완성도"라고 검색하면 나오지 않을 수도 있다.

우리 팀에서 진행 중인 프로젝트의 경우에는 한문이 많이 사용된다. 한문은 띄어쓰기를 하지 않기 때문에 하나의 단어가 형식적으로 표현되지 않는다. 따라서 검색 결과의 누락이 더 심각한 문제로 대두되었다.

오늘 그 해결책을 찾게 되어 기록해 둔다.

전부터 이 문제에 대해 구글신에게 신탁을 하였으나, 왠일인지 특별한 설명이 없었다. 이는 "잘 알려진 해결책이 이미 제시되어 있는데, 나만 모르는 경우"일 가능성이 크다. 이번에도 역시나 그러했다.

MediaWiki와 관련된 자료들은 대부분은 영어로 작성되어 있다. 영어가 짧아서 일단 설명이 길면 넘어가는 버릇이 있는데, 이번에도 그렇게 넘긴 문서들 중에 해결책이 있었다. [Help:CirrusSearch](https://www.mediawiki.org/wiki/Help:CirrusSearch)라는 공식 문서에 버젓이 정리되어 있는데 몰랐던 것이다. 이를 보면 Wikimedia Foundation에서 모든 Wikimedia project에  CirrusSearch를 사용하고 있다고 한다. MediaWiki를 사용한다면 필수적으로 사용해야할 기능이겠다.

해당 문서는 매우 길다. CirrusSearch의 모든 기능이 정리되어 있기 때문이다. 필요한 부분만 찾아 읽어보기로 하고, 우선 설치를 해 보자. 설치에 대해서는 별도의 문서인 [Extension:CirrusSearch](https://www.mediawiki.org/wiki/Extension:CirrusSearch)에 정리되어 있다. 그럼에도 여기서 글을 끝내지 못하는 것은 도처에 도사리고 있는 Error들과 공식 문서에서 꼭집어 말해주지 않는 문제들 때문이다.

## 개요

결론부터 말하자면, 기본 검색 기능이 불만족스럽다면 MediaWiki에 Full text 검색을 지원하는 검색 엔진을 따로 달아야 한다. 검색 엔진은 [`ElasticSearch`](https://www.elastic.co/)이며, MediaWiki와 통신하기 위해 [`CirrusSearch`라는 MediaWiki extension](https://www.mediawiki.org/wiki/Extension:CirrusSearch)을 설치해야 한다.

조금 더 자세히 말하자면 우선 시스템 위에 MediaWiki와 ElasticSearch가 돌아가게 해야 한다. MediaWiki는 PHP 기반이고, ElasticSearch는 Java 기반이기 때문에 각각의 환경들이 전제 되어 있어야 한다.

MediaWiki와 ElasticSearch는 서로 독립된 프로그램이기 때문에 MediaWiki에서 ElasticSearch를 제어하기 위한 확장 기능이 필요한데, 이것이 CirrusSearch이다. CirrusSearch는 PHP에서 ElaticSearch를 제어하는 Elastica라는 package를 의존하고 있으므로 함께 설치해 주어야 한다.

이를 그림으로 나타내 보면 아래와 같다.

```

MediaWiki    ↔   CirrusSearch    ↔    Elastica     ↔    ElasticSearch
------------------------------------------------       -------------------
                     PHP                                     JAVA
--------------------------------------------------------------------------
                                    OS

```

## ElasticSearch 설치

MediaWiki 버전에 따라 설치해야 할 ElasticSearch 버전이 달라진다. 공식 문서의 설명은 다음과 같다.

```
MediaWiki 1.28.x requires ElasticSearch 2.x.
MediaWiki 1.29.x and 1.30.x require ElasticSearch 5.3.x or 5.4.x.
MediaWiki 1.31.x requires ElasticSearch 5.5.x or 5.6.x.
```

따라서 최신판을 기준으로 설치하면 안되고, 이전 버전을 다운로드 받아 수동으로 설치하는 순서를 밟아야 한다. ElasticSearch 설치에 대해서는 [관련 포스트]({{site.baseurl}}/{% post_url 2018-08-06-install-elasticseach %})를 참고하자.

MediaWiki 버전, Extension 설치 여부는 MediaWiki 특수 페이지에서 확인이 가능하다.

```
https://mywiki.mediawiki.org/Special:Version
```

## MediaWiki Extension 설치


### Elastica 설치

Elastica는 PHP에서 Elasticsearch를 제어하는 package이다. 설치 방법은 다음과 같다.

1. 해당 package를 다운로드 받아 MediaWiki Extension folder 아래 넣는다.
2. MediaWiki의 `LocalSettings.php` file에 `wfLoadExtension( 'Elastica' );`라는 줄을 추가해 준다.
3. Elastica 폴더에서 아래 명령을 실행시킨다.

```bash
composer install --no-dev
```

### CirrusSearch 설치

CirrusSearch는 MediaWiki에서 Elastica를 통해 Elasticsearch를 제어하는 package이다. 설치 방법은 아래와 같다.

1. 해당 package를 다운로드 받아 MediaWiki Extension folder 아래 넣는다.
2. indexing을 만들어 주고, MediaWiki의 검색 기능을 CirrusSearch로 넘겨준다.

두 번째 단계는 공식 문서에는 설명되어 있지 않고 [readme file](https://phabricator.wikimedia.org/source/extension-cirrussearch/browse/master/README)에 따로 정리되어 있어 찾기 어려웠다. 해당 내용을 요약하면 다음과 같다.

첫째, MediaWiki의 `LocalSettings.php` file에 아래 코드를 추가한다.

```php
require_once( "$IP/extensions/CirrusSearch/CirrusSearch.php" );
$wgDisableSearchUpdate = true;
```

둘째, Elasticsearch Index Config를 구성해 준다.

```bash
php $MW_INSTALL_PATH/extensions/CirrusSearch/maintenance/updateSearchIndexConfig.php
```

구성이 끝나면 `LocalSettings.php`에서 `$wgDisableSearchUpdate = true`라고 되어 있는 부분을 제거하거나 각주처리 해준다.

셋째, Elasticsearch Search Index 를 구성해 준다. index를 구성하는 작업으로 시간이 좀 걸린다.

```bash
php $MW_INSTALL_PATH/extensions/CirrusSearch/maintenance/forceSearchIndex.php --skipLinks --indexOnSkip
php $MW_INSTALL_PATH/extensions/CirrusSearch/maintenance/forceSearchIndex.php --skipParse
```

넷째, 구성이 끝나면 MediaWiki 검색 기능을 CirrusSearch를 사용하도록 `LocalSettings.php`에 다음 코드를 추가한다.

```php
 $wgSearchType = 'CirrusSearch';
```

설치가 끝났으면 `https://mywiki.mediawiki.org/Special:Version` 페이지에 extension들이 표시되는지 확인 한 후, 검색을 통해 검색 결과를 확인해 본다.
