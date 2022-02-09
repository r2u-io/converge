import React from 'react'

import Image from 'next/image'

import { Container } from './styles'

const Header: React.FC = () => (
  <Container>
    <button type='button' className='logo'>
      <Image src='/images/logo.svg' alt='logo' width={90} height={90} objectFit='contain' />
    </button>
    <div className='menu'>
      <button type='button'>Home</button>
      <button type='button'>Token</button>
      <button type='button'>Marketplace</button>
      <button type='button'>Experience</button>
      <button type='button'>NFT</button>
      <button type='button'>Team</button>
      <button type='button'>
        <Image src='/images/in.svg' alt='in' width={25} height={25} />
      </button>
    </div>
  </Container>
)

export default Header
