import React from 'react'

import Head from 'next/head'

import Canvas from '../components/Canvas'
import Overlay from '../components/Overlay'
import { ThreeProvider } from '../contexts/ThreeJSContext'
import { UIProvider } from '../contexts/UIContext'

const Home: React.FC = () => (
  <>
    <Head>
      <title>Converge</title>
    </Head>
    <ThreeProvider>
      <Canvas />
      <UIProvider>
        <Overlay />
      </UIProvider>
    </ThreeProvider>
  </>
)

export default Home
