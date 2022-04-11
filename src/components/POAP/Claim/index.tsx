import React, { useRef, useState } from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import { useTranslation } from 'react-i18next'

import Footer from '../Footer'
import Header from '../Header'
import Instructions from '../Instructions'
import Sticker from '../Sticker'
import { Container } from './styles'

interface Props {
  code: string
  goToCollection: () => void
}

const Claim: React.FC<Props> = ({ code, goToCollection }: Props) => {
  const { t } = useTranslation()

  const [clicked, setClicked] = useState(false)
  const [reserved, setReserved] = useState(false)

  const { user } = useUser()

  const [videoId, setVideoId] = useState<number>()

  const videoRef = useRef<HTMLVideoElement>(null)

  const handleClaim = () => {
    if (!user) return
    if (reserved) {
      goToCollection()
      return
    }

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
          videoRef.current?.load()
          setReserved(true)
        })
      }
    })
  }

  return (
    <Container clicked={clicked}>
      <Header />
      <div className='nft'>
        <Sticker onClick={handleClaim} opacity={reserved ? 0 : 1} />
        <video autoPlay muted loop ref={videoRef}>
          <source src={`/videos/vtex-${videoId}.mp4`} />
        </video>
      </div>
      <span className='title'>
        {reserved
          ? t('poap.claim.title.reserved')
          : clicked
          ? t('poap.claim.title.clicked')
          : t('poap.claim.title.start')}
      </span>
      <div className='buttons'>
        <button
          type='button'
          className='claim'
          onClick={handleClaim}
          disabled={clicked && !reserved}
        >
          <span>
            {reserved
              ? t('poap.claim.button.reserved')
              : clicked
              ? t('poap.claim.button.clicked')
              : t('poap.claim.button.start')}
          </span>
        </button>
        <Instructions />
      </div>
      <Footer />
    </Container>
  )
}
export default Claim
