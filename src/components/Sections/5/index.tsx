import React from 'react'

import { Container } from './styles'

const SectionFive: React.FC = () => (
  <Container id='nft'>
    <div className='content'>
      <span className='title'>Mint sua coleção de NFT&apos;s</span>
      <br />
      <span className='text'>
        Sua marca pode se aproximar ainda mais de seus clientes através de estratégias de alto valor
        agregado como as coleções de NFT&apos;s. Os non-fungible tokens podem ser usados desde a
        validação de bens a serem vendidos no metaverso, até como certificados de “posse” para
        redenção de benefícios exclusivos - tanto no metaverso quanto no mundo real. O Converge
        planeja a ação, cria o conceito e a arte e minta a coleção na blockchain. Tudo para você ter
        a tranquilidade de uma implementação fácil e rápida.
      </span>
      <br />
      <button type='button' className='more'>
        Comece a ganhar
      </button>
    </div>
  </Container>
)

export default SectionFive
