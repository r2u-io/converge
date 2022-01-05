import React, { createContext, ReactNode, useContext, useState } from 'react'

interface Props {
  children: ReactNode
}

interface UIContextData {
  menuOpened: boolean
  mapOpened: boolean
  teamOpened: boolean
  openMenu: () => void
  openMap: () => void
  openTeam: () => void
}

export const UIContext = createContext<UIContextData>({} as UIContextData)

export const UIProvider: React.FC<Props> = ({ children }: Props) => {
  const [menuOpened, setMenuOpened] = useState(false)
  const [mapOpened, setMapOpened] = useState(false)
  const [teamOpened, setTeamOpened] = useState(false)

  const openMenu = () => setMenuOpened(true)
  const openMap = () => setMapOpened(true)
  const openTeam = () => setTeamOpened(true)

  return (
    <UIContext.Provider
      value={{
        menuOpened,
        mapOpened,
        teamOpened,
        openMenu,
        openMap,
        openTeam
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export const useUIContext = (): UIContextData => useContext(UIContext)
