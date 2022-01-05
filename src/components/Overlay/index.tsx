import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import { Container } from './styles'

const Overlay: React.FC = () => {
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

  const [canActivateFreeTour, setCanActivateFreeTour] = useState(false)

  const instructionsRef = useRef(null)

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
      <div className='portrait'>
        <span>For a better experience, please turn your device to landscape mode.</span>
      </div>
    </Container>
  )
}

export default Overlay
