import React, { useEffect, useRef } from 'react'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import ThreeExperience from '../../three/experience'
import { Container } from './styles'

const Canvas: React.FC = () => {
  const ref = useRef(null)

  const { threeExperience, setThreeExperience } = useThreeContext()

  useEffect(() => {
    if (!ref.current || threeExperience) return

    const experienceInstance = new ThreeExperience(ref.current)

    setThreeExperience(experienceInstance)
  }, [ref, threeExperience, setThreeExperience])

  return (
    <Container>
      <canvas ref={ref} />
    </Container>
  )
}

export default Canvas
