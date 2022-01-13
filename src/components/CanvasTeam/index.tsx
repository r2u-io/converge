import React, { useEffect, useRef, useState } from 'react'

import TeamExperience from '../../three/team'
import { Container } from './styles'

const CanvasTeam: React.FC = () => {
  const ref = useRef(null)

  const [experience, setExperience] = useState<TeamExperience>()

  useEffect(() => {
    if (!ref.current) return
    setExperience(new TeamExperience(ref.current))
  }, [ref])

  return (
    <Container>
      <canvas ref={ref} width={800} height={600} />
    </Container>
  )
}

export default CanvasTeam
