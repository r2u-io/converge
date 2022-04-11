import React from 'react'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import Footer from '../Footer'
import Header from '../Header'
import Login from '../Login'
import { Container } from './styles'

const Landing: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Header />
      <div className='container char'>
        <Image
          src='/images/poap/char_2.png'
          alt='character-hunting'
          width={380}
          height={380}
          objectFit='contain'
        />
      </div>
      <div className='container hunt'>
        <Image
          src='/images/poap/hunt.png'
          alt='nft-hunt-logo'
          width={270}
          height={270}
          objectFit='contain'
        />
      </div>
      <div className='spacer' />
      <span className='title'>{t('poap.landing.welcome')}</span>
      <span className='subtitle'>{t('poap.landing.invite')}</span>
      <Login />
      <Footer />
    </Container>
  )
}
export default Landing
