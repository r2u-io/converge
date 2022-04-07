import React, { useEffect, useState } from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import Header from './Header'
import { Container } from './styles'
import User from './User'

const POAP: React.FC = () => {
  const { t } = useTranslation()

  const { user } = useUser()

  const router = useRouter()

  const [query, setQuery] = useState('')

  useEffect(() => {
    console.log(router.query.secret_code)
    if (!router.query.secret_code || typeof router.query.secret_code !== 'string') return
    setQuery(router.query.secret_code)
  }, [router.query])

  useEffect(() => {
    console.log(query)
    if (!query) return
    sessionStorage.setItem('secret_code', query)
  }, [query])

  return (
    <Container>
      <Header />
      {user ? <User /> : <></>}
    </Container>
  )
}
export default POAP
