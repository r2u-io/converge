import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'

import TeamsData from '../config/team.json'
import Avatars from '../three/team-experience/Avatars'

const TEAMS = {
  operations3D: [0, 1, 2, 3, 4, 5],
  techProduct: [6, 7, 8, 9, 10, 11],
  generalAdmin: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
  salesMarketing: [22]
}

interface Props {
  children: ReactNode
}

interface Disabled {
  all: boolean
  operations3D: boolean
  techProduct: boolean
  generalAdmin: boolean
  salesMarketing: boolean
}

interface AvatarsContextData {
  avatars?: Avatars
  disabled: Disabled
  setAvatars: (avatars: Avatars) => void
  onClickBack: () => void
  onClickOperations3D: () => void
  onClickTechProduct: () => void
  onClickGeneralAdmin: () => void
  onClickSalesMarketing: () => void
  onResize: () => void
}

export const AvatarsContext = createContext<AvatarsContextData>({} as AvatarsContextData)

export const AvatarsProvider: React.FC<Props> = ({ children }: Props) => {
  const [avatars, setAvatars] = useState<Avatars>()

  const [disabled, setDisabled] = useState<Disabled>({
    all: true,
    operations3D: false,
    techProduct: false,
    generalAdmin: false,
    salesMarketing: false
  })

  const disableAll = () =>
    setDisabled({
      all: true,
      operations3D: true,
      techProduct: true,
      generalAdmin: true,
      salesMarketing: true
    })

  const disableGroup = (group: string) =>
    setDisabled({
      all: false,
      operations3D: false,
      techProduct: false,
      generalAdmin: false,
      salesMarketing: false,
      [group]: true
    })

  const onClickBack = () => {
    if (!avatars) return
    disableAll()
    avatars.showAll(() => disableGroup('all'))
  }

  const onClickOperations3D = () => {
    if (!avatars) return
    disableAll()
    avatars.showAll(() => avatars.showGroup(TEAMS.operations3D, () => disableGroup('operations3D')))
  }

  const onClickTechProduct = () => {
    if (!avatars) return
    disableAll()
    avatars.showAll(() => avatars.showGroup(TEAMS.techProduct, () => disableGroup('techProduct')))
  }
  const onClickGeneralAdmin = () => {
    if (!avatars) return
    disableAll()
    avatars.showAll(() => avatars.showGroup(TEAMS.generalAdmin, () => disableGroup('generalAdmin')))
  }
  const onClickSalesMarketing = () => {
    if (!avatars) return
    disableAll()
    avatars.showAll(() =>
      avatars.showGroup(TEAMS.salesMarketing, () => disableGroup('salesMarketing'))
    )
  }

  const onResize = () => {
    disableGroup('all')
  }

  return (
    <AvatarsContext.Provider
      value={{
        avatars,
        setAvatars,
        disabled,
        onClickBack,
        onClickOperations3D,
        onClickTechProduct,
        onClickGeneralAdmin,
        onClickSalesMarketing,
        onResize
      }}
    >
      {children}
    </AvatarsContext.Provider>
  )
}

export const useAvatarsContext = (): AvatarsContextData => useContext(AvatarsContext)
