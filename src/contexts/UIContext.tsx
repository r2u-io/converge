import React, { createContext, ReactNode, useContext, useState } from 'react'

interface Props {
  children: ReactNode
}

interface UIContextData {
  menuOpened: boolean
  mapOpened: boolean
  teamOpened: boolean
  loading: boolean
  showPortraitPrompt: boolean
  openMenu: () => void
  openMap: () => void
  openTeam: () => void
  closeMenu: () => void
  closeMap: () => void
  closeTeam: () => void
  setLoading: (value: boolean) => void
  keepPortrait: () => void
}

export const UIContext = createContext<UIContextData>({} as UIContextData)

export const UIProvider: React.FC<Props> = ({ children }: Props) => {
  const [loading, setLoading] = useState(true)

  const [showPortraitPrompt, setShowPortraitPrompt] = useState(true)

  const [menuOpened, setMenuOpened] = useState(false)
  const [mapOpened, setMapOpened] = useState(false)
  const [teamOpened, setTeamOpened] = useState(false)

  const openMenu = () => setMenuOpened(true)
  const openMap = () => setMapOpened(true)
  const openTeam = () => setTeamOpened(true)

  const closeMenu = () => setMenuOpened(false)
  const closeMap = () => setMapOpened(false)
  const closeTeam = () => setTeamOpened(false)

  const keepPortrait = () => setShowPortraitPrompt(false)

  return (
    <UIContext.Provider
      value={{
        menuOpened,
        mapOpened,
        teamOpened,
        loading,
        showPortraitPrompt,
        openMenu,
        openMap,
        openTeam,
        closeMenu,
        closeMap,
        closeTeam,
        setLoading,
        keepPortrait
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export const useUIContext = (): UIContextData => useContext(UIContext)
