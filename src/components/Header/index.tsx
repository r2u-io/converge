import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useUIContext } from '../../contexts/UIContext'
import { Container } from './styles'

const Header: React.FC = () => {
  const {
    toggleMenu,
    openAbout,
    openMap,
    openTeam,
    loading,
    menuOpened,
    mapOpened,
    teamOpened,
    aboutOpened
  } = useUIContext()

  const [show, setShow] = useState(true)

  useEffect(() => {
    if (loading) return
    setShow(false)
    document.addEventListener('mousemove', (e) => setShow(e.clientY <= 100))
  }, [loading])

  const className = show || mapOpened || teamOpened || aboutOpened ? '' : ''

  return (
    <Container className={className}>
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
      <div className={`menu ${menuOpened && 'open'}`}>
        <button className='item' type='button' onClick={openAbout}>
          About
        </button>
        <hr />
        <button className='item' type='button'>
          <a
            href='https://converge-r2u.gitbook.io/converge/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Whitepaper
          </a>
        </button>
        <hr />
        <button className='item' type='button' onClick={openMap}>
          Land Map
        </button>
        <hr />
        <button className='item' type='button' onClick={openTeam}>
          Meet the Team
        </button>
        <hr />
        {/* TODO: Open Contacts overlay with discord, mail, Calendly, etc */}
        <button className='item' type='button'>
          <a
            href='https://discord.com/channels/930456177568002139'
            target='_blank'
            rel='noopener noreferrer'
          >
            Contact Us
          </a>
        </button>
      </div>
    </Container>
  )
}

export default Header
