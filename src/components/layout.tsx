import React, {FC} from "react"
import Header from "./header"

const Layout: FC<{isRoot?: boolean}> = ({ children, isRoot }) => {
  return (
    <>
      <Header isRoot={isRoot}/>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </>
  )
}

export default Layout
