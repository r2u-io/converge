import React from 'react'

import Image from 'next/image'

import { Container } from './styles'

const Header: React.FC = () => (
  <Container>
    <div className='vtex'>
      <Image
        src='/images/poap/vtex.png'
        alt='vtex-logo'
        width={140}
        height={100}
        objectFit='contain'
      />
    </div>
    <div className='converge'>
      <Image
        src='/images/logo-white.svg'
        alt='converge-logo'
        width={60}
        height={60}
        objectFit='contain'
      />
      <Image
        src='/images/converge-white.svg'
        alt='converge'
        width={130}
        height={30}
        objectFit='contain'
      />
    </div>
  </Container>
)
export default Header
