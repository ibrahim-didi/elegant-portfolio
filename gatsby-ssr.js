import React from "react"
import Layout from "./src/components/layout"

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  setHeadComponents([
    <link
      key="academicons-stylesheet"
      rel="stylesheet"
      href="./src/assets/academicons/css/academicons.min.css"
    />,
  ]);
  setHtmlAttributes({ lang: "en" });
};

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
