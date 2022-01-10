import React from 'react'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import { Container } from './styles'

const Instructions: React.FC = () => {
  const { threeExperience, flyInstructionsRef } = useThreeContext()

  return (
    <Container ref={flyInstructionsRef} className='blocker'>
      <div className='instructions '>
        <h2>Click to play</h2>
        {threeExperience?.isMobile ? (
          <p>
            Rotate: TOUCH/MOVE 1 Finger
            <br />
            Zoom: PINCH 2 Fingers
            <br />
            Drag: TOUCH/MOVE 2 Fingers
          </p>
        ) : (
          <p>
            Move: WASD
            <br />
            Look: MOUSE
          </p>
        )}
      </div>
    </Container>
  )
}

export default Instructions
