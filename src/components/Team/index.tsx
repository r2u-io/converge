import React from 'react'

import Image from 'next/image'

import { useUIContext } from '../../contexts/UIContext'
import { Container } from './styles'

const Team: React.FC = () => {
  const { closeTeam } = useUIContext()

  return (
    <Container onClick={closeTeam}>
      <h2>Meet our team</h2>
      <Image src='/images/placeholder_team.png' alt='team' height={706} width={703} />
    </Container>
  )
}

export default Team
