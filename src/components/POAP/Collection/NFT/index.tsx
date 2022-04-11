import React from 'react'

import { useTranslation } from 'react-i18next'

import { Container } from './styles'

interface Props {
  id: number
  claimed: boolean
  rare?: boolean
}

const NFT: React.FC<Props> = ({ id, claimed, rare = false }: Props) => {
  const { t } = useTranslation()

  return (
    <Container rare={rare} claimed={claimed}>
      {claimed ? (
        <video muted autoPlay loop playsInline poster={`/videos/thumbs/vtex-${id}.jpg`}>
          <source src={`/videos/vtex-${id}.mp4`} type='video/mp4' />
        </video>
      ) : (
        <div className='sticker'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={20}
            height={20}
            viewBox='0 0 24 24'
            className='lock'
          >
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z' />
          </svg>
          <svg
            viewBox='0 0 106.4 138.7'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            width={100}
            height={100}
            className='logo'
          >
            <path
              fill={rare ? '#ffffac' : '#ffffff'}
              d='M 26,0 C 1.2,0 0.2,16.8 0,19.6 v 5.1 c 0,19.5 60.2,44.4 60.2,80.3 0,26.3 -23,32.5 -32.4,33.5 41,-2.6 78.6,-30.4 78.6,-69.2 C 106.4,33.7 72.3,0 26,0 Z'
            />
            <path
              fill={rare ? '#5d4a1f' : '#888888'}
              d='m 0,24.7 c 0,14 0,93.8 0,93.8 0,11.5 7.2,20.2 25,20.2 6.4,0 35.2,-4.2 35.2,-33.7 C 60.2,69.1 0,44.2 0,24.7 Z'
            />
          </svg>
          <span>{t('poap.collection.locked', { id: id + 1 })}</span>
        </div>
      )}
    </Container>
  )
}
export default NFT
