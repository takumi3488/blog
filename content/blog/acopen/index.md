---
title: "コマンドラインからAtCoderの問題ページを開くライブラリを作った"
date: "2022-03-25"
tags:
  - 競プロ
  - CLI
  - Rust
---

コマンドラインから

```sh
$ acopen a
```

こんな感じで問題ページを開けるライブラリを作りました。

これは自分用なのですが、

```sh
$ acopen a -s
```

こうすればRustでACした他人の解答を、コード長が短い順にソートしたページをブラウザで開けます。

使い方は[README](https://github.com/takumi3488/acopen/blob/main/README.md)を読んでください。

## 想定される質問と回答

### cargo-compete使えば良いじゃん

READMEにも書いてますが、cargo-competeを何らかの理由で使いたくなくて、cargo-atcoderを使ってる人向けのライブラリです。

### cargo-atcoderにプルリク送れば？

あんまりメンテしてないっぽいんですよね……。

### プルリク送らないにしてもフォークしてcargo-atcoderに機能追加すればよくない？

論破すな。

そんな感じで、cargo-atcoderを使っている方はぜひ併せて使ってみてください。
