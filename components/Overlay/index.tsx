import React, { useEffect, useState } from 'react'
import { useThreeContext } from '../../contexts/ThreeJSContext'

import Image from 'next/image'

import { Container } from './styles'
import OverlayModel from '../../three/experience/World/OverlayModel'

const Canvas: React.FC = () => {
  const {
    threeExperience,
    loaded,
    nextPoint,
    prevPoint,
    isFirstPoint,
    isLastPoint,
    moving,
    activateFreeTour
  } = useThreeContext()

  const disabled = !threeExperience || !loaded

  const [openMap, setOpenMap] = useState(false)
  const [model, setModel] = useState<OverlayModel>()

  const [canActivateFreeTour, setCanActivateFreeTour] = useState(false)

  useEffect(() => {
    if (!loaded || !threeExperience || model) return

    const modelInstance = new OverlayModel(threeExperience, 'map', () => setOpenMap(true))

    setModel(modelInstance)
  }, [loaded, threeExperience, model])

  useEffect(() => {
    if (isLastPoint && !canActivateFreeTour) setCanActivateFreeTour(true)
  }, [isLastPoint, canActivateFreeTour])

  return (
    <Container>
      <button className='back' disabled={disabled || isFirstPoint || moving} onClick={prevPoint}>
        Back
      </button>
      <button className='go' disabled={disabled || isLastPoint || moving} onClick={nextPoint}>
        Next
      </button>
      <button
        className='print'
        onClick={() => {
          const phi =
            (180 * (threeExperience?.camera.orbitControls?.getAzimuthalAngle() || 0)) / Math.PI
          const theta =
            (180 * (threeExperience?.camera.orbitControls?.getPolarAngle() || 0)) / Math.PI
          const radius = threeExperience?.camera.orbitControls?.getDistance()
          const cameraPosition = threeExperience?.camera.instance?.position.toArray()
          const targetPosition = threeExperience?.camera.orbitControls?.target.toArray()

          console.table({
            phi,
            theta,
            radius
          })
          console.table({
            cameraPosition,
            targetPosition
          })
        }}
      >
        Print
      </button>
      {openMap && (
        <div className='map'>
          <button onClick={() => setOpenMap(false)}>X</button>
          <Image src='/images/map.svg' alt='map' height={300} width={500} />
        </div>
      )}
      {canActivateFreeTour && (
        <button
          className='print'
          onClick={() => {
            setCanActivateFreeTour(false)
            activateFreeTour()
          }}
        >
          Free Tour
        </button>
      )}
    </Container>
  )
}

export default Canvas
