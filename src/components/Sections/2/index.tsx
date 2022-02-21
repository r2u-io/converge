import React from 'react'

import { useTranslation } from 'react-i18next'

import { Container } from './styles'

const SectionTwo: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Container id='about' className='section'>
      <div className='content'>
        <span className='title'>{t('sections.two.title')}</span>
        <br />
        <span className='text'>{t('sections.two.text')}</span>
        <br />
        <button type='button' className='more'>
          {t('sections.two.button')}
        </button>
      </div>
    </Container>
  )
}

export default SectionTwo
