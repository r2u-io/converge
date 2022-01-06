import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import { useUIContext } from '../../contexts/UIContext'
import Model from '../../three/experience/World/Model'
import { Container } from './styles'

const Map: React.FC = () => {
  const { mapOpened, openMap, closeMap } = useUIContext()
  const { sceneReady, threeExperience } = useThreeContext()

  const [model, setModel] = useState<Model>()

  useEffect(() => {
    if (!sceneReady || !threeExperience || model) return
    const modelInstance = new Model(threeExperience, 'map', 1, null, null, openMap)
    setModel(modelInstance)
  }, [sceneReady, threeExperience, model])

  return mapOpened ? (
    <Container onClick={closeMap}>
      <h2>Connecting worlds</h2>
      <Image src='/images/placeholder_map.png' alt='map' height={520} width={983} />
    </Container>
  ) : null
}

export default Map
