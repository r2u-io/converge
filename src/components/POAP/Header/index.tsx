import React from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { Container } from './styles'

const Header: React.FC = () => {
  const { t } = useTranslation()

  const { user, isLoading, error } = useUser()

  if (isLoading) {
    return <div>{t('loading')}</div>
  }

  if (error) {
    return <div>{t('error')}</div>
  }

  return (
    <Container>
      {user ? (
        <Link href='/api/auth/logout' passHref>
          <button type='button' className='logout'>
            <span>{t('poap.header.logout')}</span>
          </button>
        </Link>
      ) : (
        <Link href='/api/auth/login' passHref>
          <button type='button' className='login'>
            <span>{t('poap.header.login')}</span>
          </button>
        </Link>
      )}
    </Container>
  )
}
export default Header
