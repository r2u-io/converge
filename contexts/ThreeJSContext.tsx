import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import PointsData from '../config/points.json'

import ThreeExperience from '../three/experience'

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

  const setSceneLoaded = () => setLoaded(true)

  const firstPoint = activePoint === 0
  const lastPoint = activePoint === PointsData.length - 1
  const prevPoint = () => !firstPoint && setActivePoint(activePoint - 1)
  const nextPoint = () => !lastPoint && setActivePoint(activePoint + 1)

  useEffect(() => {
    if (!threeExperience || !loaded) return

    threeExperience.camera.setPoint({
      vertical: activePoint === 3,
      ...PointsData[activePoint]
    })
  }, [threeExperience, loaded, activePoint])

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
