import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { useThreeContext } from '../../contexts/ThreeJSContext'

import { Container } from './styles'

import Curve from '../../three/experience/Curve'

import CurvesData from '../../config/curves.json'
import PointsData from '../../config/points.json'

interface CurveParams {
  curve: Curve
  duration: number
}

const Canvas: React.FC = ({}) => {
  const { threeExperience, loaded } = useThreeContext()

  const [curves, setCurves] = useState<CurveParams[]>()

  const [moving, setMoving] = useState(false)
  const [lastPoint, setLastPoint] = useState(0)
  const [activePoint, setActivePoint] = useState(0)

  const disabled = !threeExperience || !loaded || !curves

  const start = activePoint === 0
  const finish = activePoint === PointsData.length - 1

  useEffect(() => {
    if (!threeExperience || !loaded || curves) return

    const curvesInstances = CurvesData.map(({ points, duration }) => {
      const vectorPoints = points.map((point) => new THREE.Vector3().fromArray(point))
      const curve = new Curve(vectorPoints)
      return { curve, duration }
    })

    setCurves(curvesInstances)
  }, [threeExperience, loaded, curves])

  useEffect(() => {
    if (!threeExperience || !curves || activePoint === lastPoint) return
    setMoving(true)

    const forward = activePoint > lastPoint
    const { curve, duration } = curves[activePoint - 1 * Number(forward)]

    threeExperience.camera
      .toCurve(curve, forward)
      .then(() =>
        threeExperience.camera.followCurve(curve, forward, duration).then(() => setMoving(false))
      )

    setLastPoint(activePoint)
  }, [threeExperience, curves, activePoint, lastPoint])

  return (
    <Container>
      <button
        className='back'
        disabled={disabled || start || moving}
        onClick={() => setActivePoint(activePoint - 1)}
      >
        Back
      </button>
      <button
        className='go'
        disabled={disabled || finish || moving}
        onClick={() => setActivePoint(activePoint + 1)}
      >
        Next
      </button>
    </Container>
  )
}

export default Canvas
