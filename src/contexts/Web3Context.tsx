import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface Props {
  children: ReactNode
}

interface Web3ContextData {
  hasMetamask: boolean
}

declare global {
  interface Window {
    ethereum: unknown
  }
}

export const Web3Context = createContext<Web3ContextData>({} as Web3ContextData)

export const Web3Provider: React.FC<Props> = ({ children }: Props) => {
  const [address, setAddress] = useState(false)

  const [hasMetamask, setHasMetamask] = useState(false)

  useEffect(() => {
    setHasMetamask((window as any).ethereum)
  }, [])

  return (
    <Web3Context.Provider
      value={{
        hasMetamask
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3Context = (): Web3ContextData => useContext(Web3Context)
