import React, { FC } from "react"
import { Link, graphql } from "gatsby"
import { BlogPostBySlugQuery } from "../../graphql-types"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { TwitterShareButton } from "react-share"

const BlogPostTemplate: FC<{ data: BlogPostBySlugQuery }> = ({ data }) => {
  const post = data.markdownRemark!
  const siteTitle = data.site?.siteMetadata?.title as string
  const siteUrl = data.site?.siteMetadata?.siteUrl as string
  const title = post.frontmatter.title
  return (
    <Layout title={title}>
      <Seo title={title} />
      <article
        className="p-6 max-w-full"
        itemScope
        itemType="http://schema.org/Article"
        id="markdown"
      >
        <header>
          <h1 itemProp="headline">{title}</h1>
          <p className="text-right">{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html! }}
          itemProp="articleBody"
        />
        <TwitterShareButton
          url={`${siteUrl}${data.markdownRemark?.fields.slug}`}
          title={`${title} | ${siteTitle}`}
          hashtags={[siteTitle]}
          resetButtonStyle={false}
          className="bg-blue-400 hover:bg-blue-500 text-white px-1 rounded text-sm font-light float-right clear-right"
        >
          Tweet
        </TwitterShareButton>
      </article>
      <hr className="mt-2" />
      <nav className="blog-post-nav p-6 max-w-full flex flex-col">
        <Link to="/" className="text-sm underline text-center">TOPへ戻る</Link>
      </nav>
    </Layout>
  )
}

// const replaceLineBreak = (text: string): string => {
//   const splitText = text.split(/<[^<]+>/)
//   const imgText = text.match(/<[^<]+>/g)
//   let res = ""
//   splitText.forEach((t, i) => {
//     res += t.replace(/\n/g, "<br>")
//     if (imgText && imgText.length > i) {
//       res += imgText[i]
//     }
//   })
//   return res
// }

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
  ) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY年MM月DD日")
        tags
      }
    }
  }
`
