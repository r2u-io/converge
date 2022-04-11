import React from 'react'

import Footer from '../Footer'
import Header from '../Header'
import { Container } from './styles'

const Loading: React.FC = () => (
  <Container>
    <Header />
    <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' className='spinner'>
      <circle cx='50' cy='50' r='45' />
    </svg>
    <Footer />
  </Container>
)
export default Loading
