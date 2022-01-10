import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useUIContext } from '../../contexts/UIContext'
import { Container } from './styles'

const Header: React.FC = () => {
  const { openMenu, loading, mapOpened, teamOpened } = useUIContext()

  const [show, setShow] = useState(true)

  useEffect(() => {
    if (loading) return
    setShow(false)
    document.addEventListener('mousemove', (e) => setShow(e.clientY <= 100))
  }, [loading])

  const className = show || mapOpened || teamOpened ? '' : 'hide'

  return (
    <Container className={className}>
      <button type='button' className='logo'>
        <Image src='/images/converge.svg' alt='logo' width={300} height={45} />
      </button>
      <button type='button' onClick={openMenu}>
        <span className='menu'>Menu</span>
      </button>
    </Container>
  )
}

export default Header
