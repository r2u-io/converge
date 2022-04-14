import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { usePOAPContext } from '../../../../contexts/POAPContext'
import { useWeb3Context } from '../../../../contexts/Web3Context'
import { Container } from './styles'

const WalletModal: React.FC = () => {
  const { t } = useTranslation()

  const router = useRouter()

  const [formAddress, setFormAddress] = useState('')

  const {
    address,
    hasMetamask,
    userAddressAcquired,
    connectMetamask,
    connectSequence,
    setAddress
  } = useWeb3Context()
  const { walletOpened, closeWallet, openWalletComplete } = usePOAPContext()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!address) return

    fetch('/api/poap-wallet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address
      })
    })
      .then((res) => {
        if (res.status === 200) {
          openWalletComplete()
          closeWallet()
        } else if (res.status === 401) {
          router.push('/api/auth/logout')
        }
      })
      .catch((err) => console.error(err))
  }, [address])

  return walletOpened ? (
    <Container>
      <button type='button' className='close' onClick={closeWallet}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          viewBox='0 0 512 512'
          width={25}
          height={25}
        >
          <path d='M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z' />
        </svg>
      </button>
      {userAddressAcquired && <span className='warning'>{t('poap.wallet.modal.warning')}</span>}
      <div className='options'>
        {hasMetamask ? (
          <button type='button' className='option' onClick={connectMetamask}>
            <Image
              src='/images/metamask.svg'
              alt='metamask'
              width={30}
              height={30}
              objectFit='contain'
            />
            <span className='name'>{t('poap.wallet.modal.metamask')}</span>
            <span className='popular'>{t('poap.wallet.modal.popular')}</span>
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
            <span className='name'>{t('poap.wallet.modal.metamask')}</span>
            <span className='popular'>{t('poap.wallet.modal.popular')}</span>
          </a>
        )}
        <button type='button' className='option' onClick={connectSequence}>
          <Image
            src='/images/sequence.svg'
            alt='sequence'
            width={30}
            height={30}
            objectFit='contain'
          />
          <span className='name'>{t('poap.wallet.modal.sequence')}</span>
        </button>
      </div>
      <div className='or'>
        <hr />
        <span>{t('poap.wallet.modal.or')}</span>
        <hr />
      </div>
      <form>
        <label htmlFor='form-address'>
          {t('poap.wallet.modal.paste')}
          <input
            type='text'
            id='form-address'
            placeholder='0x0123456789ABCDEF...'
            required
            value={formAddress}
            onChange={(e) => setFormAddress(e.target.value)}
          />
        </label>
        <button
          type='submit'
          className='submit'
          onClick={(e) => {
            e.preventDefault()
            setLoading(true)
            setAddress(formAddress)
          }}
          disabled={!formAddress || loading}
        >
          {loading ? t('poap.wallet.modal.sending') : t('poap.wallet.modal.send')}
        </button>
      </form>
    </Container>
  ) : null
}
export default WalletModal
