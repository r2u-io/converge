import React from 'react'

import { useUIContext } from '../../contexts/UIContext'
import { Container } from './styles'

const PortraitPrompt: React.FC = () => {
  const { keepPortrait } = useUIContext()

  return (
    <Container>
      <span>For a better experience, please turn your device to landscape</span>
      <br />
      <button type='button' onClick={keepPortrait}>
        Keep portrait
      </button>
    </Container>
  )
}

export default PortraitPrompt
