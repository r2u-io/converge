import React, { useEffect, useState } from 'react'

import gsap from 'gsap'
import Image from 'next/image'

import { useThreeContext } from '../../../contexts/ThreeJSContext'
import Header from '../../Header'
import { Container } from './styles'

const SectionOne: React.FC = () => {
  const { threeExperience, setSceneReady, sceneReady } = useThreeContext()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!threeExperience) return

    threeExperience.resources.on('progress', setProgress)
    threeExperience.resources.on('ready', () => gsap.delayedCall(1.0, () => setSceneReady(true)))
  }, [threeExperience])

  return (
    <Container progress={progress} id='home'>
      <Header />
      <div className='converge'>
        <Image src='/images/converge.svg' alt='Converge' width={1920} height={100} />
        <span className='subtitle'>Connecting Worlds</span>
        {!sceneReady && (
          <div className='loading'>
            <div className='bar' />
          </div>
        )}
      </div>
    </Container>
  )
}

export default SectionOne
