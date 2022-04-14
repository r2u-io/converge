import React from 'react'

import { useTranslation } from 'react-i18next'

import { usePOAPContext } from '../../../contexts/POAPContext'
import { Button } from './styles'

const InstructionsButton: React.FC = () => {
  const { t } = useTranslation()

  const { openInstructions } = usePOAPContext()

  return (
    <Button type='button' className='instructions' onClick={openInstructions}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <circle cx='12' cy='12' r='10' />
        <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' />
        <line x1='12' y1='17' x2='12.01' y2='17' />
      </svg>
      <span>{t('poap.landing.instructions')}</span>
    </Button>
  )
}
export default InstructionsButton
