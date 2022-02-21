import React from 'react'

import { Container } from './styles'

const SectionSeven: React.FC = () => (
  <Container id='team' className='section'>
    <div className='content'>
      <span className='title'>Meet our team</span>
      <br />
      <span className='text'>
        Conheça nosso time de especialistas no metaverso: de técnicos a estrategistas, você terá à
        sua disposição os melhores profissionais do mercado.
      </span>
      <br />
      <button type='button' className='more white'>
        Clique para conhecer
      </button>
    </div>
  </Container>
)

export default SectionSeven
