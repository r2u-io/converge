import React from 'react'

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
      <div className='nft'>
        <button type='button' className='cover' disabled>
          <div className='corner' />
          <svg
            viewBox='0 0 106.4 138.7'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            width={250}
            height={250}
          >
            <path
              fill='#ffffff'
              d='M 26,0 C 1.2,0 0.2,16.8 0,19.6 v 5.1 c 0,19.5 60.2,44.4 60.2,80.3 0,26.3 -23,32.5 -32.4,33.5 41,-2.6 78.6,-30.4 78.6,-69.2 C 106.4,33.7 72.3,0 26,0 Z'
              id='path2'
            />
            <path
              fill='#888888'
              d='m 0,24.7 c 0,14 0,93.8 0,93.8 0,11.5 7.2,20.2 25,20.2 6.4,0 35.2,-4.2 35.2,-33.7 C 60.2,69.1 0,44.2 0,24.7 Z'
              id='path4'
            />
          </svg>
        </button>
        <video autoPlay muted loop>
          <source src='/videos/vtex-0.mp4' />
        </video>
      </div>
      <span className='title'>{t('poap.scanned.title')}</span>
      <span className='subtitle'>{t('poap.scanned.subtitle')}</span>
      <Login />
      <Footer />
    </Container>
  )
}
export default Scanned
