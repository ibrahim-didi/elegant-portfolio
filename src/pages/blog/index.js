import * as React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby';
import Seo from '../../components/seo'

const BlogPage = ({data}) => {
  return (
    <div pageTitle='Blog'>
      <h1 className="text-3xl font-bold my-4">Blog</h1>
      <p className='mb-2'>This is a blog. Don't hesitate to check the articles.</p>
      {
        data.allMdx.nodes.map((node) => (
          <article key={node.id} className='mb-4'>
            <h2 className='text-lg font-semibold'>
              <Link to={`/blog/${node.frontmatter.slug}`} className='hover:underline'>
                {node.frontmatter.title}
              </Link>
            </h2>
            <p className='text-sm mb-1'>{node.frontmatter.date}</p>
            <p>{node.excerpt}</p>
          </article>
        ))
      }
    </div>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC }}) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          slug
        }
        id
        excerpt
      }
    }
  }
`

export const Head = () => <Seo title='Blog' description='My blog.' pathname='/blog'/>

export default BlogPage