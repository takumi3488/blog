import React, { FC } from "react"
import Header from "./header"
import tags from "../utils/tags.json"
import { Link } from "gatsby"

const Layout: FC<{ isRoot?: boolean }> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex justify-center w-full">
        <main className="flex-1">{children}</main>
        <aside className="hidden md:block w-40 p-6 min-h-screen">
          <h2 className="font-semibold mb-4">タグ一覧</h2>
          {Object.keys(tags).map(tag => (
            <Link to={`/?tag=${tag}`}>
              <li style={{listStyleType: 'none'}}>{tags[tag]}</li>
            </Link>
          ))}
        </aside>
      </div>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </>
  )
}

export default Layout
