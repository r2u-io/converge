import React from 'react'

import { useTranslation } from 'react-i18next'

import { useWeb3Context } from '../../contexts/Web3Context'
import { Container } from './styles'

const POAP: React.FC = () => {
  const { t } = useTranslation()

  const { hasMetamask, connect } = useWeb3Context()

  return (
    <Container>
      <div className='options'>
        <button type='button' className='option'>
          {t('login.button')}
        </button>
      </div>
    </Container>
  )
}
export default POAP
