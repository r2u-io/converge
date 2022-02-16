import React from 'react'

import { AvatarsProvider } from '../../contexts/AvatarsContext'
import Footer from '../Footer'
import SectionOne from '../Sections/1'
import SectionTwo from '../Sections/2'
import SectionThree from '../Sections/3'
import SectionFour from '../Sections/4'
import SectionFive from '../Sections/5'
import SectionSix from '../Sections/6'
import SectionSeven from '../Sections/7'
import Team from '../Team'

const Overlay: React.FC = () => (
  <>
    <SectionOne />
    <SectionTwo />
    <SectionThree />
    <SectionFour />
    <SectionFive />
    <SectionSix />
    <SectionSeven />
    <AvatarsProvider>
      <Team />
    </AvatarsProvider>
    <Footer />
  </>
)

export default Overlay
