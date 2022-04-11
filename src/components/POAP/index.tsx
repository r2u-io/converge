import React, { useEffect, useState } from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'

import Claim from './Claim'
import Landing from './Landing'
import Loading from './Loading'
import Scanned from './Scanned'
import { Container } from './styles'
import User from './User'

const POAP: React.FC = () => {
  const { user, isLoading } = useUser()

  const router = useRouter()

  const [code, setCode] = useState('')

  useEffect(() => {
    if (!router.query.secret_code || typeof router.query.secret_code !== 'string') return
    setCode(router.query.secret_code)
  }, [router.query])

  const goToCollection = () => {
    router.push('/poap')
    setCode('')
  }

  if (isLoading)
    return (
      <Container>
        <Loading />
      </Container>
    )

  if (code) {
    return (
      <Container>
        {user ? <Claim code={code} goToCollection={goToCollection} /> : <Scanned />}
      </Container>
    )
  }

  return <Container>{user ? <User /> : <Landing />}</Container>
}
export default POAP
