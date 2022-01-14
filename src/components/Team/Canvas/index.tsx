import React, { useEffect, useRef, useState } from 'react'

import { useAvatarsContext } from '../../../contexts/AvatarsContext'
import { useUIContext } from '../../../contexts/UIContext'
import TeamExperience from '../../../three/team-experience'
import { Container } from './styles'

const CanvasTeam: React.FC = () => {
  const { teamOpened } = useUIContext()
  const { setAvatars } = useAvatarsContext()

  const ref = useRef(null)

  const [teamExperience, setTeamExperience] = useState<TeamExperience>()

  useEffect(() => {
    if (!ref.current) return
    setTeamExperience(new TeamExperience(ref.current))
  }, [ref])

  useEffect(() => {
    if (!teamExperience) return
    setAvatars(teamExperience.avatars)
  }, [teamExperience])

  useEffect(() => {
    if (teamOpened && teamExperience) teamExperience.sizes.updateSizes()
  }, [teamOpened, teamExperience])

  return (
    <Container>
      <canvas ref={ref} />
    </Container>
  )
}

export default CanvasTeam
