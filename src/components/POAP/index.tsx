import React, { useEffect, useState } from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'

import Claim from './Claim'
import Collection from './Collection'
import Landing from './Landing'
import Loading from './Loading'
import Scanned from './Scanned'
import { Container, GlobalStyleDark } from './styles'

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
        <GlobalStyleDark />
        <Loading />
      </Container>
    )

  if (code) {
    return (
      <Container>
        <GlobalStyleDark />
        {user ? <Claim code={code} goToCollection={goToCollection} /> : <Scanned />}
      </Container>
    )
  }

  return (
    <Container>
      <GlobalStyleDark />
      {user ? <Collection /> : <Landing />}
    </Container>
  )
}
export default POAP
