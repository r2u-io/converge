import React from 'react'

import { useTranslation } from 'react-i18next'

import { Container } from './styles'

const SectionFour: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Container id='experience' className='section'>
      <div className='content'>
        <span className='title'>{t('sections.four.title')}</span>
        <br />
        <span className='text'>{t('sections.four.text')}</span>
        <br />
        <button type='button' className='more'>
          {t('sections.four.button')}
        </button>
      </div>
    </Container>
  )
}

export default SectionFour
