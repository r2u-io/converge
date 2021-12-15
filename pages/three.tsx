import React, { useEffect, useRef, useState } from 'react'

import { Container, Canvas, Button } from '../styles'

import Head from 'next/head'

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
      <Canvas ref={canvasRef}></Canvas>
      <Button onClick={() => threeExperience?.camera.move()}>Move</Button>
    </Container>
  )
}

export default Three
