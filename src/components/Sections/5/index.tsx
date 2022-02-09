import React from 'react'

import { Container } from './styles'

const SectionFive: React.FC = () => (
  <Container>
    <div className='content'>
      <span className='title'>Connecting Worlds</span>
      <br />
      <span className='text'>
        O Converge é a sua solução “one-stop-shopping” para que todas as suas perguntas sejam
        rapidamente respondidas e as ações facilmente implementadas. Da elaboração da estratégia,
        planejamento a implementação e controle, nosso time cuida de todos os detalhes.
      </span>
      <br />
      <button type='button' className='more'>
        Saiba mais
      </button>
    </div>
  </Container>
)

export default SectionFive
