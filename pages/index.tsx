import React from 'react'

import Head from 'next/head'

import Canvas from '../components/Canvas'
import Overlay from '../components/Overlay'

const Home: React.FC = () => (
  <>
    <Head>
      <title>Converge</title>
    </Head>
    <Canvas></Canvas>
    <Overlay></Overlay>
  </>
)

export default Home
