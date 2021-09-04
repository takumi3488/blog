import React, { FC, useEffect } from "react"
import Header from "./header"
import { graphql, Link, useStaticQuery } from "gatsby"
import { TagsQuery } from "../../graphql-types"

const Layout: FC<{ title: string; searchTag?: string }> = ({
  children,
  searchTag,
  title,
}) => {
  const data: TagsQuery = useStaticQuery(graphql`
    query Tags {
      allTagsCsv(sort: { fields: amount, order: DESC }) {
        nodes {
          name
          amount
        }
      }
    }
  `)
  const tags = data.allTagsCsv.nodes
  useEffect(() => {
    if (window) {
      ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
      ;(window as any).adsbygoogle.push({})
    }
  }, [])
  return (
    <div className="min-h-screen flex flex-col">
      <Header title={title} />
      <div className="flex justify-center w-full md:w-5/6 lg:w-2/3 xl:w-1/2 xl:max-w-screen-md flex-1 m-auto">
        <main className="flex-1">
          {children}
          {/* <ins
            className="adsbygoogle"
            style={{ display: "block", margin: "20px auto" }}
            data-ad-client="ca-pub-4022474033409111"
            data-ad-slot="5187044897"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />  */}
        </main>
        <aside className="hidden md:block w-40 p-6">
          <h2 className="font-semibold mb-4">タグ一覧</h2>
          <ul className="list-none">
            {tags.map((tag, i) => (
              <Link to={`/?tag=${tag.name}`} key={i}>
                <li
                  className={`mb-2 ${
                    searchTag !== tag.name ? "text-gray-500" : ""
                  }`}
                >
                  {tag.name}({tag.amount})
                </li>
              </Link>
            ))}
          </ul>
        </aside>
      </div>
      <footer className="w-full text-center text-white bg-gray-800 p-4">
        <small>© {new Date().getFullYear()} Takumi Mori</small>
      </footer>
    </div>
  )
}

export default Layout
