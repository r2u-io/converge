import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import * as THREE from 'three'

import PointsData from '../config/points.json'
import CurvesData from '../config/curves.json'

import ThreeExperience from '../three/experience'
import Curve from '../three/experience/Curve'

interface CurveParams {
  curve: Curve
  duration: number
}

interface Props {
  children: ReactNode
}

interface Meta {
  website: string
}

interface ThreeContextData {
  meta: Meta
  loaded: boolean
  threeExperience?: ThreeExperience
  setThreeExperience: (threeExperience: ThreeExperience) => void
  setSceneLoaded: () => void
  nextPoint: () => void
  prevPoint: () => void
  firstPoint: boolean
  lastPoint: boolean
}

export const ThreeContext = createContext<ThreeContextData>({} as ThreeContextData)

export const ThreeProvider: React.FC<Props> = ({ children }: Props) => {
  const [meta] = useState({ website: 'https://meta.r2u.io' })

  const [threeExperience, setThreeExperience] = useState<ThreeExperience>()
  const [loaded, setLoaded] = useState(false)

  const [activePoint, setActivePoint] = useState(0)

  const firstPoint = activePoint === 0
  const lastPoint = activePoint === PointsData.length - 1

  const [curves, setCurves] = useState<CurveParams[]>()
  const [forward, setForward] = useState(true)
  const [moving, setMoving] = useState(false)

  useEffect(() => {
    if (!threeExperience || !loaded) return

    threeExperience.camera.toPoint(PointsData[0])
  }, [threeExperience, loaded])

  useEffect(() => {
    if (!threeExperience || !loaded || curves) return

    const curvesInstances = CurvesData.map(({ points, duration }) => {
      const vectorPoints = points.map((point) => new THREE.Vector3().fromArray(point))
      const curve = new Curve(vectorPoints)

      if (threeExperience.debug.active) {
        curve.addHelper()
        threeExperience.scene.add(curve.helper)
      }

      return { curve, duration }
    })

    setCurves(curvesInstances)
  }, [threeExperience, loaded, curves])

  useEffect(() => {
    if (!threeExperience || !curves || !moving) return
    const { curve, duration } = curves[activePoint - 1 * Number(forward)]

    threeExperience.camera.toCurve(curve).then(() =>
      threeExperience.camera
        .followCurve(
          curve,
          forward,
          duration,
          new THREE.Vector3().fromArray(PointsData[activePoint].targetPosition)
        )
        .then(() => {
          threeExperience.camera.toPoint(PointsData[activePoint])
          setMoving(false)
        })
    )
  }, [threeExperience, curves, moving, activePoint, lastPoint, forward])

  const setSceneLoaded = () => setLoaded(true)

  const prevPoint = () => {
    if (firstPoint) return
    setActivePoint(activePoint - 1)
    setMoving(true)
  }
  const nextPoint = () => {
    if (lastPoint) return
    setActivePoint(activePoint + 1)
    setMoving(true)
  }

  return (
    <ThreeContext.Provider
      value={{
        meta,
        loaded,
        threeExperience,
        setThreeExperience,
        setSceneLoaded,
        nextPoint,
        prevPoint,
        firstPoint,
        lastPoint
      }}
    >
      {children}
    </ThreeContext.Provider>
  )
}

export const useThreeContext = (): ThreeContextData => {
  return useContext(ThreeContext)
}
