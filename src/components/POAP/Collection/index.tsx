import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { useWeb3Context } from '../../../contexts/Web3Context'
import Footer from '../Footer'
import Header from '../Header'
import InstructionsButton from '../Instructions/Button'
import NFT from './NFT'
import { Container, GlobalStyleLight } from './styles'
import WalletButton from './Wallet/Button'

const Collection: React.FC = () => {
  const { t } = useTranslation()

  const router = useRouter()

  const [nfts, setNFTs] = useState<boolean[]>([])
  const [rareNFT, setRareNFT] = useState(false)

  const [loading, setLoading] = useState(true)

  const [empty, setEmpty] = useState(false)

  const { userAddressAcquired, setUserAddressAcquired } = useWeb3Context()

  useEffect(() => {
    fetch('/api/poap-user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          if (!data || !data.vtex) {
            setEmpty(true)
            setLoading(false)
            return
          }

          setRareNFT(data.vtex.pop())
          setNFTs(data.vtex)
          setLoading(false)

          if (data.address) setUserAddressAcquired(true)
        })
      } else {
        router.push('/api/auth/logout')
      }
    })
  }, [])

  if (empty) {
    return (
      <Container>
        <GlobalStyleLight />
        <Header light />
        <div className='empty'>
          <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 491.67 491.67'
            fill='#2f1346'
            width='30%'
            height='30%'
          >
            <path d='M127.451,299.136V83.581l103.238-49.595v135.944c8.243-5.179,17.054-9.32,26.254-12.379V34.368l102.218,51.094v84.134 c9.67,6.007,18.512,13.398,26.254,22.051V86.943l72.65-23.214v217.133l-43.885,14.02c-1.849,9.828-4.939,19.42-9.185,28.596 l1.427,1.467l68.77-21.986c5.44-1.735,9.128-6.786,9.128-12.506V45.744c0-4.189-1.998-8.125-5.384-10.611 c-3.387-2.47-7.759-3.153-11.743-1.896L373.38,63.221L249.687,1.375c-3.616-1.802-7.878-1.832-11.559-0.097L114.165,60.815 l-93.319-42.33c-4.063-1.848-8.795-1.48-12.539,0.924c-3.752,2.423-6.014,6.581-6.014,11.041v244.709 c0,5.146,3.011,9.83,7.703,11.965l98.903,44.863c3.561,1.609,7.615,1.561,11.112-0.127l58.294-28.008 c-2.383-8.922-3.792-18.019-4.102-27.162L127.451,299.136z M28.548,50.825l72.649,32.963v215.858l-72.649-32.948V50.825z' />
            <path d='M477.7,421.681l-75.818-78c-6.357,9.479-13.957,18.354-23.005,26.128c-9.065,7.807-18.944,13.972-29.267,18.799 l65.653,86.716c6.851,9.065,17.175,14.913,28.485,16.123c1.459,0.159,2.908,0.224,4.357,0.224c9.832,0,19.39-3.49,26.917-9.959 c8.635-7.408,13.797-18.065,14.308-29.441C489.872,440.912,485.634,429.838,477.7,421.681z' />
            <path d='M374.767,204.073c-20.719-24.12-50.105-36.499-79.65-36.499c-24.208,0-48.527,8.315-68.292,25.283 c-43.827,37.693-48.876,104.049-11.183,147.925c20.727,24.088,50.097,36.467,79.627,36.467c24.206,0,48.52-8.301,68.281-25.283 C407.41,314.303,412.429,247.933,374.767,204.073z M295.235,341.976c-19.596,0-39.072-8.204-52.83-24.2 c-25.012-29.123-21.666-73.142,7.425-98.154c13.12-11.264,29.267-16.775,45.325-16.775c19.613,0,39.097,8.221,52.846,24.217 c24.996,29.091,21.65,73.142-7.44,98.138C327.433,336.463,311.295,341.976,295.235,341.976z' />
            <path d='M272.82,232.127c-3.521-0.765-7.265-0.143-10.229,2.391c-20.901,17.955-23.275,49.58-5.336,70.481 c2.533,2.931,6.165,4.126,9.766,3.854c2.406-0.158,4.859-0.893,6.836-2.611c4.938-4.223,5.479-11.647,1.273-16.57 c-9.527-11.072-8.27-27.816,2.819-37.312c4.923-4.253,5.481-11.678,1.275-16.585C277.504,233.752,275.194,232.686,272.82,232.127z' />
          </svg>
          <span className='title'>{t('poap.collection.empty.title')}</span>
          <span className='subtitle'>{t('poap.collection.empty.subtitle')}</span>
        </div>
      </Container>
    )
  }

  if (loading)
    return (
      <Container>
        <GlobalStyleLight />
        {loading && (
          <div className='spinner'>
            <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='50' cy='50' r='45' />
            </svg>
          </div>
        )}
      </Container>
    )

  return (
    <Container>
      <GlobalStyleLight />
      <Header light />
      <div className='collection'>
        <span className='title'>{t('poap.collection.title')}</span>
        <span className='subtitle'>{t('poap.collection.subtitle')}</span>
        {userAddressAcquired && <span className='explain'>{t('poap.collection.explain')}</span>}
        <WalletButton />
        <InstructionsButton />
        <div className='cards'>
          {nfts.map((claimed, index) => (
            <NFT key={String(index)} id={index} claimed={claimed} />
          ))}
        </div>
      </div>
      <div className='rare'>
        <span className='title'>{t('poap.collection.rare.title')}</span>
        <span className='subtitle'>
          {rareNFT ? t('poap.collection.rare.unlocked') : t('poap.collection.rare.locked')}
        </span>
        <NFT id={11} claimed={rareNFT} rare />
      </div>
      <Footer light />
    </Container>
  )
}
export default Collection
