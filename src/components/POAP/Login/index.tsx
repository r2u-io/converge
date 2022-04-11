import React from 'react'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import Instructions from '../Instructions'
import { Container } from './styles'

const Login: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Link href='/api/auth/login' passHref>
        <button type='button' className='login'>
          <span>{t('poap.landing.login')}</span>
        </button>
      </Link>
      <Instructions />
    </Container>
  )
}
export default Login
