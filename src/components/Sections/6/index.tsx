import React from 'react'

import { Container } from './styles'

const SectionSix: React.FC = () => (
  <Container id='collection' className='section'>
    <div className='content'>
      <span className='title'>Exhibit your art to the World</span>
      <br />
      <span className='text'>
        Já imaginou uma wallet integrada em seu site ou app para que seus clientes possam guardar os
        seus NFT&apos;s? Um espaço para centralizar os ativos e facilitar a vida de seus
        consumidores, aproximando ainda mais a marca gerando lealdade e preferência. Esse é o
        futuro...
      </span>
      <br />
      <button type='button' className='more'>
        Conecte-se com os amantes das artes
      </button>
    </div>
  </Container>
)

export default SectionSix
