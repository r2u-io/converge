import React from 'react'

import { useUIContext } from '../../contexts/UIContext'
import { Container } from './styles'

const Header: React.FC = () => {
  const { openMenu, mapOpened, teamOpened } = useUIContext()

  return (
    <Container block={mapOpened || teamOpened}>
      <button type='button'>
        <span className='logo'>Converge</span>
      </button>
      <button type='button' onClick={openMenu}>
        <span className='menu'>Menu</span>
      </button>
    </Container>
  )
}

export default Header
