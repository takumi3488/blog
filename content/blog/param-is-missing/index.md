---
title: "[Rails]「param is missing or the value is empty:」のエラーの本当の解決方法"
date: "2021-08-20"
tags:
  - Rails
---


表題の`param is missing or the value is empty`のエラーなのですが、検索すると次々と見慣れない解決策(ストロングパラメータの`require(:モデル名)`の部分を消す方法)が出てくることで有名です。例えば、以下のような記事が出てきます。
- [【Rails】param is missing or the value is empty:について](https://qiita.com/Takka_Log/items/32dae78d7e3892e7b051)
- [【Rails6】param is missing or the value is empty: postで少し詰まったが無事解決](https://qiita.com/kazuki13070311/items/cdd4917af204e00de001)
- [param is missing or the value is empty: user](https://manabu-ito.hatenablog.com/entry/2021/01/22/220608)

これらの記事が検索上位に出てきてしまうため、初学者にとって学習の妨げになるのではないかと思い、この記事を執筆することにしました。

## 解決策
扱うモデル名は、ここでは`Post`としておきます。
コントローラに
```rb:title=posts_controller.rb
@post = Post.new
```
と書き、viewは
```erb:title=posts/new.html.erb
<%= form_with model: @post do |f| %>
```
などとしましょう。
あるいはコントローラにインスタンス変数を用意せずにviewに直接
```erb:title=posts/new.html.erb
<%= form_with model: Post.new do |f| %>
```
と書いても良いです。
こうしてるはずなのにエラーが出る、といった場合にはコントローラとviewで定義している変数名に間違いがないかを調べてみてください。単純にコントローラの記述が抜けていたり、複数形になってしまっていたり、モデル名によってはスペルミスがあったりするかもしれないので慎重にチェックしましょう。

## なんでこれで治るの？
例えば`Post`モデルに`title`カラムがあったとしましょう。
前述した正しい記述の状態で、ターミナル上のログを見ると
```
<ActionController::Parameters {(略),"post"=>{"title"=>"5", "commit"=>"Save", "controller"=>"posts"}, "action"=>"create"} permitted: true>
```
のようになっているはずです。コントローラに`@post = Post.new`を書き忘れたりした場合には、
```
<ActionController::Parameters {(略),"title"=>"5", "commit"=>"Save", "controller"=>"posts", "action"=>"create"} permitted: true>
```
となるでしょう。
違いは`"post"=>{}`の中に`"title"`があるか、裸のまま`"title"`が置かれているかです。
つまり、`form_with`でモデルがちゃんと指定できていれば、パラメータは`{ モデル => { カラム => そのカラムの値 } }`のようになるということです。`form_with`でモデルが指定できていなければ`{ カラム => そのカラムの値 }`だけですね。
続いてストロングパラメータを見ましょう。
```rb:title=posts_controller.rb
params.require(:post).permit(:title)
```
こいつの意味は、「`params`(≒前述したターミナルログのパラメータ)の中から`post`を探し、その`post`の中から`title`を探す。そしてその`title`の保存を許可する」くらいの意味です。
よく挙げられるおかしな解決策(`require(:post)`を消す方法)と比べてみましょう。
```rb:title=posts_controller.rb
params.permit(:title)
```
こいつの意味はもちろん、「`params`(≒前述したターミナルログのパラメータ)の中から`title`を探す。そしてその`title`の保存を許可する」です。
もうお分かりいただけたでしょうか。**`form_with`でモデルが指定できていないとき、パラメータにモデル名が含まれていないので`require(:モデル名)`を消すと上手くいく**というのが、この解決策が蔓延っている原因です。

ここまでの説明をまとめます。

```
解決策1
form_withでモデルが指定されている
↓
パラメータにモデル名が含まれる
↓
require(:モデル名)が必要

解決策2(先ほど「おかしな解決策」と呼んだ方法)
form_withでモデルが指定されていない
↓
パラメータにモデル名は含まれない
↓
require(:モデル名)は消さなければならない
```

初学者の方はrequireを消す方法など、教材やチュートリアルで勉強していないと思うので解決策2の方は忘れて、この記事で説明した1の方の解決策を使いましょう。
また、補足項で述べますが、単に解決策1の方が優れているので初学者でなくても解決策1を使うべきです。

### 補足1
冒頭にあげさせていただいた*おかしな解決策*を提示している記事については、指摘して修正をうながすのが筋だとは思いますが、1つ目にあげさせていただいた[【Rails】param is missing or the value is empty:について](https://qiita.com/Takka_Log/items/32dae78d7e3892e7b051)の著者はすでにQiitaから離れているようで、修正が見込めませんでした。一応コメントでは指摘させていただいているので、この記事を訪れた方がコメント欄まで確認してくれれば認識を正すこともできるのですが、そのような方はあまり多くないというのが僕の印象です。
他の記事の著者は最近も活動していそうなので指摘することもできますが、検索時に一番上に出てくる上記の記事と内容がほぼ同じなので、一旦は上記の記事のみコメントで指摘するのみに留めています。

### 補足2
記事の最後で`require(:モデル名)`を消す方法より、`form_with`でモデルを指定する方法が優れていると言いました。理由としては

- Railsの機能の遍歴から推測するに
  - モデルを指定する→保存するためのデータを送るフォーム
  - モデルを指定しない→保存はしないが一時的に使うデータを送るフォーム

  として設計されているから
- updateを実装するときに困るから

前者の方は`form_for`や`form_tag`について調べてもらうとして、後者の方は単純です。
データをupdateするにはどのデータをupdateするのかを指定する必要があり、その指定の仕方として最も簡単なのが、`form_with`のmodelにデータを渡すことだからです。
コントローラ側で
```rb:title=posts_controller.rb
def edit
  @post = Post.find(params[:id])
end
```
として、viewで
```erb:title=posts/new.html.erb
<%= form_with model: @post do |f| %>
```
とするだけです。(`create`では`@post = Post.new`でした。)
`create`を実装する際にストロングパラメータから`require`を消してしまっていると、`update`で`form_with`にモデルを指定することが出来ずに困ります。
もちろん、モデルを指定せずに`update`機能を実装する方法もなくはないのですが、このスマートなやり方に比べると幾分も冗長です。`link_to`を使えばラクなところを、あえて`aタグ`を使うようなもの、といえば分かりやすいでしょうか。