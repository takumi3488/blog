import React, { FC } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { BlogIndexQuery } from "../../graphql-types"

const BlogIndex: FC<{ data: BlogIndexQuery; location: Location }> = ({
  data,
  location,
}) => {
  const tags = data.allTagsCsv.nodes
  const allPosts = data.allMarkdownRemark.nodes
  const params = new URLSearchParams(location.search)
  const searchTag = params.get("tag")
  const posts = searchTag
    ? allPosts.filter(post => post.frontmatter.tags.includes(searchTag))
    : allPosts
  const title = searchTag ? `"${searchTag}"の記事一覧` : "TOP"
  return (
    <Layout searchTag={searchTag || undefined} title={title}>
      <Seo />
      <div
        className="grid gap-2 p-6 w-full"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))" }}
      >
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <article
              itemScope
              itemType="http://schema.org/Article"
              key={post.fields.slug}
              className="border border-gray-400 rounded-xl p-4 h-48 flex flex-col justify-between shadow-md"
            >
              <header>
                <h2>
                  <Link to={post.fields.slug} itemProp="url">
                    <span itemProp="headline" className="text-xl">
                      {title}
                    </span>
                  </Link>
                </h2>
              </header>
              <footer className="flex flex-col">
                <div className="flex gap-1">
                  {post.frontmatter.tags.map(tag => (
                    <Link
                      to={`/?tag=${tag}`}
                      className="p-1 border rounded-md border-gray-300 text-xs hover:bg-gray-300"
                    >
                      {tags.find(t => t.name === tag)?.name}
                    </Link>
                  ))}
                </div>
                <small className="text-right">{post.frontmatter.date}</small>
              </footer>
            </article>
          )
        })}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY年MM月DD日")
          title
          tags
        }
      }
    }
    allTagsCsv(sort: { fields: amount, order: DESC }) {
      nodes {
        id
        name
        amount
      }
    }
  }
`
