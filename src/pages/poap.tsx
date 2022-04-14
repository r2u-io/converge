import React from 'react'

import Head from 'next/head'
import { useTranslation } from 'react-i18next'

import POAP from '../components/POAP'
import WalletModal from '../components/POAP/Collection/Wallet/Modal'
import InstructionsModal from '../components/POAP/Instructions/Modal'
import { POAPProvider } from '../contexts/POAPContext'
import { Web3Provider } from '../contexts/Web3Context'

const POAPPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t('pages.title.index')}</title>
      </Head>
      <POAPProvider>
        <Web3Provider>
          <POAP />
          <InstructionsModal />
          <WalletModal />
        </Web3Provider>
      </POAPProvider>
    </>
  )
}

export default POAPPage
