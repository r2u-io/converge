import React from 'react'

import Head from 'next/head'

import Canvas from '../components/Canvas'
import { ThreeProvider } from '../contexts/ThreeJSContext'

const Home: React.FC = () => (
  <>
    <Head>
      <title>Converge</title>
    </Head>
    <ThreeProvider>
      <Canvas />
    </ThreeProvider>
  </>
)

export default Home
