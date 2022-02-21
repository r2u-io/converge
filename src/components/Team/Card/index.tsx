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
          <span className='name'>{name}</span>
          <span className='job'>{job}</span>
        </div>
        <div className='in'>
          <svg viewBox='0 0 23 23' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
            <path d='M8.59299 7.28063C8.59299 7.88725 8.13803 8.49387 7.37975 8.49387C6.62147 8.49387 6.1665 7.88725 6.1665 7.28063C6.1665 6.674 6.62147 6.06738 7.37975 6.06738C8.13803 6.06738 8.59299 6.674 8.59299 7.28063Z' />
            <path d='M8.59299 9.1001H6.1665V16.9862H8.59299V9.1001Z' />
            <path d='M14.3557 9.25195C13.1425 9.25195 12.3842 10.0102 12.0809 10.4652L11.9293 9.40361H9.65442C9.65442 10.0102 9.65442 10.9202 9.65442 11.8301V16.9864H12.0809V12.74C12.0809 12.4367 12.0809 12.2851 12.0809 12.1334C12.3842 11.6784 12.6875 11.0718 13.4458 11.0718C14.3557 11.0718 14.6591 11.8301 14.6591 12.74V16.9864H17.0855V12.4367C17.0855 10.3135 15.8723 9.25195 14.3557 9.25195Z' />
            <path d='M18.4503 22.9H4.8013C2.22315 22.9 0.0999756 20.7768 0.0999756 18.1987V4.70132C0.0999756 2.12318 2.22315 0 4.8013 0H18.2987C20.8768 0 23 2.12318 23 4.70132V18.1987C23 20.9285 20.8768 22.9 18.4503 22.9ZM4.8013 1.3649C2.98143 1.3649 1.46488 2.88146 1.46488 4.70132V18.1987C1.46488 20.0185 2.98143 21.5351 4.8013 21.5351H18.2987C20.1185 21.5351 21.6351 20.0185 21.6351 18.1987V4.70132C21.6351 2.88146 20.1185 1.3649 18.2987 1.3649H4.8013Z' />
          </svg>
        </div>
      </a>
    </Container>
  )
}

export default CardTeam
