import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import * as THREE from 'three'

import CurvesData from '../config/curves.json'
import PointsData from '../config/points.json'
import ThreeExperience from '../three/experience'
import Curve from '../three/experience/Curve'

interface CurveParams {
  curve: Curve
  duration: number
}

interface Props {
  children: ReactNode
}

interface ThreeContextData {
  loaded: boolean
  threeExperience?: ThreeExperience
  setThreeExperience: (threeExperience: ThreeExperience) => void
  setSceneLoaded: () => void
  nextPoint: () => void
  prevPoint: () => void
  isFirstPoint: boolean
  isLastPoint: boolean
  moving: boolean
  onFreeTour: boolean
  activateFreeTour: () => void
}

export const ThreeContext = createContext<ThreeContextData>({} as ThreeContextData)

export const ThreeProvider: React.FC<Props> = ({ children }: Props) => {
  const [threeExperience, setThreeExperience] = useState<ThreeExperience>()
  const [loaded, setLoaded] = useState(false)

  const [activePoint, setActivePoint] = useState(0)

  const isFirstPoint = activePoint === 0
  const isLastPoint = activePoint === PointsData.length - 1

  const [curves, setCurves] = useState<CurveParams[]>()
  const [lastCurve, setLastCurve] = useState<CurveParams>()
  const [forward, setForward] = useState(true)
  const [moving, setMoving] = useState(false)
  const [onFreeTour, setOnFreeTour] = useState(false)

  const house = threeExperience?.world.house

  useEffect(() => {
    if (!threeExperience || !loaded) return
    threeExperience.camera.toPoint(PointsData[0])
    threeExperience.raycaster.floor = 0
  }, [threeExperience, loaded])

  useEffect(() => {
    if (!threeExperience || !loaded || curves) return

    const curvesInstances = CurvesData.map(({ points, duration }) => {
      const vectorPoints = points.map((point) => new THREE.Vector3().fromArray(point))
      const curve = new Curve(vectorPoints)
      return { curve, duration }
    })

    setLastCurve(curvesInstances.pop())
    setCurves(curvesInstances)
  }, [threeExperience, loaded, curves])

  useEffect(() => {
    if (!threeExperience || !curves || !moving || onFreeTour) return
    const { curve, duration } = curves[activePoint - 1 * Number(forward)]

    threeExperience.camera
      .followCurve(
        curve,
        forward,
        duration,
        new THREE.Vector3().fromArray(PointsData[activePoint].targetPosition)
      )
      .then(() => {
        threeExperience.camera.toPoint(PointsData[activePoint])
        threeExperience!.raycaster.floor = activePoint
        setMoving(false)
      })
  }, [threeExperience, curves, moving, activePoint, forward, onFreeTour])

  useEffect(() => {
    if (!threeExperience || !house || !house.debug.active) return

    const teleportToPoint = (point: number) => {
      setActivePoint(point)
      threeExperience.camera.toPoint(PointsData[point])
    }

    const changeScene = {
      '0': () => teleportToPoint(0),
      '1': () => teleportToPoint(1),
      '2': () => teleportToPoint(2),
      '3': () => teleportToPoint(3),
      '4': () => teleportToPoint(4),
      '5': () => teleportToPoint(5)
    }

    house.debugFolder!.add(changeScene, '0')
    house.debugFolder!.add(changeScene, '1')
    house.debugFolder!.add(changeScene, '2')
    house.debugFolder!.add(changeScene, '3')
    house.debugFolder!.add(changeScene, '4')
    house.debugFolder!.add(changeScene, '5')
  }, [threeExperience, house])

  const setSceneLoaded = () => setLoaded(true)

  const prevPoint = () => {
    if (isFirstPoint) return
    setActivePoint(activePoint - 1)
    setMoving(true)
    setForward(false)
    threeExperience!.raycaster.floor = -1
  }

  const nextPoint = () => {
    if (isLastPoint) return
    setActivePoint(activePoint + 1)
    setMoving(true)
    setForward(true)
    threeExperience!.raycaster.floor = -1
  }

  const activateFreeTour = () => {
    if (!lastCurve) return
    if (!threeExperience) return

    const { curve, duration } = lastCurve

    setActivePoint(0)
    setMoving(true)
    setOnFreeTour(true)
    threeExperience!.raycaster.floor = -1

    threeExperience.camera.openFOV(duration)
    threeExperience.camera
      .followCurve(
        curve,
        true,
        duration,
        new THREE.Vector3().fromArray(PointsData[0].targetPosition)
      )
      .then(() => {
        threeExperience.camera.toPoint(PointsData[0])
        setMoving(false)
        threeExperience!.camera.setFlyControls()
      })
  }

  return (
    <ThreeContext.Provider
      value={{
        loaded,
        threeExperience,
        setThreeExperience,
        setSceneLoaded,
        nextPoint,
        prevPoint,
        isFirstPoint,
        isLastPoint,
        moving,
        onFreeTour,
        activateFreeTour
      }}
    >
      {children}
    </ThreeContext.Provider>
  )
}

export const useThreeContext = (): ThreeContextData => useContext(ThreeContext)
