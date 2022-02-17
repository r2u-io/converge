import React from 'react'

import { Container } from './styles'

const SectionThree: React.FC = () => (
  <Container id='strategy'>
    <div className='content white'>
      <span className='title'>Estratégia no Metaverso</span>
      <br />
      <span className='text'>
        Analisar qual estratégia é a mais adequada frente ao posicionamento e a proposta de valor da
        marca é fundamental para o sucesso. Nosso time trabalha juntamente com o time de nossos
        clientes para definir se a melhor opção é uma ação perene, múltiplas ações de curta duração
        ou qual proposta é a que entregará o resultado desejado.
      </span>
      <br />
      <button type='button' className='more white'>
        Viva essa experiência
      </button>
    </div>
  </Container>
)

export default SectionThree
