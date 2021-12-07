import React, { useEffect, useRef, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import * as THREE from 'three'
import { MetaScene } from '../scene'

const Three: React.FC = ({}) => {
  const canvasRef = useRef(null)

  const [metaScene, setMetaScene] = useState<MetaScene>()

  useEffect(() => {
    if (!canvasRef.current) return
    setMetaScene(new MetaScene(canvasRef.current))
  }, [canvasRef])

  useEffect(() => {
    if (!metaScene) return
    metaScene.render()
  }, [metaScene])

  return (
    <div>
      <Head>
        <title>ThreeJS</title>
      </Head>

      <canvas ref={canvasRef}>
        <div style={{ color: 'white' }}>Test</div>
      </canvas>
    </div>
  )
}

export default Three
