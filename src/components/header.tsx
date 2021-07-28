import React, { FC } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const Header: FC<{ title: string }> = ({ title }) => {
  return (
    <header className="relative text-white font-sans w-full">
      <StaticImage
        src="../images/main.jpg"
        alt="Cover Image"
        className={`h-16 sm:h-56`}
      />
      <div className="absolute flex flex-col top-0 left-0 w-full h-full justify-center sm:justify-between items-center p-4 sm:p-6">
        <div className="hidden sm:flex justify-end space-x-2 w-full">
          <a href="https://twitter.com/takumi3488" target="_blank">
            <StaticImage
              src="../images/twitter.png"
              alt="Twitter"
              className="w-5"
            />
          </a>
          <a href="https://github.com/takumi3488" target="_blank">
            <StaticImage
              src="../images/github.png"
              alt="Github"
              className="w-5"
            />
          </a>
        </div>
        <div className="w-full">
          <span className="flex justify-between sm:justify-center w-full items-center">
            <span className="flex items-center gap-2 sm:flex-col">
              <Link to="/" className="text-2xl text-center font-semibold block">
                <h1>もりた記</h1>
              </Link>
              <h2 className="inline-block">-{title}-</h2>
            </span>
            <AboutButton additionalClass="block sm:hidden" />
          </span>
        </div>
        <nav className="hidden sm:flex justify-between w-full">
          <Link to="tags" className="text-sm text-gray-300 hover:text-gray-100">
            タグ一覧
          </Link>
          <AboutButton />
        </nav>
      </div>
    </header>
  )
}

const AboutButton: FC<{ additionalClass?: string }> = ({ additionalClass }) => {
  return (
    <Link
      to="about"
      className={`text-sm sm:text-sm border p-1 rounded-lg hover:bg-white hover:text-black ${additionalClass}`}
    >
      ABOUT
    </Link>
  )
}

export default Header
