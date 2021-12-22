import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { useThreeContext } from '../../contexts/ThreeJSContext'

import { Container } from './styles'

import PathsData from '../../config/paths.json'
import Curve from '../../three/experience/Curve'

const Canvas: React.FC = ({}) => {
  const { threeExperience, loaded } = useThreeContext()

  const [curve, setCurve] = useState<Curve>()

  const disabled = !threeExperience || !loaded || !curve

  useEffect(() => {
    if (!threeExperience || !loaded || curve) return
    const scale = 4
    const points = PathsData[0].points.map(
      (point) => new THREE.Vector3(point[0] * scale, point[2] * scale + 1, -point[1] * scale)
    )
    setCurve(new Curve(threeExperience, points))
  }, [threeExperience, loaded, curve])

  return (
    <Container>
      <button
        className='back'
        disabled={disabled}
        onClick={() => threeExperience!.camera.followCurve(curve!, false)}
      >
        Back
      </button>
      <button
        className='go'
        disabled={disabled}
        onClick={() => threeExperience!.camera.followCurve(curve!, true)}
      >
        Go
      </button>
    </Container>
  )
}

export default Canvas
