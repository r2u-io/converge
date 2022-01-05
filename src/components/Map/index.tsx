import React from 'react'

import Image from 'next/image'

import { useUIContext } from '../../contexts/UIContext'
import { Container } from './styles'

const Map: React.FC = () => {
  const { closeMap } = useUIContext()

  return (
    <Container onClick={closeMap}>
      <h2>Connecting worlds</h2>
      <Image src='/images/placeholder_map.png' alt='map' height={520} width={983} />
    </Container>
  )
}

export default Map
