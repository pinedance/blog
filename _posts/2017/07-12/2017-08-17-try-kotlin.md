---
layout: post
title:  "Try, Kotlin"
categories: 코딩삽질기
---

## ☆

최근 Kotlin에 관심이 생겼다. 

java platform이 워낙 널리 사용되다보니 java VM에서 실행되는 언어를 배우고 싶었다. 

처음에는 functional programming도 배울 겸 해서 clojure에 도전해 보았는데, 괄호만 보다 나왔다. 

다음으로 대세 중에 대세인 JAVA를 시도해 보았는데, 문법에 적응하기가 어려웠다. 너무 번잡하달까... 코딩을 재미로 하고 있는 입장에서 `짜증 &gt 재미` 이런 느낌이었다. 

그러던 중 Kotlin을 알게 되었다. android 개발 공식 언어가 되면서 유명해 진 듯하다. 문법을 보니 JAVA보다 간결해서 해볼만 하다는 느낌이 들었다. 

## ☆

Kotlin과 관련된 문서는 충분히 있으므로, 간단히 ubuntu에서 실행하는 방법만 적어 본다. [공식 문서](https://kotlinlang.org/docs/tutorials/command-line.html)에 잘 정리 되어 있지만, 약간 고생했기 때문이다. 

나는 ubuntu에 java platform이 있는 줄 알고 kotlin compiler를 먼저 설치했는데, 알고 보니 없었다. 그래서 뒤이어 java platform을 설치했다. 그런데, 그럼 문제가 되는 듯하다. `kotlinc`, `kotlin`을 실행시켰더니 그런 프로그램이 없단다. 그래서 `sdk uninstall kotlin 1.1.4`로 제거한 뒤에 java platform을 설치하고 다시 kotlin을 설치해야 했다. 그리고 나서 문제가 해결되었다. 

### JAVA platform

따라서 kotlin compiler 설치 전에 java platform을 설치하자.  

bash에 `java -version`이라고 넣었을 때 나오는 것이 없다면, 설치해야 한다. 설치 방법은 [How To Install Java on Ubuntu with Apt-Get](https://www.digitalocean.com/community/tutorials/how-to-install-java-on-ubuntu-with-apt-get)에 자세히 나와 있다. `apt-get`을 이용해 설치할 수 있기 때문에 무척 쉬운 편이다. 다만 환경변수를 시스템에 넣어주는 것은 신경을 기울여야 한다. 

`jre`와 `jdk`는 목적에 따라 설치하자. 나는 `default-jdk`를 설치했다. ( 자바 개발 도구Java Development Kit )

```
sudo apt-get install default-jdk
```


### Kotlin Compiler

kotlin compiler는 [공식 문서](https://kotlinlang.org/docs/tutorials/command-line.html)에서 설명되어 있듯이 `sdkman`를 이용해 설치하였다. 

```
curl -s https://get.sdkman.io | bash
sdk install kotlin
```

참고로 `sdk help`라고 쳐보면 `sdk` 사용법을 알 수 있다. 

## ☆

Kotlin을 익히기 위해 참고할만 한 자료를 정리해 본다. 

개인적으로 새로운 언어를 배우는데 가장 좋은 방법은 작은 샘플 프로젝트를 처음부터 따라 해 보는 것이다. 언어 문법만 알려주는 tutorial로 기초를 정리할 수는 있지만 잘 기억되지 않기 때문이다. 하지만 그렇게 디자인 된 tutorial은 생각보다 많지 않다. kotlin은 android로 널리 알려진 만큼 android tutorial을 찾아 따라해 봐야겠다. 

### Official

[Kotlin Language Documentation Tutorial](https://kotlinlang.org/docs/tutorials/)

[Kotlin Language Documentation](https://www.gitbook.com/book/jetbrains/kotlin-reference-for-kindle/details)

[Get Started with Kotlin on Android](https://developer.android.com/kotlin/get-started.html)

[Resources to Learn Kotlin](https://developer.android.com/kotlin/resources.html)

### Book

[Kotlin in Action](https://github.com/panxl6/Kotlin-in-action/raw/master/ebook/Kotlin_in_Action_v12_MEAP.pdf)

[Kotlin for android developers](https://www.gitbook.com/book/sinadarvi/kotlin-for-android-developers/details)

[pluu's Kotlin 개인 정리](https://www.gitbook.com/book/pluu/kotlin/details)

### Tutorial

**Introduction**

[An Introduction to Kotlin](https://code.tutsplus.com/tutorials/an-introduction-to-kotlin--cms-24051)

[Learn Kotlin - Tutorial for Beginners](https://www.programiz.com/kotlin-programming)

[10 KOTLIN TUTORIALS FOR BEGINNERS: DIVE INTO KOTLIN PROGRAMMING / VIDEO COURSE](http://petersommerhoff.com/dev/kotlin/kotlin-beginner-tutorial/)

[Kotlin Tutorial / YOUTUBE](https://www.youtube.com/playlist?list=PLsyeobzWxl7rooJFZhc3qPLwVROovGCfh)

[Android Kotlin Programing / YOUTUBE](https://www.youtube.com/playlist?list=PLaoF-xhnnrRUEbF6cvk4-CeBAEOSbp8sS)

[Kotlin Tutorial for Beginners: Basics and Fundamentals for Android / YOUTUBE](https://www.youtube.com/playlist?list=PLlxmoA0rQ-LwgK1JsnMsakYNACYGa1cjR)

[Using Project Kotlin for Android](https://goo.gl/mzRDx3)

### Post

[안드로이드 공식 언어가 된 Kotlin을 알아보자](https://academy.realm.io/kr/posts/kotlin-official-android-language/)

* [안녕하세요. 코틀린 #1](https://goo.gl/MrzMx3)
* [예제로 배우는 아름다운 코틀린의 기능들:Ready for Production](https://academy.realm.io/kr/posts/kotlin-let-run-apply-lateinit/)
* [안드로이드 공식 언어 : 코틀린(Kotlin) 시작하기](https://www.udemy.com/the_next_android_kotlin/?couponCode=B-ARTICLE279933)

### Resources

[awesome-kotlin / github](https://github.com/mcxiaoke/awesome-kotlin)

[Kotlin link](https://kotlin.link/)


