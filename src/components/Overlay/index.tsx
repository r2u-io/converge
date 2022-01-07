import React, { useRef } from 'react'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import Buttons from '../Buttons'
import Header from '../Header'
import LoadingScreen from '../LoadingScreen'
import Map from '../Map'
import Team from '../Team'
import { Container } from './styles'

const Overlay: React.FC = () => {
  const { moving, onFreeTour } = useThreeContext()

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
        <Map />
        <Team />
      </div>
      <div className='portrait'>
        <span>For a better experience, please turn your device to landscape mode.</span>
      </div>
      <LoadingScreen />
    </Container>
  )
}

export default Overlay
