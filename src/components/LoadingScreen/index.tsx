import React, { useEffect, useState } from 'react'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import { useUIContext } from '../../contexts/UIContext'
import Loader from '../../three/experience/Loader'
import { Container } from './styles'

const LoadingScreen: React.FC = () => {
  const { threeExperience } = useThreeContext()
  const { setLoading } = useUIContext()

  const [loader, setLoader] = useState<Loader>()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!threeExperience || loader) return
    const loaderInstance = new Loader(
      threeExperience,
      (p) => setProgress(p),
      () => setLoading(false)
    )
    setLoader(loaderInstance)
  }, [threeExperience, loader])

  return (
    <Container className={progress === 1 ? 'loaded' : ''}>
      <h2>{Math.round(progress * 10000) / 100}%</h2>
    </Container>
  )
}

export default LoadingScreen
