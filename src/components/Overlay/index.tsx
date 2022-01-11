import React from 'react'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import { useUIContext } from '../../contexts/UIContext'
import About from '../About'
import Buttons from '../Buttons'
import Fullscreen from '../Fullscreen'
import Header from '../Header'
import Instructions from '../Instructions'
import LoadingScreen from '../LoadingScreen'
import Map from '../Map'
import PortraitPrompt from '../PortraitPrompt'
import Team from '../Team'
import { Container } from './styles'

const Overlay: React.FC = () => {
  const { onFreeTour } = useThreeContext()
  const { loading, showPortraitPrompt } = useUIContext()

  return (
    <Container>
      <Header />
      {onFreeTour ? <Instructions /> : <Buttons />}
      <Fullscreen />
      <Map />
      <Team />
      <About />
      {showPortraitPrompt && <PortraitPrompt />}
      {loading && <LoadingScreen />}
    </Container>
  )
}

export default Overlay
