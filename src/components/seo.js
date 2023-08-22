import * as React from 'react'
import { useSiteMetadata } from "../hooks/use-site-metadata";

const Seo = ({ title, description, pathname, children }) => {

  const { title: siteTitle, description: siteDescription, siteUrl } = useSiteMetadata()

  const seo = {
    title: title,
    description: description || siteDescription,
    url: `${siteUrl}${pathname || ``}`,
  }

  return (
    <>
      <title>{seo.title} | {siteTitle}</title>
      <meta name="description" content={seo.description} />
      {children}
    </>
  )
}

export default Seo