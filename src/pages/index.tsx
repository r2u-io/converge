import React from 'react'

import Head from 'next/head'
import { useTranslation } from 'react-i18next'

import Canvas from '../components/Canvas'
import Overlay from '../components/Overlay'
import { ThreeProvider } from '../contexts/ThreeJSContext'

const Home: React.FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>{t('pages.title.index')}</title>
      </Head>
      <ThreeProvider>
        <Canvas />
        <Overlay />
      </ThreeProvider>
    </>
  )
}

export default Home
