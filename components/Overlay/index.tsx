import React from 'react'
import { useThreeContext } from '../../contexts/ThreeJSContext'

import { Container } from './styles'

const Canvas: React.FC = () => {
  const { threeExperience, loaded, nextPoint, prevPoint, firstPoint, lastPoint } = useThreeContext()

  const disabled = !threeExperience || !loaded

  return (
    <Container>
      <button className='back' disabled={disabled || firstPoint} onClick={prevPoint}>
        Back
      </button>
      <button className='go' disabled={disabled || lastPoint} onClick={nextPoint}>
        Next
      </button>
      {/* <button
        className='back'
        onClick={() => {
          const azimuth =
            (180 * (threeExperience?.camera.controls?.getAzimuthalAngle() || 0)) / Math.PI
          const polar = ((threeExperience?.camera.controls?.getPolarAngle() || 0) * 180) / Math.PI
          const distance = threeExperience?.camera.controls?.getDistance() || 0
          const position = threeExperience?.camera.instance?.position

          console.log(`
          Distance: ${distance}
          Azimuth: ${azimuth}
          Polar: ${polar}
          Position: ${position?.x} ${position?.y} ${position?.z}
          `)
        }}
      >
        Print
      </button> */}
    </Container>
  )
}

export default Canvas
