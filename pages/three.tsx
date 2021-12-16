import React, { useEffect, useRef, useState } from 'react'

import { Container } from '../styles'

import Head from 'next/head'
import Image from 'next/image'

import ThreeExperience from '../three/experience'

const Three: React.FC = ({}) => {
  const canvasRef = useRef(null)

  const [threeExperience, setThreeExperience] = useState<ThreeExperience>()

  useEffect(() => {
    if (!canvasRef.current) return
    setThreeExperience(new ThreeExperience(canvasRef.current))
  }, [canvasRef])

  return (
    <Container>
      <Head>
        <title>ThreeJS</title>
      </Head>
      <canvas ref={canvasRef}></canvas>
      <button onClick={() => threeExperience?.camera.move()}>Move</button>
      <div className='product-card-wrapper'>
        <div className='product-card'>
          <h2>Yellow Cube</h2>
          <Image src='/images/qrcode-placeholder.png' alt='' width={100} height={100} />
          <span>See in your space</span>
          <span className='price'>$0.00</span>
        </div>
      </div>
    </Container>
  )
}

export default Three
