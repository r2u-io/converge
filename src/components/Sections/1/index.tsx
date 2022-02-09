import React from 'react'

import Image from 'next/image'

import Header from '../../Header'
import { Container } from './styles'

const SectionOne: React.FC = () => (
  <Container>
    <Header />
    <div className='converge'>
      <Image src='/images/converge.svg' alt='Converge' width={1920} height={100} />
      <span className='subtitle'>Connecting Worlds</span>
    </div>
  </Container>
)

export default SectionOne
