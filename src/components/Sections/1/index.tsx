import React, { useEffect, useState } from 'react'

import gsap from 'gsap'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import { useThreeContext } from '../../../contexts/ThreeJSContext'
import Header from '../../Header'
import { Container } from './styles'

const SectionOne: React.FC = () => {
  const { t } = useTranslation()

  const { threeExperience, setSceneReady, sceneReady } = useThreeContext()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!threeExperience) return

    threeExperience.resources.on('progress', setProgress)
    threeExperience.resources.on('ready', () => gsap.delayedCall(1.0, () => setSceneReady(true)))
  }, [threeExperience])

  return (
    <Container progress={progress} id='home' className='section'>
      <Header />
      <div className='converge'>
        <Image src='/images/converge.svg' alt='Converge' width={1920} height={300} />
        <span className='subtitle'>{t('sections.one.subtitle')}</span>
        {sceneReady ? (
          <>
            <div className='swipe'>
              <span>{t('sections.one.swipe')}</span>
              <svg
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 100 100'
                fill='none'
                stroke='currentColor'
                strokeWidth='10'
                strokeLinecap='round'
              >
                <path d='M5,50 h90 M95,50 l-30,-30 M95,50 l-30,30' />
              </svg>
            </div>
            <div className='scroll'>
              <span>{t('sections.one.scroll')}</span>
              <svg
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 100 100'
                fill='none'
                stroke='currentColor'
                strokeWidth='10'
                strokeLinecap='round'
              >
                <path d='M50,5 v90 M50,95 l-30,-30 M50,95 l30,-30' />
              </svg>
            </div>
          </>
        ) : (
          <div className='loading'>
            <div className='bar' />
          </div>
        )}
      </div>
    </Container>
  )
}

export default SectionOne
