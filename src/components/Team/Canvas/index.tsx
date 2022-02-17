import React, { useEffect, useRef, useState } from 'react'

import { useAvatarsContext } from '../../../contexts/AvatarsContext'
import TeamExperience from '../../../three/team-experience'
import { Container } from './styles'

const CanvasTeam: React.FC = () => {
  const { setAvatars, onResize } = useAvatarsContext()

  const ref = useRef(null)

  const [teamExperience, setTeamExperience] = useState<TeamExperience>()

  useEffect(() => {
    if (!ref.current) return
    setTeamExperience(new TeamExperience(ref.current, onResize))
  }, [ref])

  useEffect(() => {
    if (!teamExperience) return
    setAvatars(teamExperience.avatars)
    teamExperience.sizes.updateSizes()
  }, [teamExperience])

  return (
    <Container>
      <canvas ref={ref} />
    </Container>
  )
}

export default CanvasTeam
