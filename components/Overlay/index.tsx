import React from 'react'
import { useThreeContext } from '../../contexts/ThreeJSContext'

import { Container } from './styles'

import Curve from '../../three/experience/Curve'

interface CurveParams {
  curve: Curve
  duration: number
}

const Canvas: React.FC = () => {
  const { threeExperience, loaded, nextPoint, prevPoint, firstPoint, lastPoint } = useThreeContext()

  // const [curves, setCurves] = useState<CurveParams[]>()

  // const [moving, setMoving] = useState(false)
  // const [lastPoint, setLastPoint] = useState(0)
  // const [activePoint, setActivePoint] = useState(0)

  // const disabled = !threeExperience || !loaded || !curves
  const disabled = !threeExperience || !loaded

  // const start = activePoint === 0
  // const finish = activePoint === PointsData.length - 1

  // useEffect(() => {
  //   if (!threeExperience || !loaded || curves) return

  //   const curvesInstances = CurvesData.map(({ points, duration }) => {
  //     const vectorPoints = points.map((point) => new THREE.Vector3().fromArray(point))
  //     const curve = new Curve(vectorPoints)
  //     return { curve, duration }
  //   })

  //   setCurves(curvesInstances)
  // }, [threeExperience, loaded, curves])

  // useEffect(() => {
  //   if (!threeExperience || !curves || activePoint === lastPoint) return
  //   // setMoving(true)

  //   const forward = activePoint > lastPoint
  //   // const { curve, duration } = curves[activePoint - 1 * Number(forward)]

  //   // threeExperience.camera.followCurve(curve, forward, duration).then(() => setMoving(false))

  //   setLastPoint(activePoint)
  // }, [threeExperience, curves, activePoint, lastPoint])

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

          console.log(`
          Distance: ${distance}
          Azimuth: ${azimuth}
          Polar: ${polar}
          `)
        }}
      >
        Print
      </button> */}
    </Container>
  )
}

export default Canvas
