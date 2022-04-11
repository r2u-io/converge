import React from 'react'

import { Button } from './styles'

interface Props {
  onClick?: () => void
  opacity?: number
}

const Sticker: React.FC<Props> = ({ onClick = () => undefined, opacity = 1 }) => (
  <Button type='button' className='cover' onClick={onClick} opacity={opacity}>
    <div className='corner' />
    <svg
      viewBox='0 0 106.4 138.7'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      width={200}
      height={200}
    >
      <path
        fill='#ffffff'
        d='M 26,0 C 1.2,0 0.2,16.8 0,19.6 v 5.1 c 0,19.5 60.2,44.4 60.2,80.3 0,26.3 -23,32.5 -32.4,33.5 41,-2.6 78.6,-30.4 78.6,-69.2 C 106.4,33.7 72.3,0 26,0 Z'
      />
      <path
        fill='#888888'
        d='m 0,24.7 c 0,14 0,93.8 0,93.8 0,11.5 7.2,20.2 25,20.2 6.4,0 35.2,-4.2 35.2,-33.7 C 60.2,69.1 0,44.2 0,24.7 Z'
      />
    </svg>
  </Button>
)
export default Sticker
