import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import { useUIContext } from '../../contexts/UIContext'
import Model from '../../three/experience/World/Model'
import { Container } from './styles'

const Map: React.FC = () => {
  const { openMap, closeMap, mapOpened } = useUIContext()
  const { sceneReady, threeExperience } = useThreeContext()

  const [model, setModel] = useState<Model>()

  useEffect(() => {
    if (!sceneReady || !threeExperience || model) return
    const modelInstance = new Model(threeExperience, 'map', 1, null, null, openMap)
    setModel(modelInstance)
  }, [sceneReady, threeExperience, model])

  return (
    <Container onClick={closeMap} open={mapOpened}>
      <span>Connecting worlds</span>
      <Image src='/images/map.png' alt='map' height={630} width={1152} objectFit='contain' />
    </Container>
  )
}

export default Map
