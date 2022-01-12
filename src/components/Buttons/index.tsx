import React, { useEffect, useState } from 'react'

import PointsData from '../../config/points.json'
import { useThreeContext } from '../../contexts/ThreeJSContext'
import { Container } from './styles'

const Buttons: React.FC = () => {
  const {
    activePoint,
    isFirstPoint,
    isLastPoint,
    moving,
    nextPoint,
    prevPoint,
    toPoint,
    activateFreeTour
  } = useThreeContext()

  const [mounted, setMounted] = useState(false)
  const [lastSeenPoint, setLastSeenPoint] = useState(0)
  const [canActivateFreeTour, setCanActivateFreeTour] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (activePoint > lastSeenPoint) setLastSeenPoint(activePoint)
    if (isLastPoint) setCanActivateFreeTour(true)
  }, [activePoint, isLastPoint])

  return mounted ? (
    <Container>
      <button type='button' className='back' disabled={isFirstPoint || moving} onClick={prevPoint}>
        <svg width='30' height='30' viewBox='0 0 80 100'>
          <path fill='none' stroke='currentColor' strokeWidth='15' d='M100 95L-10 50 100 5' />
        </svg>
      </button>
      {PointsData.map((_point, index) => (
        <button
          type='button'
          className={`dot ${index === activePoint ? 'active' : ''}`}
          disabled={moving || index > lastSeenPoint}
          key={String(index)}
          onClick={() => toPoint(index)}
        >
          <svg width='20' height='20' fill='currentColor' stroke='currentColor'>
            <circle r={5} cx='50%' cy='50%' />
          </svg>
        </button>
      ))}
      <button type='button' className='next' disabled={isLastPoint || moving} onClick={nextPoint}>
        <svg width='30' height='30' viewBox='0 0 80 100'>
          <path fill='none' stroke='currentColor' strokeWidth='15' d='M-15 5l100 45-100 45' />
        </svg>
      </button>
      {canActivateFreeTour && (
        <button
          type='button'
          className='tour'
          onClick={() => {
            setCanActivateFreeTour(false)
            activateFreeTour()
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
            fill='currentColor'
            stroke='currentColor'
          >
            <path d='M20.92 2.38A15.72 15.72 0 0 0 17.5 2a8.26 8.26 0 0 0-6 2.06Q9.89 5.67 8.31 7.27c-1.21-.13-4.08-.2-6 1.74a1 1 0 0 0 0 1.41l11.3 11.32a1 1 0 0 0 1.41 0c1.95-2 1.89-4.82 1.77-6l3.21-3.2c3.19-3.19 1.74-9.18 1.68-9.43a1 1 0 0 0-.76-.73zm-2.36 8.75L15 14.67a1 1 0 0 0-.27.9 6.81 6.81 0 0 1-.54 3.94L4.52 9.82a6.67 6.67 0 0 1 4-.5A1 1 0 0 0 9.39 9s1.4-1.45 3.51-3.56A6.61 6.61 0 0 1 17.5 4a14.51 14.51 0 0 1 2.33.2c.24 1.43.62 5.04-1.27 6.93z' />
            <circle cx='15.73' cy='8.3' r='2' />
            <path d='M5 16c-2 1-2 5-2 5a7.81 7.81 0 0 0 5-2z' />
          </svg>
          <hr />
          Tour
        </button>
      )}
    </Container>
  ) : null
}

export default Buttons
