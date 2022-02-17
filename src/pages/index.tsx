import React from 'react'

import Head from 'next/head'

import Canvas from '../components/Canvas'
import Overlay from '../components/Overlay'
import { ThreeProvider } from '../contexts/ThreeJSContext'

const Home: React.FC = () => (
  <>
    <Head>
      <title>Converge</title>
    </Head>
    <ThreeProvider>
      <Canvas />
      <Overlay />
    </ThreeProvider>
  </>
)

export default Home
