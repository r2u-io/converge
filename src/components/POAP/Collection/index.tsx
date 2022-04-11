import React, { useEffect, useState } from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import Header from '../Header'
import NFT from './NFT'
import { Container } from './styles'

const Collection: React.FC = () => {
  const { t } = useTranslation()

  const [nfts, setNFTs] = useState<boolean[]>([])
  const [rareNFT, setRareNFT] = useState(false)

  const [loading, setLoading] = useState(true)

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
        })
    })
  }, [])

  if (loading)
    return (
      <Container>
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
      <Link href='/api/auth/logout' passHref>
        <button type='button' className='logout'>
          <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1000 1000'
            width={30}
            height={30}
            fill='#2f1346'
          >
            <g transform='translate(0,511) scale(0.1,-0.1)'>
              <path d='M295.2,4895.9c-65.1-32.5-114.9-80.2-145.3-136.6l-49.9-86.7V942.6c0-3608.5,2.2-3732.1,41.2-3821c28.2-60.7,69.4-106.2,136.6-143.1c2459.1-1390,2990.4-1687.1,3049-1698c101.9-21.7,251.6,43.4,325.3,138.8l58.6,75.9l6.5,711.3l6.5,711.3l1446.4,6.5c1413.9,6.5,1448.6,6.5,1522.3,52c41.2,23.9,97.6,75.9,123.6,117.1l49.9,71.6v1177.5v1179.7h-336.1h-336.1v-954.2v-954.2H4957.6H3721.5l-4.3,2728l-6.5,2730.2l-54.2,69.4c-39,49.9-314.4,219-932.5,568.2c-483.6,275.4-893.4,507.4-910.8,518.3c-19.5,13,837.1,21.7,2175.1,21.7h2205.4V3024.5V1799.2h336.1h336.1V3250v1448.6l-47.7,71.6c-28.2,39-78,93.2-110.6,117.1l-60.7,45.5l-3127.1,6.5l-3127.1,4.3L295.2,4895.9z' />
              <path d='M7653.1,2180.9l-60.7-52l-6.5-490.1l-6.5-490.1h-915.1c-544.3,0-954.2-10.8-1012.7-23.9c-229.9-52-379.5-236.4-379.5-464.1c2.2-195.2,88.9-338.3,260.2-429.4c84.6-45.5,110.6-47.7,1066.9-54.2l980.2-6.5l6.5-487.9l6.5-490.1l73.7-65c60.7-54.2,86.7-62.9,145.3-54.2c88.9,15.2,2021.1,1409.6,2068.8,1494.1c21.7,43.4,26,75.9,10.8,138.8c-19.5,75.9-82.4,125.8-1017.1,804.5c-889.1,644.1-1006.2,722.1-1077.8,722.1C7739.8,2232.9,7694.3,2215.6,7653.1,2180.9z' />
            </g>
          </svg>
        </button>
      </Link>
      <div className='collection'>
        <span className='title'>{t('poap.collection.title')}</span>
        <span className='subtitle'>{t('poap.collection.subtitle')}</span>
        <span className='subtitle'>{t('poap.collection.subtitle')}</span>
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
    </Container>
  )
}
export default Collection
