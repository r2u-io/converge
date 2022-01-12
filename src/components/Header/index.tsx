import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useUIContext } from '../../contexts/UIContext'
import Menu from '../Menu'
import { Container } from './styles'

const Header: React.FC = () => {
  const { toggleMenu, openAbout, loading, menuOpened, mapOpened, teamOpened, aboutOpened } =
    useUIContext()

  const [show, setShow] = useState(true)

  useEffect(() => {
    if (loading) return
    setShow(false)
    document.addEventListener('mousemove', (e) => setShow(e.clientY <= 100))
  }, [loading])

  const showHeader = show || mapOpened || teamOpened || aboutOpened

  return (
    <Container show={showHeader}>
      <button type='button' className='logo' onClick={openAbout}>
        <Image src='/images/converge.svg' alt='logo' width={300} height={45} />
      </button>
      <button type='button' onClick={toggleMenu} className='hamburger'>
        <svg
          viewBox='0 0 300 300'
          fill='none'
          stroke='currentColor'
          strokeWidth={30}
          strokeLinecap='round'
        >
          <line className={`line-1 ${menuOpened && 'open'}`} x1={20} y1={65} x2={280} y2={65} />
          <line className={`line-2 ${menuOpened && 'open'}`} x1={20} y1={150} x2={280} y2={150} />
          <line className={`line-3 ${menuOpened && 'open'}`} x1={20} y1={235} x2={280} y2={235} />
        </svg>
      </button>
      <Menu />
    </Container>
  )
}

export default Header
