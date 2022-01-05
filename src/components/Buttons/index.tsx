import React, { useEffect, useState } from 'react'

import PointsData from '../../config/points.json'
import { useThreeContext } from '../../contexts/ThreeJSContext'
import { Container } from './styles'

const Buttons: React.FC = () => {
  const {
    threeExperience,
    loaded,
    nextPoint,
    prevPoint,
    toPoint,
    isFirstPoint,
    isLastPoint,
    moving,
    activePoint
  } = useThreeContext()

  const disabled = !threeExperience || !loaded

  const [lastSeenPoint, setLastSeenPoint] = useState(0)

  useEffect(() => {
    if (activePoint > lastSeenPoint) setLastSeenPoint(activePoint)
  }, [activePoint])

  return (
    <Container>
      <button
        type='button'
        className='back'
        disabled={disabled || isFirstPoint || moving}
        onClick={prevPoint}
      >
        Back
      </button>
      {PointsData.map((point, index) => (
        <button
          type='button'
          className={`dot ${index === activePoint ? 'active' : ''}`}
          disabled={disabled || moving || index > lastSeenPoint}
          key={String(index)}
          onClick={() => toPoint(index)}
        >
          <svg width='100' height='100' fill='currentColor' stroke='currentColor'>
            <circle r={5} cx='50%' cy='50%' />
          </svg>
        </button>
      ))}
      <button
        type='button'
        className='next'
        disabled={disabled || isLastPoint || moving}
        onClick={nextPoint}
      >
        Next
      </button>
    </Container>
  )
}

export default Buttons
