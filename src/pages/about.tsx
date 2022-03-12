import React, { FC } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { AboutQuery } from "../../graphql-types"

const About: FC<{ data: AboutQuery }> = ({ data }) => {
  const social = data?.site?.siteMetadata?.social
  return (
    <Layout title="ABOUT">
      <Seo />
      <article
        className="p-6 max-w-full"
        itemScope
        itemType="http://schema.org/Article"
        id="markdown"
      >
        <header>
          <h1>ABOUT</h1>
        </header>
        <section>
          <p>
            WEB開発を主としていろんな情報を発信します。
            <br />
            RSSにも対応しています。
          </p>
          <p>
            特に開発経験(個人開発含む)があり、続けていきたいと感じた興味のある分野は以下の通りです。
            <br />
            興味が被っているものがあれば、お話しましょう！
          </p>
          <div className="p-4">
            <h2>サーバーサイド</h2>
            <ul>
              <li>
                Node.js(NestJS+Prisma)
                <ul>
                  <li>フロントもWebなら型共有ができて一番好き</li>
                  <li>GraphQLを実装するならHasuraかこれかの2択</li>
                  <li>
                    TypeORMとPrismaは選択が難しいけどPrismaの方がスキーマ力の差で好き
                  </li>
                </ul>
              </li>
              <li>
                Go(Gin)
                <ul>
                  <li>
                    M1+Dockerだとホットリロードライブラリが動かないので若干避け気味
                  </li>
                </ul>
              </li>
              <li>
                Python(FastAPI)
                <ul>
                  <li>AI / NumPy等の計算ライブラリと合わせるなら一択</li>
                  <li>FlaskやDjangoは型ヒントが効かない場面が多くて辛い</li>
                </ul>
              </li>
              <li>
                Ruby on Rails
                <ul>
                  <li>部分的に型を導入する書き方が結構快適</li>
                </ul>
              </li>
            </ul>
            <h2>Webフロントエンド</h2>
            <ul>
              <li>
                TypeScript
                <ul>
                  <li>前提</li>
                  <li>ライブラリはもちろん、ブラウザ拡張機能等にも使います</li>
                </ul>
              </li>
              <li>
                Next.js
                <ul>
                  <li>一番良い</li>
                  <li>完全に静的サイトにしないのであればこれ一択</li>
                  <li>
                    PlaywrightやCheerioみたいなNodeで動かせるスクレイピングツールが優秀なので、スクレイピングが必要な自分用のツールを作るときにEC2にVSCodeでSSHリモート開発してそのまま公開して使う、みたいなことができて楽。
                  </li>
                  <li>
                    普通にサービスを作成する時にもVercelやAmplifyでほぼ設定なしでCI/CDパイプラインが構築できて好き
                  </li>
                </ul>
              </li>
              <li>
                Gatsby
                <ul>
                  <li>このブログもGatsbyで作ってます</li>
                </ul>
              </li>
              <li>
                Remix
                <ul>
                  <li>SSRなのに本当に表示が速くて感動した</li>
                </ul>
              </li>
              <li>Rust(Wasm)</li>
            </ul>
            <h2>デスクトップアプリ</h2>
            <ul>
              <li>
                Tauri
                <ul>
                  <li>基本これ</li>
                </ul>
              </li>
              <li>
                Electron
                <ul>
                  <li>Nodeが欲しかったらこっち</li>
                </ul>
              </li>
            </ul>
            <h2>モバイルアプリ</h2>
            <ul>
              <li>
                Flutter
                <ul>
                  <li>SwiftやKotlinに比べて表なんかが作りやすくて良い</li>
                  <li>React Nativeに比べてもビルドエラーが少ない</li>
                </ul>
              </li>
              <li>
                Kotlin Native
                <ul>
                  <li>日本で僕だけしか使ってないのかと思うほど情報が少ない</li>
                  <li>それを除けば書き心地は結構良い</li>
                </ul>
              </li>
            </ul>
            <h2>科学計算</h2>
            <ul>
              <li>
                Julia
                <ul>
                  <li>基本的に新しく何か計算するならこれ</li>
                  <li>型がなくて補完が効かないのだけ辛い</li>
                </ul>
              </li>
              <li>
                Python
                <ul>
                  <li>
                    CSV等で実験データを解析してそのまま計算したいときはこっち
                  </li>
                  <li>
                    Pythonの型ヒントは優秀だけどNumPy等のライブラリの型が弱かったり、エラーを考慮しなくて良い場面が多くてNoneだった場合を無視したコードを書きたかったりで、結局型なしで書きがち
                  </li>
                </ul>
              </li>
              <li>
                F#
                <ul>
                  <li>計算系の公式ライブラリが優秀な上に型システムも強い</li>
                  <li>
                    サードパーティライブラリが揃っていないことだけが辛い点だけど、そういったものが必要でなければF#で書きたい
                  </li>
                </ul>
              </li>
            </ul>
            <h2>機械学習</h2>
            <ul>
              <li>
                PyTorch
                <ul>
                  <li>TensorFlowを使ったことがない</li>
                </ul>
              </li>
            </ul>
            <h2>競技プログラミング</h2>
            <ul>
              <li>
                Rust
                <ul>
                  <li>
                    計算ライブラリはもちろん、AtCoder連携のライブラリなんかも優秀でエコシステムの発展が早くて面白いので中で見てると面白い
                  </li>
                  <li>
                    メジャーなC++に比べてイテレータのメソッドの充実具合が素晴らしい
                  </li>
                </ul>
              </li>
              <li>
                Python
                <ul>
                  <li>
                    Rustだと文字列の処理(範囲選択等)に難があるので、必要な場合は使う
                  </li>
                </ul>
              </li>
            </ul>
            <h2>チャットBot</h2>
            <ul>
              <li>
                LINE Bot
                <ul>
                  <li>ライブラリの都合上Go, Nodeを採用することが多い</li>
                  <li>
                    スマホアプリの「共有」ボタンからテキストをLINE
                    Botに送りつけるのをトリガーとする運用が強い
                  </li>
                </ul>
              </li>
              <li>
                Discord Bot
                <ul>
                  <li>ライブラリの都合上Nodeを採用することが多い</li>
                </ul>
              </li>
            </ul>
            <h2>AWS</h2>
            <ul>
              <li>
                Amplify
                <ul>
                  <li>Next.jsとの連携が強い</li>
                  <li>Vercelは営利目的だと高いので、そう言った場合はこっち</li>
                </ul>
              </li>
              <li>
                AppSync
                <ul>
                  <li>
                    GraphQLが簡単に実装できるのはもちろん、DynamoDBがスキーマ付きで使えるメリットが大きい
                  </li>
                </ul>
              </li>
              <li>
                ECS(Fargate)
                <ul>
                  <li>
                    (他の無料コンテナオーケストレーションサービスで代替できないような)サーバーサイドの実行環境として
                  </li>
                </ul>
              </li>
              <li>
                App Runner
                <ul>
                  <li>高いので、短期間だけ使いたいときに</li>
                </ul>
              </li>
              <li>
                Serverless Framework
                <ul>
                  <li>Lambdaを単体で使う時はほぼこれ</li>
                </ul>
              </li>
              <li>
                EC2
                <ul>
                  <li>
                    M1Macを使ってるとどうしても動かないライブラリがあるときにVSCodeのSSHリモートで開発環境として使ったり、そこそこ時間がかかる科学計算なんかを回しておいて終わり次第LINEに通知してEC2は停止する、みたいなのにも使えたりして意外と使う場面は多い
                  </li>
                </ul>
              </li>
            </ul>
            <h2>スクレイピング</h2>
            <ul>
              <li>
                Ruby(Nokogiri)
                <ul>
                  <li>
                    特に複数タグでループを回すときに一番何も考えなくてよくて、負担が少ないので優先的に採用
                  </li>
                </ul>
              </li>
              <li>
                TypeScript(PlayWright, Cheerio)
                <ul>
                  <li>
                    Playwrightは動的にコンテンツを読み込むタイプのサイトに対してのファーストチョイス
                  </li>
                  <li>
                    CheerioはぶっちゃけNokogiriの方が楽だけど、どうしてもNode.jsで動かしたいときに
                  </li>
                </ul>
              </li>
              <li>
                Python(Selenium)
                <ul>
                  <li>
                    Seleniumが使えてエディタで型補完が効いて簡単に書き捨てられるとなるとPython一択になる
                  </li>
                  <li>
                    Cookieの扱いが楽で「ログイン後にしか表示できない画像を一括で自動保存したい」みたいなユースケースに適している(サブスクのブロマガ等で使って1ヶ月で辞める等)
                  </li>
                </ul>
              </li>
            </ul>
            <h2>No(Low)Code / XaaS等</h2>
            <ul>
              <li>
                Hasura
                <ul>
                  <li>
                    ビジネスロジックが必要な箇所が多くなってくると面倒だけど、そうでなければほぼ採用
                  </li>
                </ul>
              </li>
              <li>
                Supabase, FaunaDB, Heroku(Postgres), Mongo Atlas, Firestore
                <ul>
                  <li>
                    どれも無料枠がそこそこあるので、自分用/身内用ツールなんかにたまに使う
                  </li>
                </ul>
              </li>
              <li>
                Heroku, Railway
                <ul>
                  <li>
                    無料で使えるコンテナオーケストレーションサービスとして
                  </li>
                  <li>
                    どちらもRDBの無料枠も付いてくるし、特にRailwayはスケールも簡単な上にレスポンスも速いので優先的に採用
                  </li>
                </ul>
              </li>
              <li>
                Firebase
                <ul>
                  <li>
                    リアルタイム通信、モバイルアプリやPWAのオフライン処理をSDKでいい感じにしてくれるのが強いので、特にチャット機能を実装する際には優先的に採用して、認証やストレージなど全部Firebaseに乗っかる形にするのが好き
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <h3>リンク</h3>
          <ul>
            <li>
              <a href={`https://github.com/${social?.github}`} target="_blank">
                Github
              </a>
            </li>
            <li>
              <a
                href={`https://twitter.com/${social?.twitter}`}
                target="_blank"
              >
                Twitter
              </a>
            </li>
          </ul>
        </section>
        <hr className="my-4" />
        <footer className="text-center">
          <Link to="/">TOPに戻る</Link>
        </footer>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query About {
    site {
      siteMetadata {
        social {
          twitter
          github
        }
      }
    }
  }
`

export default About
