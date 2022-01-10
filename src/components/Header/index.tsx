import React, { useEffect, useState } from 'react'

import { useUIContext } from '../../contexts/UIContext'
import { Container } from './styles'

const Header: React.FC = () => {
  const { openMenu } = useUIContext()

  const [show, setShow] = useState(true)

  useEffect(() => {
    setTimeout(() => setShow(false), 3000)
  }, [])

  return (
    <Container className={show ? 'show' : ''}>
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
