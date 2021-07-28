import React, { FC } from "react"
import Header from "./header"
import tags from "../utils/tags.json"
import { Link } from "gatsby"

const Layout: FC<{ isRoot?: boolean }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex justify-center w-full flex-1">
        <main className="flex-1">{children}</main>
        <aside className="hidden md:block w-40 p-6">
          <h2 className="font-semibold mb-4">タグ一覧</h2>
          {Object.keys(tags).map(tag => (
            <Link to={`/?tag=${tag}`}>
              <li style={{listStyleType: 'none'}}>{tags[tag]}</li>
            </Link>
          ))}
        </aside>
      </div>
      <footer className="w-full text-center text-white bg-gray-800 p-4">
        <small>© {new Date().getFullYear()} Takumi Mori</small>
      </footer>
    </div>
  )
}

export default Layout
