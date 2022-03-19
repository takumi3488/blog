---
title: "[Rails7版]新しくアプリケーションを作成する時にやること"
date: "2022-01-31"
tags:
  - Rails
  - Tailwind
---

Rails7が正式リリースされてから1ヶ月近く経ちますが、ようやく本格的に触れたのでこれから共有していきます。

まず今回はアプリケーションを作成する際の話です。

網羅的に紹介する訳ではなく、あくまで僕個人が良いと思ったやり方やオプションについてのみ書いていくのでご了承ください。

## `Rails new`コマンドオプション

おすすめのオプションは以下の通りです。

```terminal
rails _7.0.1_ new app_name -T -c tailwind -d postgresql
```

- `_7.0.1_`はバージョンの指定。デフォルトが7.0.1になっていれば付けなくても良い
- `-T`はテストをスキップするオプション。テスティングライブラリはデフォルトだと`Minitest`なので`Rspec`を使う場合は付けた方が良い
- `-c tailwind`はCSSライブラリとしてTailwindを指定している。Node.js不要でCSSを勝手に必要な分だけ取ってきてくれる機能が新しく搭載されたので、今回は一番効果を実感できそうなこれを選んだ。
- `-d postgresql`はデータベースにPostgreSQLを選択している。デフォルトのSQLiteはActiveStorageなんかを使うと、仕様上の問題ですぐエラーが起きるのでPostgreSQLかMySQL等がおすすめ。今回は後でHerokuにあげたかったのでHeroku上で無料で使えるPostgreSQLを開発環境から使うことに

このコマンドでとりあえず作成できるはずです。

## 作成したらやること

Rails7だからという話ではないですが、PostgreSQLでRailsを作成したのでDBの設定をします。

一気に書きます。

```yml:title=docker-compose.yml
version: '3'

services:
  db:
    image: postgres:latest
    restart: always
    env_file:
      - .env
      - .env.development
    ports:
      - 5432:5432
    volumes:
      - ./data/development:/var/lib/postgresql/data
```

```txt:title=.env
POSTGRES_USER=admin
POSTGRES_PASSWORD=V8GrknqpuIEG4GjDWtPj8g
TZ="Asia/Tokyo"
```

```yml:title=database.yml
default: &default
  adapter: postgresql
  encoding: utf8
  username: <%= ENV["POSTGRES_USER"] %>
  password: <%= ENV["POSTGRES_PASSWORD"] %>
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  host: localhost

development:
  <<: *default
  database: myapp_development

test:
  <<: *default
  database: myapp_test

production:
  <<: *default
  database: myapp_production
  username: workbook_manager
  password: <%= ENV["MYAPP_DATABASE_PASSWORD"] %>
```

RailsはDocker化せずにDBだけDocker化するやり方で書いているので注意してください。RailsもDocker化する方法については今回は書きません。そのうち使う機会があれば記事にもしようと思います。

ちなみにDBだけDocker化すると、Railsが高速で動くこと、DBの作り直しが容易になることの2つのメリットが共存して快適になります。MacのDockerはめちゃくちゃ遅いですからね。

後はRailsで.envファイルを読み込むために、Gemfileに

```rb:title=Gemfile
gem "dotenv-rails"
```

を追加して、以下の手順で実行すればサーバーが起動します。

```terminal
bundle install # dotenv-railsをインストール
rails db:create # dbの作成
rails s
```

画像は載せませんが、起動画面が変わっていてカッコイイですね。

ちなみに起動コマンドを`rails s`ではなく`./bin/dev`にすると、TailwindのCSSを変更した時に、自動でCSSをビルドしてくれるようになるので、開発を進める際にはこっちを使うようにしましょう。

とりあえず最初の最初のところは以上です。また何か面白いことがあれば共有します。
