import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import Footer from '../Footer'
import Header from '../Header'
import Login from '../Login'
import { Container } from './styles'

const Scanned: React.FC = () => {
  const { t } = useTranslation()

  const [clicked, setClicked] = useState(false)

  return (
    <Container clicked={clicked}>
      <Header />
      <div className='nft'>
        <div className='cover' onClick={() => setClicked(true)}></div>
        <video autoPlay muted>
          <source src='/videos/vtex-0.mp4' />
        </video>
      </div>
      <span classNameName='title'>{t('poap.scanned.title')}</span>
      <span classNameName='subtitle'>{t('poap.scanned.subtitle')}</span>
      <Login />
      <Footer />
    </Container>
  )
}
export default Scanned
