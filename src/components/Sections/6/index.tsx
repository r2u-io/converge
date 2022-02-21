import React from 'react'

import { useTranslation } from 'react-i18next'

import { Container } from './styles'

const SectionSix: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Container id='collection' className='section'>
      <div className='content'>
        <span className='title'>{t('sections.six.title')}</span>
        <br />
        <span className='text'>{t('sections.six.text')}</span>
        <br />
        <button type='button' className='more'>
          {t('sections.six.button')}
        </button>
      </div>
    </Container>
  )
}

export default SectionSix
