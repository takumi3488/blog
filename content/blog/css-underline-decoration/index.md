---
title: "[CSS]テキストの下線(アンダーライン)を太くしたい"
date: "2021-07-31"
tags:
  - CSS
---

CSSでテキストに下線を引く方法として、text-decorationを使ったものが有名です。
```html
<!-- index.html -->
<p class="sample-text">テキスト</p>
```
```css
/* style.css */
p.sample-text {
  text-decoration: underline;
}
```
こう書くと
<p style="text-decoration:underline;">テキスト</p>
こう表示されます。
色や形状もある程度アレンジが可能です。

```css
/* style.css */
p.sample-text {
  text-decoration: underline dotted #FF3490;
}
```
<p style="text-decoration:underline dotted #FF3490;">テキスト</p>
このように、点線にしたり色を変えたりできます。
しかし、線を太くしたい場合にはどうすればよいでしょうか。
例えば以下のようにマーカー風の線を引きたいときなどです。

<br>
<p style="border-bottom:solid 5px yellow;display:inline-block;">テキスト</p>

パッと思いつくのは、border-bottomeを使った方法です。

```css
/* style.css */
p.sample-text {
  border-bottom: solid 5px yellow;
}
```
実はこれだと線がながーく伸びてしまいます。
<p style="border-bottom:solid 5px yellow;">テキスト</p>
実はpタグのようなinlineの要素はデフォルトで横に伸びきってしまっています(ブラウザによるかも)。
これを回避するために、inlineじゃなくしてやりましょう。

```css
/* style.css */
p.sample-text {
  border-bottom: solid 5px yellow;
  display: inline-block;
}
```
これでうまくいきます。
<p style="border-bottom:solid 5px yellow;display:inline-block;">テキスト</p>
