import React, { createContext, ReactNode, useContext, useState } from 'react'

import ThreeExperience from '../three/experience'

interface Props {
  children: ReactNode
}

interface ThreeContextData {
  threeExperience?: ThreeExperience
  sceneReady: boolean
  openForms: boolean
  setThreeExperience: (threeExperience: ThreeExperience) => void
  setSceneReady: (state: boolean) => void
  setOpenForms: (state: boolean) => void
}

export const ThreeContext = createContext<ThreeContextData>({} as ThreeContextData)

export const ThreeProvider: React.FC<Props> = ({ children }: Props) => {
  const [threeExperience, setThreeExperience] = useState<ThreeExperience>()
  const [sceneReady, setSceneReady] = useState(false)
  const [openForms, setOpenForms] = useState(false)

  return (
    <ThreeContext.Provider
      value={{
        threeExperience,
        sceneReady,
        openForms,
        setThreeExperience,
        setSceneReady,
        setOpenForms
      }}
    >
      {children}
    </ThreeContext.Provider>
  )
}

export const useThreeContext = (): ThreeContextData => useContext(ThreeContext)
