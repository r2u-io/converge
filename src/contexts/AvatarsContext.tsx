import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import TeamData from '../config/team.json'
import Avatars from '../three/team-experience/Avatars'

type Group = 'all' | 'operations' | 'techProduct' | 'leadership' | 'salesMarketing'

const TEAMS = {
  leadership: TeamData.filter((member) => member.group === 'leadership').map((member) =>
    TeamData.indexOf(member)
  ),
  operations: TeamData.filter((member) => member.group === 'operations').map((member) =>
    TeamData.indexOf(member)
  ),
  techProduct: TeamData.filter((member) => member.group === 'techProduct').map((member) =>
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
  onClickLeadership: () => void
  onClickOperations: () => void
  onClickTechProduct: () => void
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

  const onClickLeadership = () => {
    if (!avatars) return
    setMoving(true)
    avatars.showAll(() =>
      avatars.showGroup(TEAMS.leadership, () => setActiveGroup('leadership'))
    )
  }

  const onClickOperations = () => {
    if (!avatars) return
    setMoving(true)
    avatars.showAll(() =>
      avatars.showGroup(TEAMS.operations, () => setActiveGroup('operations'))
    )
  }

  const onClickTechProduct = () => {
    if (!avatars) return
    setMoving(true)
    avatars.showAll(() => avatars.showGroup(TEAMS.techProduct, () => setActiveGroup('techProduct')))
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
        onClickLeadership,
        onClickOperations,
        onClickTechProduct,
        onClickSalesMarketing,
        onResize
      }}
    >
      {children}
    </AvatarsContext.Provider>
  )
}

export const useAvatarsContext = (): AvatarsContextData => useContext(AvatarsContext)
