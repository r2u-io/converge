import React, { useEffect, useState } from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import { useTranslation } from 'react-i18next'

import { Container } from './styles'

const User: React.FC = () => {
  const { t } = useTranslation()

  const [code, setCode] = useState('')
  const [userData, setUserData] = useState({})
  const [reserved, setReserved] = useState(false)

  const { user, isLoading } = useUser()

  useEffect(() => {
    if (isLoading) return
    const secretCode = sessionStorage.getItem('secret_code')
    sessionStorage.removeItem('secret_code')

    if (!secretCode) return
    setCode(secretCode)
  }, [isLoading])

  const handleReserve = () => {
    if (!user) return

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
      console.log(res)
      if (res.status === 200) setReserved(true)
    })
  }

  useEffect(() => {
    if (!reserved) return

    fetch('/api/poap-user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) res.json().then((data) => setUserData(data))
    })
  }, [reserved])

  if (!code) return null

  return (
    <Container>
      {reserved ? (
        <code>{JSON.stringify(userData, null, 2)}</code>
      ) : (
        <button type='button' onClick={handleReserve}>
          <span>{t('poap.user.reserve')}</span>
        </button>
      )}
    </Container>
  )
}
export default User
