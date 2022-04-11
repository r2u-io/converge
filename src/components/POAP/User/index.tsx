import React, { useEffect, useState } from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import { useTranslation } from 'react-i18next'

import { Container } from './styles'

const User: React.FC = () => {
  const { t } = useTranslation()

  const [userData, setUserData] = useState({})

  useEffect(() => {
    fetch('/api/poap-user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) res.json().then((data) => setUserData(data))
    })
  }, [])

  return (
    <Container>
      <code>{JSON.stringify(userData, null, 2)}</code>
    </Container>
  )
}
export default User
