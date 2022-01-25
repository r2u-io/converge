import React, { useEffect, useRef } from 'react'

import Image from 'next/image'

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
  const { avatars, activeGroup, moving } = useAvatarsContext()

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!avatars || !ref.current) return
    avatars.cards[index] = ref.current
  }, [avatars, ref])

  return (
    <Container ref={ref} active={!moving && activeGroup === group}>
      <a className='background' href={link} target='_blank' rel='noopener noreferrer'>
        <div className='frame' />
        <div className='text'>
          <span className='name'>{name}</span>
          <span className='job'>{job}</span>
        </div>
        <div className='in'>
          <Image src='/images/in.png' alt='in' width={25} height={25} objectFit='contain' />
        </div>
      </a>
    </Container>
  )
}

export default CardTeam
