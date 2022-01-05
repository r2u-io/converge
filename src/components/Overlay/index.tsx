import React, { useRef, useState } from 'react'

import Image from 'next/image'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import Buttons from '../Buttons'
import Header from '../Header'
import { Container } from './styles'

const Overlay: React.FC = () => {
  const { moving, onFreeTour } = useThreeContext()

  const [openMap, setOpenMap] = useState(false)

  const instructionsRef = useRef(null)

  return (
    <Container>
      <Header />
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
      {!onFreeTour && <Buttons />}
      {openMap && (
        <div className='map'>
          <button type='button' onClick={() => setOpenMap(false)}>
            X
          </button>
          <Image src='/images/map.svg' alt='map' height={300} width={500} />
        </div>
      )}
    </Container>
  )
}

export default Overlay
