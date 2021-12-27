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

    threeExperience.camera.instance?.position.set(
      PointsData[0].cameraPosition[0],
      PointsData[0].cameraPosition[1],
      PointsData[0].cameraPosition[2]
    )
    threeExperience.camera.controls?.target.set(
      PointsData[0].targetPosition[0],
      PointsData[0].targetPosition[1],
      PointsData[0].targetPosition[2]
    )

    threeExperience.camera.controls!.maxPolarAngle = (Math.PI * PointsData[0].maxPolarAngle) / 180
    threeExperience.camera.controls!.minPolarAngle = (Math.PI * PointsData[0].minPolarAngle) / 180
    threeExperience.camera.controls!.maxAzimuthAngle =
      (Math.PI * PointsData[0].maxAzimuthAngle) / 180
    threeExperience.camera.controls!.minAzimuthAngle =
      (Math.PI * PointsData[0].minAzimuthAngle) / 180
  }, [threeExperience, loaded, curves])

  useEffect(() => {
    if (!threeExperience || !curves || activePoint === lastPoint) return
    // setMoving(true)

    const forward = activePoint > lastPoint
    // const { curve, duration } = curves[activePoint - 1 * Number(forward)]

    // threeExperience.camera.followCurve(curve, forward, duration).then(() => setMoving(false))

    setLastPoint(activePoint)

    threeExperience.camera.instance?.position.set(
      PointsData[activePoint].cameraPosition[0],
      PointsData[activePoint].cameraPosition[1],
      PointsData[activePoint].cameraPosition[2]
    )
    threeExperience.camera.controls?.target.set(
      PointsData[activePoint].targetPosition[0],
      PointsData[activePoint].targetPosition[1],
      PointsData[activePoint].targetPosition[2]
    )

    threeExperience.camera.vertical = activePoint === 3
    threeExperience.camera.verticalX = PointsData[activePoint].cameraPosition[0]
    threeExperience.camera.verticalZ = PointsData[activePoint].cameraPosition[2]

    threeExperience.camera.controls!.maxPolarAngle =
      (Math.PI * PointsData[activePoint].maxPolarAngle) / 180
    threeExperience.camera.controls!.minPolarAngle =
      (Math.PI * PointsData[activePoint].minPolarAngle) / 180
    threeExperience.camera.controls!.maxAzimuthAngle =
      (Math.PI * PointsData[activePoint].maxAzimuthAngle) / 180
    threeExperience.camera.controls!.minAzimuthAngle =
      (Math.PI * PointsData[activePoint].minAzimuthAngle) / 180
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

      <button
        className='back'
        onClick={() => {
          const azimuth =
            (180 * (threeExperience?.camera.controls?.getAzimuthalAngle() || 0)) / Math.PI
          const polar = ((threeExperience?.camera.controls?.getPolarAngle() || 0) * 180) / Math.PI
          const distance = threeExperience?.camera.controls?.getDistance() || 0

          console.log(`
          Distance: ${distance}
          Azimuth: ${azimuth}
          Polar: ${polar}
          `)
        }}
      >
        Print
      </button>
    </Container>
  )
}

export default Canvas
