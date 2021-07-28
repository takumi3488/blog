import React, { FC } from "react"
import Header from "./header"
import { graphql, Link, useStaticQuery } from "gatsby"
import { TagsQuery } from "../../graphql-types"

const Layout: FC<{ searchTag?: string }> = ({ children, searchTag }) => {
  const data: TagsQuery = useStaticQuery(graphql`
    query Tags {
      allTagsCsv(sort: { fields: amount, order: DESC }) {
        nodes {
          id
          name
          amount
        }
      }
    }
  `)
  const tags = data.allTagsCsv.nodes
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex justify-center w-full flex-1">
        <main className="flex-1">{children}</main>
        <aside className="hidden md:block w-40 p-6">
          <h2 className="font-semibold mb-4">タグ一覧</h2>
          <ul className="list-none">
            {tags.map(tag => (
              <Link to={`/?tag=${tag.id}`} key={tag.id}>
                <li
                  className={`mb-2 ${
                    searchTag !== tag.id ? "text-gray-300" : ""
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
