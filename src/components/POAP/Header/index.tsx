import React from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { Container } from './styles'

const Header: React.FC = () => {
  const { user } = useUser()
  const { t } = useTranslation()

  return (
    <Container>
      <div className='logos'>
        <div className='logo'>
          <Image
            src='/images/poap/vtex.png'
            alt='vtex-logo'
            width={140}
            height={100}
            objectFit='contain'
          />
        </div>
        <div className='logo'>
          <Image
            src='/images/logo-white.svg'
            alt='converge-logo'
            width={60}
            height={60}
            objectFit='contain'
          />
          <Image
            src='/images/converge-white.svg'
            alt='converge'
            width={130}
            height={30}
            objectFit='contain'
          />
        </div>
      </div>
      {user ? (
        <Link href='/api/auth/logout' passHref>
          <button type='button' className='logout'>
            <span>{t('logout')}</span>
          </button>
        </Link>
      ) : (
        <Link href='/api/auth/login' passHref>
          <button type='button' className='login'>
            <span>{t('login')}</span>
          </button>
        </Link>
      )}
    </Container>
  )
}
export default Header
