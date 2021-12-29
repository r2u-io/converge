import React, { useEffect, useState } from 'react'
import { useThreeContext } from '../../contexts/ThreeJSContext'

import Image from 'next/image'

import { Container } from './styles'
import OverlayModel from '../../three/experience/World/OverlayModel'

const Canvas: React.FC = () => {
  const { threeExperience, loaded, nextPoint, prevPoint, firstPoint, lastPoint } = useThreeContext()

  const disabled = !threeExperience || !loaded

  const [openMap, setOpenMap] = useState(false)
  const [model, setModel] = useState<OverlayModel>()

  useEffect(() => {
    if (!loaded || !threeExperience || model) return

    const modelInstance = new OverlayModel(threeExperience, 'map', () => setOpenMap(true))

    setModel(modelInstance)
  }, [loaded, threeExperience, model])

  return (
    <Container>
      <button className='back' disabled={disabled || firstPoint} onClick={prevPoint}>
        Back
      </button>
      <button className='go' disabled={disabled || lastPoint} onClick={nextPoint}>
        Next
      </button>
      {openMap && (
        <div className='map'>
          <button onClick={() => setOpenMap(false)}>X</button>
          <Image src='/images/map.svg' alt='map' height={300} width={500} />
        </div>
      )}
    </Container>
  )
}

export default Canvas
