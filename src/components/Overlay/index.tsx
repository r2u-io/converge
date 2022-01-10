import React from 'react'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import { useUIContext } from '../../contexts/UIContext'
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
  const { loading, mapOpened, teamOpened, showPortraitPrompt } = useUIContext()

  return (
    <Container>
      <Header />
      {onFreeTour ? <Instructions /> : <Buttons />}
      <Fullscreen />
      {mapOpened && <Map />}
      {teamOpened && <Team />}
      {showPortraitPrompt && <PortraitPrompt />}
      {loading && <LoadingScreen />}
    </Container>
  )
}

export default Overlay
