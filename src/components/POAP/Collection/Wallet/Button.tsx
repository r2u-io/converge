import React from 'react'

import { useTranslation } from 'react-i18next'

import { usePOAPContext } from '../../../../contexts/POAPContext'
import { useWeb3Context } from '../../../../contexts/Web3Context'
import { Button } from './styles'

const WalletButton: React.FC = () => {
  const { t } = useTranslation()

  const { openWallet } = usePOAPContext()

  const { userAddressAcquired } = useWeb3Context()

  return (
    <Button type='button' className='wallet' onClick={openWallet}>
      <svg xmlns='http://www.w3.org/2000/svg' width={25} height={25} viewBox='0 0 784.37 1277.39'>
        <polygon
          fill='#a7a7a7'
          points='392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 '
        />
        <polygon fill='#ffffff' points='392.07,0 -0,650.54 392.07,882.29 392.07,472.33 ' />
        <polygon
          fill='#a7a7a6'
          points='392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 '
        />
        <polygon fill='#ffffff' points='392.07,1277.38 392.07,956.52 -0,724.89 ' />
        <polygon fill='#878787' points='392.07,882.29 784.13,650.54 392.07,472.33 ' />
        <polygon fill='#acacac' points='0,650.54 392.07,882.29 392.07,472.33 ' />
      </svg>
      <span>{userAddressAcquired ? t('poap.wallet.change') : t('poap.wallet.button')}</span>
    </Button>
  )
}
export default WalletButton
