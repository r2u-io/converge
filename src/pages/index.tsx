import React from 'react'

import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import { createGlobalStyle } from 'styled-components'

import Canvas from '../components/Canvas'
import Overlay from '../components/Overlay'
import { OverlayProvider } from '../contexts/OverlayContext'
import { ThreeProvider } from '../contexts/ThreeJSContext'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #D8D6D2;
  }
`

const Home: React.FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>{t('pages.title.index')}</title>
      </Head>
      <ThreeProvider>
        <GlobalStyle />
        <Canvas />
        <OverlayProvider>
          <Overlay />
        </OverlayProvider>
      </ThreeProvider>
    </>
  )
}

export default Home
