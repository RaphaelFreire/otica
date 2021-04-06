import React from "react"

import Layout from "../components/Layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <h1>404</h1>
    <p>Não tem nada aqui!</p>
  </Layout>
)

export default NotFoundPage
