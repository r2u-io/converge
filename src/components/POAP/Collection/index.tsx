import React, { useEffect, useState } from 'react'

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

  const [nfts, setNFTs] = useState<boolean[]>([])
  const [rareNFT, setRareNFT] = useState(false)

  const [loading, setLoading] = useState(true)

  const { userAddressAcquired, setUserAddressAcquired } = useWeb3Context()

  useEffect(() => {
    fetch('/api/poap-user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200)
        res.json().then((data) => {
          setRareNFT(data.vtex.pop())
          setNFTs(data.vtex)
          setLoading(false)

          if (data.address) setUserAddressAcquired(true)
        })
    })
  }, [])

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
