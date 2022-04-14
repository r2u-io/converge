import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { sequence } from '0xsequence'
import type { MetaMaskInpageProvider } from '@metamask/providers'

interface Props {
  children: ReactNode
}

interface Web3ContextData {
  hasMetamask: boolean
  connectMetamask: () => void
  connectSequence: () => void
  address: string
  setAddress: (address: string) => void
  userAddressAcquired: boolean
  setUserAddressAcquired: (acquired: boolean) => void
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

  const [userAddressAcquired, setUserAddressAcquired] = useState(false)

  const [sequenceWallet, setSequenceWallet] = useState<sequence.Wallet>()

  useEffect(() => {
    setHasMetamask(!!window.ethereum)
    setProvider(window.ethereum)

    sequenceWallet?.closeWallet()
    setSequenceWallet(new sequence.Wallet('polygon'))
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

  const connectMetamask = () =>
    provider?.request<string[]>({ method: 'eth_requestAccounts' }).then(changeAddress)

  const connectSequence = () =>
    sequenceWallet
      ?.connect({
        app: 'Converge POAP',
        authorize: true
      })
      .then((account) => {
        if (!account.session || !account.session.accountAddress) return
        setAddress(account.session.accountAddress)
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
        userAddressAcquired,
        connectMetamask,
        connectSequence,
        setAddress,
        setUserAddressAcquired
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3Context = (): Web3ContextData => useContext(Web3Context)
