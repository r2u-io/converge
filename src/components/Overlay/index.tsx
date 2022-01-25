import React from 'react'

import { AvatarsProvider } from '../../contexts/AvatarsContext'
import { useUIContext } from '../../contexts/UIContext'
import About from '../About'
import Fullscreen from '../Fullscreen'
import Header from '../Header'
import LoadingScreen from '../LoadingScreen'
import Map from '../Map'
import PortraitPrompt from '../PortraitPrompt'
import Team from '../Team'
import { Container } from './styles'

const Overlay: React.FC = () => {
  const { loading, showPortraitPrompt } = useUIContext()

  return (
    <Container>
      <Fullscreen />
      <Map />
      <AvatarsProvider>
        <Team />
      </AvatarsProvider>
      <About />
      <Header />
      {showPortraitPrompt && <PortraitPrompt />}
      {loading && <LoadingScreen />}
    </Container>
  )
}

export default Overlay
