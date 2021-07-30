---
title: M1MacでGatsbyやNext.jsを使う
date: "2021-07-30"
tags:
  - M1
  - Gatsby
  - Next.js
  - React
---

M1Macで`gatsby-starter-blog`を使ってブログを作成し始めようとしたところ、このエラーが出ました。
```
Loading chunk node_modules_gatsby-plugin-image_dist_lazy-hydrate-6a6da979_js failed. (error: http://localhost:8000/node_modules_gatsby-plugin-image_dist_lazy-hydrate-6a6da979_js.js)
```
色々調べてみると、画像変換に必要なnpmパッケージがarm64に対応していないみたいです。x64版のNode.jsを使えばいいのですが、以下の手順がおすすめです。
```
arch -x86_64 /bin/zsh #amdアーキテクチャに切り替え
nvm i v14.17.3 #node.jsのv14のものをインストール(nvmを使用しているが、他のパッケージマネージャーでも同様)
exit #armプロセスに戻す
nvm use v14.17.3 #インストールしたバージョンのnodeに切り替え
```
Nodeのv14系はARMに対応していないので、これで強制的にx64版のNodeでGatsbyを動かせるようになりました。
これでエラーを吐かずに正常に動くようになりました。

今回はnvmでやりましたが、[Volta](https://volta.sh/)を使うとプロジェクトごとにnodeのバージョンを指定できるみたいなので、GatsbyではNode14系を、Vue等ではNode16系を使うというのが簡単にできるようになると思います。いつか使いたい。