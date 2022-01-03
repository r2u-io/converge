import React, { useEffect, useRef } from 'react'

import ModelsData from '../../config/models.json'
import { useThreeContext } from '../../contexts/ThreeJSContext'
import ThreeExperience from '../../three/experience'
import Card from '../Card'
import { Container, CardsContainer } from './styles'

const Canvas: React.FC = () => {
  const ref = useRef(null)

  const { threeExperience, setSceneLoaded, setThreeExperience } = useThreeContext()

  useEffect(() => {
    if (!ref.current || threeExperience) return

    const experienceInstance = new ThreeExperience(ref.current, setSceneLoaded)

    setThreeExperience(experienceInstance)
  }, [ref, threeExperience, setSceneLoaded, setThreeExperience])

  return (
    <Container>
      <canvas ref={ref} />
      <CardsContainer>
        {ModelsData.map((model) => (
          <Card key={model.name} {...model} />
        ))}
      </CardsContainer>
    </Container>
  )
}

export default Canvas
