import React, { createContext, ReactNode, useContext, useState } from 'react'

interface Props {
  children: ReactNode
}

interface UIContextData {
  menuOpened: boolean
  mapOpened: boolean
  teamOpened: boolean
  aboutOpened: boolean
  loading: boolean
  showPortraitPrompt: boolean
  toggleMenu: () => void
  openMap: () => void
  openTeam: () => void
  openAbout: () => void
  closeMenu: () => void
  closeMap: () => void
  closeTeam: () => void
  closeAbout: () => void
  finishLoading: () => void
  keepPortrait: () => void
}

export const UIContext = createContext<UIContextData>({} as UIContextData)

export const UIProvider: React.FC<Props> = ({ children }: Props) => {
  const [loading, setLoading] = useState(true)

  const [showPortraitPrompt, setShowPortraitPrompt] = useState(true)

  const [menuOpened, setMenuOpened] = useState(false)
  const [mapOpened, setMapOpened] = useState(false)
  const [teamOpened, setTeamOpened] = useState(false)
  const [aboutOpened, setAboutOpened] = useState(false)

  const toggleMenu = () => setMenuOpened(!menuOpened)
  const openMap = () => setMapOpened(true)
  const openTeam = () => setTeamOpened(true)
  const openAbout = () => setAboutOpened(true)

  const closeMenu = () => setMenuOpened(false)
  const closeMap = () => setMapOpened(false)
  const closeTeam = () => setTeamOpened(false)
  const closeAbout = () => setAboutOpened(false)

  const keepPortrait = () => setShowPortraitPrompt(false)

  const finishLoading = () => setLoading(false)

  return (
    <UIContext.Provider
      value={{
        menuOpened,
        mapOpened,
        teamOpened,
        aboutOpened,
        loading,
        showPortraitPrompt,
        toggleMenu,
        openMap,
        openTeam,
        openAbout,
        closeMenu,
        closeMap,
        closeTeam,
        closeAbout,
        finishLoading,
        keepPortrait
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export const useUIContext = (): UIContextData => useContext(UIContext)
