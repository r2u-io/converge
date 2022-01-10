import React, { useEffect, useState } from 'react'

import { useUIContext } from '../../contexts/UIContext'
import { Container } from './styles'

const Header: React.FC = () => {
  const { openMenu, loading } = useUIContext()

  const [show, setShow] = useState(true)

  useEffect(() => {
    if (loading) return
    setShow(false)
    document.addEventListener('mousemove', (e) => setShow(e.clientY <= 100))
  }, [loading])

  return (
    <Container className={show ? '' : 'hide'}>
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
