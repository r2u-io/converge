import React from 'react'

import { useTranslation } from 'react-i18next'

import { useWeb3Context } from '../../contexts/Web3Context'
import Login from './Login'
import { Container } from './styles'

const POAP: React.FC = () => {
  const { t } = useTranslation()

  const { address } = useWeb3Context()

  return <Container>{address ? <></> : <Login />}</Container>
}
export default POAP
