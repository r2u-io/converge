import React from 'react'

import { useTranslation } from 'react-i18next'

import Footer from '../Footer'
import Header from '../Header'
import Login from '../Login'
import Sticker from '../Sticker'
import { Container } from './styles'

const Scanned: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Header />
      <div className='nft'>
        <Sticker />
      </div>
      <span className='title'>{t('poap.scanned.title')}</span>
      <span className='subtitle'>{t('poap.scanned.subtitle')}</span>
      <Login />
      <Footer />
    </Container>
  )
}
export default Scanned
