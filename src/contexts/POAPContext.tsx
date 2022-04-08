import React, { createContext, ReactNode, useContext, useState } from 'react'

interface Props {
  children: ReactNode
}

interface POAPContextData {
  instructionsOpened: boolean
  openInstructions: () => void
  closeInstructions: () => void
}

export const POAPContext = createContext<POAPContextData>({} as POAPContextData)

export const POAPProvider: React.FC<Props> = ({ children }: Props) => {
  const [instructionsOpened, setInstructionsOpened] = useState(false)

  const openInstructions = () => setInstructionsOpened(true)
  const closeInstructions = () => setInstructionsOpened(false)

  return (
    <POAPContext.Provider
      value={{
        instructionsOpened,
        openInstructions,
        closeInstructions
      }}
    >
      {children}
    </POAPContext.Provider>
  )
}

export const usePOAPContext = (): POAPContextData => useContext(POAPContext)
