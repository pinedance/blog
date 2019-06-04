---
layout: post
title:  "Elasticseach를 설치해보자"
categories: 코딩삽질기
---


## Elasticseach 설치

[ElasticSearch 설치 설명 문서](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html)가 매우 잘 되어 있다. 그대로 따라하면 될 정도이다. 여기에서는 몇가지만 기록해 두고자 한다.

특정 버전을 수동으로 다운받아 설치하는 경우를 가정하고 코드만 간략히 적어 본다.

```bash
# ElasticSearch 5.4.3 버전 설치를 가정함
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.4.3.deb
sudo dpkg -i elasticsearch-5.4.3.deb
```

브라우저에서 다운로드 할 경우에는 [Past Releases](https://www.elastic.co/downloads/past-releases) 페이지에서 해당되는 버전을 다운로드 받아 설치한다.

ElasticSearch도 하나의 동립된 Server이기 때문에 부딩될 때 자동실행되어야 한다. 이에 대해서는 OS 상황에 따라 방법이 다르다. `ps -p 1`를 실행시켜 `init`이라고 나오는지 `systemd`라고 나오는지에 따라 아래와 같이 실행시켜 준다. elasticsearch 구동 방법도 양자가 다르다. 부팅 시 자동실행에 대해서는 [이 글](https://pinedance.github.io/blog/2017/09/12/Ubuntu-16.04-system-service-%EB%93%B1%EB%A1%9D%ED%95%98%EA%B8%B0)을 참고.

```bash
# init의 경우
## 자동실행을 위한 service 등록
sudo update-rc.d elasticsearch defaults 95 10

## service 제어
sudo -i service elasticsearch start
sudo -i service elasticsearch stop
sudo -i service elasticsearch status
```

```bash
# systemd의 경우
## 자동실행을 위한 system demon 등록
sudo /bin/systemctl daemon-reload
sudo /bin/systemctl enable elasticsearch.service

## service 제어
sudo systemctl start elasticsearch.service
sudo systemctl stop elasticsearch.service
sudo systemctl status elasticsearch.service
```

설치와 실행이 잘 되었는지 확인해 보자.

```bash
# systemd의 경우, system demon 상태 확인
sudo systemctl status elasticsearch.service
# systemd의 경우, log 확인
sudo journalctl --unit elasticsearch
# init의 경우, service 상태 확인
sudo -i service elasticsearch status
# server 동작 확인
curl -v localhost:9200
```

문제 없이 동작한다면, 잘 실행되고 있는 것이다.

## Trouble shooting

발생할 수 있는 몇 가지 문제와 해결책을 적어 본다.

### Java가 설치되어 있지 않은 경우

Elasticsearch는 Java 위에서 동작하게 되어 있기 때문에 machine에 JRE나 JDK가 설치되어 있어야 한다. `java -version`을 하여 설치를 확인한 뒤에, 설치되지 않았다면 설치한다. (설치 방법은 생략)

### 메모리가 부족한 경우

Elasticsearch 실행 시 `Cannot allocate memory`라는 에러 메시지가 나올 수 있다. Elasticsearch는 기본적으로 2G의 메모리를 할당하는데, 규모가 작은 서버의 경우에는 메모리가 부족하여 실행되지 않는다. 이 메시지는 Java 실행 시 메모리 할당 옵션을 주어 해결할 수 있지만, Elasticsearch가 Java를 호출하는 구조이기 때문에 [Elasticsearch의 JVM setting을 수정하여 해결해야 한다](https://stackoverflow.com/questions/29447434/elasticsearch-memory-problems).

`/etc/elasticsearch/jvm.options` 파일을 열어 메모리와 관련된 파라메터를 다음과 같이 수정한다.

```
-Xms512m
-Xmx512m
```
