import React, { useEffect, useRef, useState } from 'react'

import QRCode from 'qrcode.react'
import * as THREE from 'three'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import Model from '../../three/experience/World/Model'
import { Container } from './styles'

interface Props {
  title: string
  price: string
  url: string
  name: string
  point: number[]
}

const Card: React.FC<Props> = ({ title, url, price, point, name }: Props) => {
  const [model, setModel] = useState<Model>()

  const { threeExperience, loaded } = useThreeContext()

  const cardRef = useRef<HTMLDivElement>(null)
  const cardWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loaded || !threeExperience || !cardRef.current || !cardWrapperRef.current || model) return

    const vectorPoint = new THREE.Vector3().fromArray(point)

    const modelInstance = new Model(
      threeExperience,
      name,
      cardRef.current,
      cardWrapperRef.current,
      vectorPoint
    )

    setModel(modelInstance)
  }, [loaded, threeExperience, cardRef, cardWrapperRef, model, name, point])

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
