import React, { useEffect, useRef, useState } from 'react'

import QRCode from 'qrcode.react'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import Model from '../../three/experience/World/Model'
import { Container } from './styles'

interface Props {
  title: string
  url: string
  name: string
  floor: number
}

const Card: React.FC<Props> = ({ title, url, name, floor }: Props) => {
  const [model, setModel] = useState<Model>()

  const { threeExperience, loaded } = useThreeContext()

  const cardRef = useRef<HTMLDivElement>(null)
  const cardWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loaded || !threeExperience || !cardRef.current || !cardWrapperRef.current || model) return

    const modelInstance = new Model(
      threeExperience,
      name,
      floor,
      cardRef.current,
      cardWrapperRef.current
    )
    setModel(modelInstance)
  }, [loaded, threeExperience, cardRef, cardWrapperRef, model, name, floor])

  return (
    <Container ref={cardWrapperRef}>
      <div className='product-card' ref={cardRef}>
        <h2>{title}</h2>
        <QRCode value={url} renderAs='svg' fgColor='#54439B' bgColor='rgba(0,0,0,0)' />
        <span>See in your space</span>
      </div>
    </Container>
  )
}

export default Card
