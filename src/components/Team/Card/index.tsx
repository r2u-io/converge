import React, { useEffect, useRef } from 'react'

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
          <span className='name'>{name.replace('_', ' ')}</span>
          <span className='job'>{job}</span>
        </div>
      </a>
    </Container>
  )
}

export default CardTeam
