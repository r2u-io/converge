import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useThreeContext } from '../../../contexts/ThreeJSContext'
import Loader from '../../../three/experience/Loader'
import Header from '../../Header'
import { Container } from './styles'

const SectionOne: React.FC = () => {
  const { threeExperience, setSceneReady, sceneReady } = useThreeContext()
  const [loader, setLoader] = useState<Loader>()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!threeExperience || loader) return
    const loaderInstance = new Loader(threeExperience, setProgress, () => setSceneReady(true))
    setLoader(loaderInstance)
  }, [threeExperience, loader])

  return (
    <Container progress={progress}>
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
