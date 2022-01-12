import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import { useUIContext } from '../../contexts/UIContext'
import Loader from '../../three/experience/Loader'
import { Container } from './styles'

const LoadingScreen: React.FC = () => {
  const { threeExperience } = useThreeContext()
  const { finishLoading } = useUIContext()

  const [loader, setLoader] = useState<Loader>()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!threeExperience || loader) return
    const loaderInstance = new Loader(threeExperience, setProgress, finishLoading)
    setLoader(loaderInstance)
  }, [threeExperience, loader])

  return (
    <Container className={progress === 1 ? 'loaded' : ''}>
      <h2>{Math.round(progress * 10000) / 100}%</h2>
      <Image src='/images/about.png' alt='about' layout='fill' quality={100} />
      <Image src='/images/converge.svg' alt='logo' width={300} height={45} />
      <Image src='/images/map.png' alt='map' height={630} width={1152} />
      <Image src='/images/team.png' alt='about' layout='fill' quality={100} />
    </Container>
  )
}

export default LoadingScreen
