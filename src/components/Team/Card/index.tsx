import React, { useEffect, useRef, useState } from 'react'

import { useAvatarsContext } from '../../../contexts/AvatarsContext'
import { Container } from './styles'

interface Props {
  name: string
  job: string
  link: string
  group: string
  index: number
}

const CardTeam: React.FC<Props> = ({ name, job, link, group, index }: Props) => {
  const { avatars } = useAvatarsContext()

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!avatars || !ref.current) return
    avatars.cards[index] = ref.current
  }, [avatars, ref])

  return (
    <Container ref={ref}>
      <div className='frame' />
    </Container>
  )
}

export default CardTeam
