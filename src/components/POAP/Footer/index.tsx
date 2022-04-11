import React from 'react'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import { Container } from './styles'

interface Props {
  light?: boolean
}

const Footer: React.FC<Props> = ({ light = false }: Props) => {
  const { t } = useTranslation()

  return (
    <Container light={light}>
      <div className='logo'>
        <Image
          src={light ? '/images/logo.svg' : '/images/logo-white.svg'}
          alt='converge-logo'
          width={50}
          height={50}
          objectFit='contain'
        />
        <Image
          src={light ? '/images/converge.svg' : '/images/converge-white.svg'}
          alt='converge'
          width={100}
          height={30}
          objectFit='contain'
        />
      </div>
      <div className='buttons'>
        <span>{t('poap.footer.support')}</span>
        <a href='mailto: support@converge.land'>
          <span>{t('poap.footer.email')}</span>
        </a>
      </div>
    </Container>
  )
}
export default Footer
