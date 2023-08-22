import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../../components/seo'

const BlogPost = ({ data, children }) => {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-2'>{data.mdx.frontmatter.title}</h1>
      <p className='mb-4'>{data.mdx.frontmatter.date}</p>
      {children}
    </div>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        description
        slug
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} description={data.mdx.frontmatter.description} pathname={`/blog/${data.mdx.frontmatter.slug}`}/>

export default BlogPost