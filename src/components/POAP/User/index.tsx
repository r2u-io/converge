import React, { useEffect, useState } from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import { useTranslation } from 'react-i18next'

import { Container } from './styles'

const User: React.FC = () => {
  const { t } = useTranslation()

  const [reserved, setReserved] = useState(false)
  const [code, setCode] = useState('')

  const { user } = useUser()

  useEffect(() => {
    const secretCode = sessionStorage.getItem('secret_code')
    sessionStorage.removeItem('secret_code')

    if (!secretCode) return
    setCode(secretCode)
  }, [])

  const handleReserve = () => {
    if (!user) return

    fetch('/api/poap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code,
        email: user.email
      })
    }).then((res) => {
      setReserved(true)
      console.log(res)
    })
  }

  return (
    <Container>
      {!reserved && code && user && (
        <button type='button' onClick={handleReserve}>
          <span>{t('poap.user.reserve')}</span>
        </button>
      )}
    </Container>
  )
}
export default User
