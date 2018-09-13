---
layout: post
title:  "Atom autocomplete 기능에 원하는 내용을 추가해 보았다."
categories: 코딩삽질기
---

몇 년 전부터 Github에서 만든 atom이 더 많은 유저들의 사랑을 받고 있다. 나 역시 atom을 사용한다. 세세한 기능들까지 모두 사용할 줄 아는 것은 아니지만, 깔끔한 외관에 기본적인 기능에 충실하다는 면이 마음에 든다.

atom에서 코딩 외에도 문서 작성을 즐겨 사용하는 편이다. 예전에는 아래한글(HWP)을 사용해 왔는데, 너무 폐쇄적인 시스템이라 파일을 밖에서 조작하는 것이 거의 불가능하다는 문제가 있다. 예를 들어 한 번 만들어진 문서에서 어떤 부분을 일괄적으로 바꾸어야 할 경우 정규식도 제한적으로 지원하기는 하지만 상당한 수고를 치루어야 한다.

이런 이유 때문에 markdown으로 plain text로 문서를 작성하는 편이 더 마음 편할 때가 있다. 근래에 [typora](https://typora.io/)라는 markdown 전용 에디터도 나와서 html, pdf 등으로 export까지 할 수 있게 되었다.

하지만 한글 문서에서 익순한 `한자 변환`이라던지, `《》`과 같은 특수 문자를 입력하는데 불편함이 있었다. windows를 사용할 때는 그럭저럭 윈도우 자체의 입력 기능을 이용할 수 있지만, mac 등을 이용할 때는 작업 능률이 많이 떨어진다.

그러던 중에 atom에 있는 자동완성기능(autocomplete)에 있는 api를 통해 package를 만들어 사용할 수 있다는 사실을 알게 되었다. 약속 문구를 넣고 snippet으로 바꾸는 atom autocomplete의 고유 기능을 이용하여 한글을 한자로 바꾸거나 키보드의 기호를 조합하여 특수 기호를 입력하는 것이 가능하다.

AUTOCOMPLETE 기능의 커스터마이징은 아래의 구조로 작동하게 된다. 즉, atom 자체가 아니라 atom의 core package인 [atom autocomplete plus](https://github.com/atom/autocomplete-plus) 의 API를 통해 내 package를 싣는 형태다. atom autocomplete plus의 API는 [atom autocomplete plus / wiki](https://github.com/atom/autocomplete-plus/wiki)에 정리되어 있다.

```
Atom ↔ AtomAutocompletePlus ↔ MyCustomPackage
```

위의 API 설명만으로는 원하는 기능을 추가하기 쉽지 않다. 다행스럽게도 선행 삽질을 수행한 착한 사마리아인이 전반적인 내용을 [CREATING AN AUTOCOMPLETE PLUG-IN FOR ATOM](https://codersblock.com/blog/creating-an-autocomplete-plug-in-for-atom/)라는 포스트로 설명해 놓았다. 이 착한 사마리이안은 심지어 [autocomplete-boilerplate](https://atom.io/packages/autocomplete-boilerplate)라는 뼈대도 만들어 공개해 놓았다. 이 코드들을 보면 단순변환부터 snippet변환까지 3가지 방법을 제시하고 있는데, 필요에 따라 선택하여 사용하면 된다. 나의 경우에는 snippet처럼 입력되어야 하기 때문에, 해당 코드 중 `advanced-provider.js`를 변형시켜 이용하였다. 이 코드에서는 snippet data를 온라인에서 받아 promise를 통해 적용 시키는데, 나의 경우에는 data가 워낙 커서 그렇게 하기에는 무리가 따랐다. 따라서 package 내에 포함시켜 적용해 보았다.

대략적인 구조는 다음과 같다.

```javascript
class kor2hanziProvider {

	constructor() {
		// offer suggestions only when editing plain text or markdown files
		this.selector = '.text.plain, .text.plain.null-grammar, .source.gfm';

		// except when editing a comment within an HTML file
		this.disableForSelector = '.text.html.basic .comment';

		// make these suggestions appear above default suggestions
		this.suggestionPriority = 2;
	}

	getSuggestions(options) {
		...
		return suggestions
	}

	inflateSuggestion(replacementPrefix, suggestion) {
		return {
			replacementPrefix: replacementPrefix, // ensures entire prefix is replaced
			displayText: suggestion.name || suggestion.target,
			snippet: suggestion.target,
			type: 'snippet',
		};
	}

	onDidInsertSuggestion( options ) {
		atom.notifications.addSuccess( options.suggestion.displayText + ' was inserted.' );
	}
}
export default new kor2hanziProvider();
```

이 코드의 핵심은 3가지 이다. 먼저 `constructor`에서는 적용할 문서와 텍스트의 범위를 정해 주고, `getSuggestions`에서는 사용자가 정한 규칙에 따라 제안할 객체들을 도출하여 return한다. 마지막으로 `inflateSuggestion`에서는 입력된 문자열과 제안할 객체를 받아 제안화면에 표시될 내용과 바꾸기가 선택 되었을 때 입력되는 정보를 객체로 만들어 반환해 준다.

해당 코드들은 [zayo-atom-autocomplete-hanzi](https://github.com/pinedance/zayo-atom-autocomplete-hanzi)에 공개되어 있다.

개인적으로 코드들이 ES6 기준으로 만들어 졌기 때문에 import나 [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) 등 다소 생소한 문법이 있었지만, 다른 언어들에서 이미 사용되고 있었던 형태이기 때문에 이해하는데는 크게 무리가 없었다.
