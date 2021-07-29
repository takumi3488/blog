import React, { FC } from "react"
import { Link, graphql } from "gatsby"
import { BlogPostBySlugQuery } from "../../graphql-types"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate: FC<{ data: BlogPostBySlugQuery }> = ({ data }) => {
  const post = data.markdownRemark!
  const { previous, next } = data

  return (
    <Layout title={post.frontmatter.title}>
      <Seo title={post.frontmatter.title} />
      <article
        className="p-6 max-w-full"
        itemScope
        itemType="http://schema.org/Article"
        id="markdown"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p className="text-right">{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: replaceLineBreak(post.html!) }}
          itemProp="articleBody"
        />
        <hr className="mt-6" />
      </article>
      <nav className="blog-post-nav p-6 max-w-full">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

const replaceLineBreak = (text: string): string => {
  return text.replaceAll('\n','<br>')
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY年MM月DD日")
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
