import React from 'react'

import Head from 'next/head'

import Canvas from '../components/Canvas'
import Overlay from '../components/Overlay'

const Three: React.FC = () => (
  <>
    <Head>
      <title>ThreeJS</title>
    </Head>
    <Canvas></Canvas>
    <Overlay></Overlay>
  </>
)

export default Three
