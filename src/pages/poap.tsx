import React from 'react'

import Head from 'next/head'
import { useTranslation } from 'react-i18next'

import Login from '../components/Login'
import { Web3Provider } from '../contexts/Web3Context'

const POAPPage: React.FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>{t('pages.title.index')}</title>
      </Head>
      <Web3Provider>
        <Login />
      </Web3Provider>
    </>
  )
}

export default POAPPage
