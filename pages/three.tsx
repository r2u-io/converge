import React, { useEffect, useRef, useState } from 'react'

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
