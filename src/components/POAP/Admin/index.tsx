import React from 'react'

import { useTranslation } from 'react-i18next'

import { Container } from './styles'

const Admin: React.FC = () => {
  const { t } = useTranslation()

  // TODO: Add IPFS upload metadata
  // TODO: Add minting N ERC-1155 tokens with metadata from above

  return (
    <Container>
      <div />
    </Container>
  )
}
export default Admin
