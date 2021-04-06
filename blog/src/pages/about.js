import React from "react"

import Layout from "../components/Layout"
import Seo from "../components/seo"

import * as S from "../components/About/styled"

const AboutPage = () => (
  <Layout>
    <Seo title="About" />
    <S.MainContent>
      <p>
        Somos um site especializado em conectar potenciais clientes com sua ótica.
        São Leads que buscam realizar exames de vista em sua cidade e que procuram a melhor ótica
        para escolha dos óculos.
      </p>
      <p><a href='https://www.agendarexamedevista.com.br'>www.agendarexamedevista.com.br</a></p>
    </S.MainContent>
  </Layout>
)

export default AboutPage
