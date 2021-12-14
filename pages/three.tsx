import React, { useEffect, useRef, useState } from 'react'

import { Container, Canvas, Content } from '../styles'

import Head from 'next/head'

import ThreeExperience from '../three/experience'

const Three: React.FC = ({}) => {
  const canvasRef = useRef(null)

  const [threeExperience, setThreeExperience] = useState<ThreeExperience>()

  useEffect(() => {
    if (!canvasRef.current) return
    setThreeExperience(new ThreeExperience(canvasRef.current))
  }, [canvasRef])

  // useEffect(() => {
  //   if (!threeExperience) return
  //   threeExperience.render()
  // }, [threeExperience])

  return (
    <Container>
      <Head>
        <title>ThreeJS</title>
      </Head>
      <Canvas ref={canvasRef}>
        <div style={{ color: 'white' }}>Test</div>
      </Canvas>
    </Container>
  )
}

export default Three
