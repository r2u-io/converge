import React, { useEffect, useRef, useState } from 'react'

import TeamExperience from '../../three/team-experience'
import Avatars from '../../three/team-experience/Avatars'
import { Container } from './styles'

interface Data {
  type: 'group' | 'all'
  group?: 'operations' | 'tech' | 'admin' | 'sales'
}

interface MessageEventCustom extends MessageEvent {
  origin: string
  data: Data
}

const TEAMS = {
  operations: [0, 1, 2],
  tech: [3, 4, 5],
  admin: [6, 7, 8],
  sales: [9, 10, 11]
}

const CanvasTeam: React.FC = () => {
  const ref = useRef(null)

  const [avatars, setAvatars] = useState<Avatars>()

  useEffect(() => {
    if (!ref.current) return

    const teamExperience = new TeamExperience(ref.current)
    setAvatars(teamExperience.avatars)
  }, [ref])

  useEffect(() => {
    if (!avatars) return

    window.addEventListener('message', ({ origin, data }: MessageEventCustom) => {
      if (origin !== window.location.origin) return

      const { type, group } = data

      const { parent } = window

      const onComplete = () => {
        parent.postMessage(data, origin)
      }

      switch (type) {
        case 'all':
          avatars.showAll(onComplete)
          break
        case 'group':
          if (group) avatars.showGroup(TEAMS[group], onComplete)
          break
        default:
          break
      }
    })
  }, [avatars])

  return (
    <Container>
      <canvas ref={ref} width={800} height={600} />
    </Container>
  )
}

export default CanvasTeam
