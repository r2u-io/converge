import React, { useState } from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import { useTranslation } from 'react-i18next'

import Footer from '../Footer'
import Header from '../Header'
import Instructions from '../Instructions'
import { Container } from './styles'

interface Props {
  code: string
}

const Claim: React.FC<Props> = ({ code }: Props) => {
  const { t } = useTranslation()

  const [clicked, setClicked] = useState(false)
  const [reserved, setReserved] = useState(false)

  const { user } = useUser()

  const [videoId, setVideoId] = useState(0)

  const handleClaim = () => {
    if (!user) return

    setClicked(true)

    fetch('/api/poap-reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code,
        email: user.email
      })
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setVideoId(data.id)
          setReserved(true)
        })
      }
    })
  }

  return (
    <Container clicked={clicked} reserved={reserved}>
      <Header />
      <div className='nft'>
        <button type='button' className='cover' onClick={handleClaim}>
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
            />
            <path
              fill='#888888'
              d='m 0,24.7 c 0,14 0,93.8 0,93.8 0,11.5 7.2,20.2 25,20.2 6.4,0 35.2,-4.2 35.2,-33.7 C 60.2,69.1 0,44.2 0,24.7 Z'
            />
          </svg>
        </button>
        <video autoPlay muted loop>
          <source src={`/videos/vtex-${videoId}.mp4`} />
        </video>
      </div>
      <span className='title'>{t('poap.claim.title')}</span>
      <span className='subtitle'>{t('poap.claim.subtitle')}</span>
      <div className='buttons'>
        <button type='button' className='claim' onClick={handleClaim}>
          <span>{t('poap.landing.claim')}</span>
        </button>
        <Instructions />
      </div>
      <Footer />
    </Container>
  )
}
export default Claim
