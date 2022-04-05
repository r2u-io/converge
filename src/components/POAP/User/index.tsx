import React from 'react'

import { useTranslation } from 'react-i18next'

import { Container } from './styles'

const User: React.FC = () => {
  const { t } = useTranslation()

  // TODO: Get access code from URL
  // TODO: Decode JWT Access Code
  // TODO: Use data from code to show UI
  // TODO: Transfer nft to user if wallet connected

  return (
    <Container>
      <div />
    </Container>
  )
}
export default User
