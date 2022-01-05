import React, { useRef } from 'react'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import { useUIContext } from '../../contexts/UIContext'
import Buttons from '../Buttons'
import Header from '../Header'
import Map from '../Map'
import Team from '../Team'
import { Container } from './styles'

const Overlay: React.FC = () => {
  const { moving, onFreeTour } = useThreeContext()
  const { mapOpened, teamOpened } = useUIContext()

  const instructionsRef = useRef(null)

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
      {!onFreeTour && <Buttons />}
      <div className='fullscreen'>
        <Header />
        {mapOpened && <Map />}
        {teamOpened && <Team />}
      </div>
    </Container>
  )
}

export default Overlay
