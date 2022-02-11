import React from 'react'

import { Container } from './styles'

const SectionFour: React.FC = () => (
  <Container>
    <div className='content'>
      <span className='title'>Experiência de Marca</span>
      <br />
      <span className='text'>
        Uma loja perene? Uma pop-up store? Ou um espaço de experiências que transmitam o valor da
        marca e que seja temporário? Cada detalhe será discutido e analisado frente a estratégia da
        empresa para que a melhor opção seja implementada, desde a viabilização da terra / land até
        a construção do espaço em 3D.
      </span>
      <br />
      <button type='button' className='more'>
        Comece a vender no Metaverse
      </button>
    </div>
  </Container>
)

export default SectionFour
