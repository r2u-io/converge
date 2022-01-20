import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import TeamData from '../config/team.json'
import Avatars from '../three/team-experience/Avatars'

type Group = 'all' | 'operations3D' | 'techProduct' | 'generalAdmin' | 'salesMarketing'

const TEAMS = {
  operations3D: TeamData.filter((member) => member.group === 'operations3D').map((member) =>
    TeamData.indexOf(member)
  ),
  techProduct: TeamData.filter((member) => member.group === 'techProduct').map((member) =>
    TeamData.indexOf(member)
  ),
  generalAdmin: TeamData.filter((member) => member.group === 'generalAdmin').map((member) =>
    TeamData.indexOf(member)
  ),
  salesMarketing: TeamData.filter((member) => member.group === 'salesMarketing').map((member) =>
    TeamData.indexOf(member)
  )
}

interface Props {
  children: ReactNode
}

interface AvatarsContextData {
  avatars?: Avatars
  moving: boolean
  activeGroup: Group
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

  const [moving, setMoving] = useState(false)
  const [activeGroup, setActiveGroup] = useState<Group>('all')

  useEffect(() => {
    setMoving(false)
  }, [activeGroup])

  const onClickBack = () => {
    if (!avatars) return
    setMoving(true)
    avatars.showAll(() => setActiveGroup('all'))
  }

  const onClickOperations3D = () => {
    if (!avatars) return
    setMoving(true)
    avatars.showAll(() =>
      avatars.showGroup(TEAMS.operations3D, () => setActiveGroup('operations3D'))
    )
  }

  const onClickTechProduct = () => {
    if (!avatars) return
    setMoving(true)
    avatars.showAll(() => avatars.showGroup(TEAMS.techProduct, () => setActiveGroup('techProduct')))
  }
  const onClickGeneralAdmin = () => {
    if (!avatars) return
    setMoving(true)
    avatars.showAll(() =>
      avatars.showGroup(TEAMS.generalAdmin, () => setActiveGroup('generalAdmin'))
    )
  }
  const onClickSalesMarketing = () => {
    if (!avatars) return
    setMoving(true)
    avatars.showAll(() =>
      avatars.showGroup(TEAMS.salesMarketing, () => setActiveGroup('salesMarketing'))
    )
  }

  const onResize = () => setActiveGroup('all')

  return (
    <AvatarsContext.Provider
      value={{
        avatars,
        setAvatars,
        moving,
        activeGroup,
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
