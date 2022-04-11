import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import type { MetaMaskInpageProvider } from '@metamask/providers'

interface Props {
  children: ReactNode
}

interface Web3ContextData {
  hasMetamask: boolean
  connect: () => void
  address: string
}

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider
  }
}

export const Web3Context = createContext<Web3ContextData>({} as Web3ContextData)

export const Web3Provider: React.FC<Props> = ({ children }: Props) => {
  const [hasMetamask, setHasMetamask] = useState(false)
  const [provider, setProvider] = useState<MetaMaskInpageProvider>()
  const [address, setAddress] = useState<string>('')
  const [networkId, setNetworkId] = useState<number>(0)

  useEffect(() => {
    setHasMetamask(!!window.ethereum)
    setProvider(window.ethereum)
  }, [])

  const changeAddress = (accounts: unknown) => {
    const addresses = accounts as string[]
    if (!addresses || !addresses[0]) return
    setAddress(addresses[0] as string)
  }

  const changeNetwork = (chainId: unknown) => {
    const id = chainId as number
    if (!id) return
    setNetworkId(Number(id))
  }

  useEffect(() => {
    if (!provider) return

    provider.on('accountsChanged', changeAddress)
    provider.on('chainChanged', changeNetwork)

    provider.request({ method: 'eth_chainId' }).then(changeNetwork)
  }, [provider])

  const connect = () =>
    provider
      ?.request<string[]>({ method: 'eth_requestAccounts' })
      .then(changeAddress)
      .catch((err) => {
        if (err.code === 4001) {
          console.warn('Please connect to MetaMask.')
        } else {
          console.error(err)
        }
      })

  useEffect(() => {
    console.warn(address)
  }, [address])

  useEffect(() => {
    console.warn(networkId)
  }, [networkId])

  return (
    <Web3Context.Provider
      value={{
        hasMetamask,
        address,
        connect
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3Context = (): Web3ContextData => useContext(Web3Context)
