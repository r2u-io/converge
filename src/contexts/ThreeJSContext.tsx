import React, { createContext, ReactNode, useContext, useState } from 'react'

import ThreeExperience from '../three/experience'

interface Props {
  children: ReactNode
}

interface ThreeContextData {
  threeExperience?: ThreeExperience
  sceneReady: boolean
  setThreeExperience: (threeExperience: ThreeExperience) => void
  setSceneReady: (state: boolean) => void
}

export const ThreeContext = createContext<ThreeContextData>({} as ThreeContextData)

export const ThreeProvider: React.FC<Props> = ({ children }: Props) => {
  const [threeExperience, setThreeExperience] = useState<ThreeExperience>()
  const [sceneReady, setSceneReady] = useState(false)

  return (
    <ThreeContext.Provider
      value={{
        threeExperience,
        sceneReady,
        setThreeExperience,
        setSceneReady
      }}
    >
      {children}
    </ThreeContext.Provider>
  )
}

export const useThreeContext = (): ThreeContextData => useContext(ThreeContext)
