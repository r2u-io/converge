import React, { useEffect } from 'react'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useTranslation } from 'react-i18next'

import { Container } from './styles'

const Header: React.FC = () => {
  const { t } = useTranslation()

  const { data: session } = useSession()

  useEffect(() => {
    console.log(session)
  }, [session])

  return (
    <Container>
      {session ? (
        <button type='button' className='logout' onClick={() => signOut()}>
          <span>{t('poap.header.logout')}</span>
        </button>
      ) : (
        <button type='button' className='login' onClick={() => signIn()}>
          <span>{t('poap.header.login')}</span>
        </button>
      )}
    </Container>
  )
}
export default Header
