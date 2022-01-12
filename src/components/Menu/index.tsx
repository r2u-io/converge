import React from 'react'

import { useUIContext } from '../../contexts/UIContext'
import { Container } from './styles'

const Menu: React.FC = () => {
  const { openAbout, openMap, openTeam, menuOpened } = useUIContext()

  return (
    <Container open={menuOpened}>
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
    </Container>
  )
}

export default Menu
