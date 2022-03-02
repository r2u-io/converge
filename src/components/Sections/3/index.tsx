import React from 'react'

import { useTranslation } from 'react-i18next'

import { useOverlayContext } from '../../../contexts/OverlayContext'
import { Container } from './styles'

const SectionThree: React.FC = () => {
  const { t } = useTranslation()

  const { openForms } = useOverlayContext()

  return (
    <Container id='strategy' className='section'>
      <div className='content white'>
        <span className='title'>{t('sections.three.title')}</span>
        <br />
        <span className='text'>{t('sections.three.text')}</span>
        <br />
        <button type='button' className='more white' onClick={openForms}>
          {t('sections.three.button')}
        </button>
      </div>
    </Container>
  )
}

export default SectionThree
