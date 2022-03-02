import React, { createContext, ReactNode, useContext, useState } from 'react'

interface Props {
  children: ReactNode
}

interface OverlayContextData {
  formsOpened: boolean
  openForms: () => void
  closeForms: () => void
}

export const OverlayContext = createContext<OverlayContextData>({} as OverlayContextData)

export const OverlayProvider: React.FC<Props> = ({ children }: Props) => {
  const [formsOpened, setFormsOpened] = useState(false)

  const openForms = () => setFormsOpened(true)
  const closeForms = () => setFormsOpened(false)

  return (
    <OverlayContext.Provider
      value={{
        formsOpened,
        openForms,
        closeForms
      }}
    >
      {children}
    </OverlayContext.Provider>
  )
}

export const useOverlayContext = (): OverlayContextData => useContext(OverlayContext)
