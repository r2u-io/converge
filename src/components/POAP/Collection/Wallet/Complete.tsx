import React from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { usePOAPContext } from '../../../../contexts/POAPContext'
import { Container } from './styles'

const WalletComplete: React.FC = () => {
  const { t } = useTranslation()

  const router = useRouter()

  const { walletOpenedComplete } = usePOAPContext()

  return walletOpenedComplete ? (
    <Container>
      <svg viewBox='0 0 1024 1024' fill='#8ec396' width={100} height={100}>
        <path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z' />
      </svg>
      <span className='success'>{t('poap.wallet.complete.success')}</span>
      <button type='button' className='continue' onClick={() => router.reload()}>
        {t('poap.wallet.complete.button')}
      </button>
    </Container>
  ) : null
}
export default WalletComplete
