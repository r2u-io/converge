import React from 'react'

import { useTranslation } from 'react-i18next'

import { Container } from './styles'

const SectionSeven: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Container id='team' className='section'>
      <div className='content'>
        <span className='title'>{t('sections.seven.title')}</span>
        <br />
        <span className='text'>{t('sections.seven.text')}</span>
        <br />
        <button type='button' className='more white'>
          <a href='#meet-the-team'>{t('sections.seven.button')}</a>
        </button>
      </div>
    </Container>
  )
}

export default SectionSeven
