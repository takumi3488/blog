---
title: M1MacにてDockerでSeleniumを使う
date: "2021-07-29"
tags:
  - M1
  - Selenium
  - Docker
---

ある日、僕はSeleniumをDocker上で動かしたいと考えました。

ブラウザが更新される度にDriverも更新しなきゃいけないのが面倒だし、開発環境の都合上PythonをDockerで使いたかったので、SeleniumもDockerで動かせると便利だな〜と思ったからです。

そこで軽く調べてみると、なんと[Selenium開発チームがDocker image](https://hub.docker.com/r/selenium/standalone-chrome)を出しているではありませんか。
これを使わない手はないぞと思い、さっそく使い始めました。


```Dockerfile:title=Dockerfile
FROM python:3.10.0b4

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

CMD [ "python", "./main.py" ]
```


```yml:title=docker-compose.yml
version: '3'
services: 
  python:
    build: .
    volumes: 
      - .:/usr/src/app
    depends_on: 
      - selenium
    command: bash
    tty: true
  selenium:
    image: selenium/standalone-chrome
    ports: 
      - 4444
    shm_size: 2gb
```


```py:title=main.py
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
driver = webdriver.Remote(
  command_executor='http://selenium:4444', options=options)
driver.close()
```
とりあえず、これだけで実行してみますがエラーが出ます。
Dokcerダッシュボードを見てみると、`amd64`という警告メッセージが出ています。
`amd64`というのはCPUアーキテクチャの1種です。
今回使用しているM1 Macのアーキテクチャは`arm64`ですので別物です。ぱっと見た感じ同じに見えるので紛らわしいですね。
[dockerhub](https://hub.docker.com/r/selenium/standalone-chrome)のTagsで対応アーキテクチャが見えるのですが、amd64用がずらっと並んでいてarm64用はありません。


どうしましょう。解決策は2パターンあります。
- Selenium開発チームが公開しているDockerfileを書き換える
- 誰かが公開してくれているDocker imageを探す


前者から考えてみましょう。
dockerhubのOverviewにGithubのURLが載っているので、そこからDokcerfileを探しにいきます。


まず、[StandaloneChromeのDockerfile](https://github.com/SeleniumHQ/docker-selenium/blob/trunk/StandaloneChrome/Dockerfile)をチェックしましょう。
```Dockerfile:title=Dockerfile
FROM selenium/node-chrome:4.0.0-rc-1-prerelease-20210713
```
Seleniumが出している他のimageに依存しているようです。このimageも同じレポジトリにDockerfileが載っているので読んでみますが、また他のSelenium製のimageをベースに作成されていることがわかります。さらに辿っていくと、何度かたらい回しにされた後、最終的に[このDockerfile](https://github.com/SeleniumHQ/docker-selenium/blob/trunk/Base/Dockerfile)に辿り着くはずです。
このDockerfileまでに辿ってきたDockerfileのどこかに、`amd64`でしか使えないコマンドやパッケージがあるので、`arm64`でも使えるものに書き換えましょう。

**はい、面倒臭いですね。**

ということで誰かが公開してくれているDocker imageを探してみましょう。
とりあえずissuesを開いてみると[ちょうどいい感じのissue](https://github.com/SeleniumHQ/docker-selenium/issues/1076)がありました。この中を探すと……[すぐ見つかりました](https://github.com/SeleniumHQ/docker-selenium/issues/1076#issuecomment-763017837)。`arm64`に対応したDocker imageを公開してくれている優しい人がいますね。Firefox版のみですが、気にする人はいないでしょう。

野良imageを使う時にはセキュリティリスクがないかを慎重にチェックしなければなりませんが、Selenium公式版からほとんど変わっていないのでcommit履歴を見れば安全なことはすぐわかると思います。
ではこのimageを使って動かしてみましょう。

```yml:title=docker-compose.yml
  selenium:
    image: henningn/selenium-standalone-firefox
```

僕はこれで問題なく動きました。皆様もよいSeleniumライフを。
