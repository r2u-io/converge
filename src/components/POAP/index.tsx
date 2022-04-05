import React from 'react'

import { useTranslation } from 'react-i18next'

import { useWeb3Context } from '../../contexts/Web3Context'
import { Container } from './styles'
import User from './User'
import Wallet from './Wallet'

const POAP: React.FC = () => {
  const { t } = useTranslation()

  const { address } = useWeb3Context()

  return <Container>{address ? <User /> : <Wallet />}</Container>
}
export default POAP
