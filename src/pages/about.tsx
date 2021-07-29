import React, { FC } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const About: FC = () => {
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
          <p>WEB開発を主としていろんな情報を発信します。</p>
          <p>RSSにも対応しています。</p>
          <p>特に以下の分野に興味があります。</p>
          <div
            className="grid p-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))",
            }}
          >
            <ul>
              <li>
                サーバーサイド
                <ul>
                  <li>Go(Gin)</li>
                  <li>FastAPI</li>
                  <li>Node.js(NestJS)</li>
                  <li>Rails</li>
                </ul>
              </li>
            </ul>
            <ul>
              <li>
                フロントエンド
                <ul>
                  <li>TypeScript(一番良い)</li>
                  <li>Next.js</li>
                  <li>Gatsby</li>
                  <li>Electron(+Next.js)</li>
                </ul>
              </li>
            </ul>
            <ul>
              <li>
                AWS
                <ul>
                  <li>App Runner</li>
                  <li>Lambda</li>
                  <li>Fargate</li>
                  <li>DynamoDB</li>
                  <li>AppSync</li>
                </ul>
              </li>
            </ul>
            <ul>
              <li>
                その他
                <ul>
                  <li>Firebase</li>
                  <li>CI/CD(Github Actions)</li>
                  <li>Hasure</li>
                  <li>Chrome拡張機能</li>
                  <li>Selenium</li>
                </ul>
              </li>
            </ul>
          </div>
          <h3>リンク</h3>
          <ul>
            <li><a href="https://github.com/takumi3488">Github</a></li>
            <li><a href="https://twitter.com/takumi3488">Twitter</a></li>
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

export default About
