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
}

export const ThreeContext = createContext<ThreeContextData>({} as ThreeContextData)

export const ThreeProvider: React.FC<Props> = ({ children }: Props) => {
  const [meta] = useState({ website: 'https://meta.r2u.io' })

  const [threeExperience, setThreeExperience] = useState<ThreeExperience>()
  const [loaded, setLoaded] = useState(false)

  const [activePoint, setActivePoint] = useState(0)
  // const start = activePoint === 0
  // const finish = activePoint === PointsData.length - 1

  const setSceneLoaded = () => setLoaded(true)

  // const nextPoint = () => setActivePoint(activePoint + 1)

  return (
    <ThreeContext.Provider
      value={{
        meta,
        loaded,
        threeExperience,
        setThreeExperience,
        setSceneLoaded
      }}
    >
      {children}
    </ThreeContext.Provider>
  )
}

export const useThreeContext = (): ThreeContextData => {
  return useContext(ThreeContext)
}
