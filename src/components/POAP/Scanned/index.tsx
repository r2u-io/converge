import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import Footer from '../Footer'
import Header from '../Header'
import Login from '../Login'
import { Container } from './styles'

const Scanned: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Header />
      <span className='title'>{t('poap.scanned.title')}</span>
      <span className='subtitle'>{t('poap.scanned.subtitle')}</span>
      <Login />
      <Footer />
    </Container>
  )
}
export default Scanned
