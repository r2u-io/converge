import React, { useEffect, useRef, useState } from 'react'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import Model from '../../three/experience/World/Model'
import { Container } from './styles'

interface Props {
  name: string
  text: string
  floor: number
  button?: string
}

const CTA: React.FC<Props> = ({ name, text, floor, button: buttonText }: Props) => {
  const [model, setModel] = useState<Model>()

  const { threeExperience, sceneReady } = useThreeContext()

  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sceneReady || !threeExperience || !cardRef.current || model) return

    const modelInstance = new Model(threeExperience, name, floor, cardRef.current, null)
    setModel(modelInstance)
  }, [sceneReady, threeExperience, cardRef, model, name, floor])

  return (
    <Container ref={cardRef}>
      <div className='text'>
        <span>{text}</span>
      </div>
      {buttonText && <button type='button'>{buttonText}</button>}
    </Container>
  )
}

export default CTA
