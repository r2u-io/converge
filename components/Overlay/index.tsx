import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import OverlayModel from '../../three/experience/World/OverlayModel'
import { Container } from './styles'

const Canvas: React.FC = () => {
  const {
    threeExperience,
    loaded,
    nextPoint,
    prevPoint,
    isFirstPoint,
    isLastPoint,
    moving,
    onFreeTour,
    activateFreeTour
  } = useThreeContext()

  const disabled = !threeExperience || !loaded

  const [openMap, setOpenMap] = useState(false)
  const [model, setModel] = useState<OverlayModel>()

  const [canActivateFreeTour, setCanActivateFreeTour] = useState(false)

  const instructionsRef = useRef(null)

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
      {onFreeTour && !moving && (
        <div ref={instructionsRef} className='blocker'>
          <div className='instructions '>
            <h2>Click to play</h2>
            <p>
              Move: WASD
              <br />
              Look: MOUSE
            </p>
          </div>
        </div>
      )}
      {!onFreeTour && (
        <>
          <button type='button' disabled={disabled || isFirstPoint || moving} onClick={prevPoint}>
            Back
          </button>
          <button type='button' disabled={disabled || isLastPoint || moving} onClick={nextPoint}>
            Next
          </button>
        </>
      )}
      {openMap && (
        <div className='map'>
          <button type='button' onClick={() => setOpenMap(false)}>
            X
          </button>
          <Image src='/images/map.svg' alt='map' height={300} width={500} />
        </div>
      )}
      {canActivateFreeTour && (
        <button
          type='button'
          onClick={() => {
            setCanActivateFreeTour(false)
            activateFreeTour()
          }}
        >
          Tour
        </button>
      )}
    </Container>
  )
}

export default Canvas
