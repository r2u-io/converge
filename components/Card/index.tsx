import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode.react'

import { Container } from './styles'
import Model from '../../three/experience/World/Model'
import { useThreeContext } from '../../contexts/ThreeJSContext'

interface Props {
  title: string
  price: string
  url: string
  name: string
  point: {
    x: number
    y: number
    z: number
  }
}

const Card: React.FC<Props> = ({ title, url, price, point, name }: Props) => {
  const [model, setModel] = useState<Model>()

  const { threeExperience, loaded } = useThreeContext()

  const cardRef = useRef<HTMLDivElement>(null)
  const cardWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loaded || !threeExperience || !cardRef.current || !cardWrapperRef.current || model) return
    setModel(new Model(threeExperience, name, cardRef.current, cardWrapperRef.current, point))
  }, [loaded, name, point, threeExperience, cardRef, cardWrapperRef, model])

  useEffect(() => {
    if (!model || !threeExperience) return
    threeExperience.world.models.push(model)
  }, [model, threeExperience])

  return (
    <Container ref={cardWrapperRef}>
      <div className='product-card' ref={cardRef}>
        <h2>{title}</h2>
        <QRCode value={url} renderAs='svg' />
        <span>See in your space</span>
        <span className='price'>{price}</span>
      </div>
    </Container>
  )
}

export default Card
