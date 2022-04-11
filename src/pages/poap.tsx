import React from 'react'

import Head from 'next/head'
import { useTranslation } from 'react-i18next'

import POAP from '../components/POAP'
import { POAPProvider } from '../contexts/POAPContext'

const POAPPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t('pages.title.index')}</title>
      </Head>
      <POAPProvider>
        <POAP />
      </POAPProvider>
    </>
  )
}

export default POAPPage
