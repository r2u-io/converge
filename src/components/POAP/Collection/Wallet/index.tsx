import React from 'react'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import { useWeb3Context } from '../../../contexts/Web3Context'
import { Container } from './styles'

const Wallet: React.FC = () => {
  const { t } = useTranslation()

  const { hasMetamask, connect } = useWeb3Context()

  return (
    <Container>
      <div className='options'>
        {hasMetamask ? (
          <button type='button' className='option' onClick={connect}>
            <Image
              src='/images/metamask.svg'
              alt='metamask'
              width={30}
              height={30}
              objectFit='contain'
            />
            <span className='name'>{t('wallet.metamask')}</span>
            <span className='popular'>{t('wallet.popular')}</span>
          </button>
        ) : (
          <a
            href='https://metamask.io/download/'
            target='_blank'
            rel='noopener noreferrer'
            className='option'
          >
            <Image
              src='/images/metamask.svg'
              alt='metamask'
              width={30}
              height={30}
              objectFit='contain'
            />
            <span className='name'>{t('wallet.metamask')}</span>
            <span className='popular'>{t('wallet.popular')}</span>
          </a>
        )}
        <button type='button' className='option'>
          <Image
            src='/images/fortmatic.svg'
            alt='fortmatic'
            width={30}
            height={30}
            objectFit='contain'
          />
          <span className='name'>{t('wallet.fortmatic')}</span>
        </button>
        <button type='button' className='option'>
          <Image
            src='/images/sequence.svg'
            alt='sequence'
            width={30}
            height={30}
            objectFit='contain'
          />
          <span className='name'>{t('wallet.sequence')}</span>
        </button>
        <button type='button' className='option'>
          {t('wallet.button')}
        </button>
      </div>
    </Container>
  )
}
export default Wallet
