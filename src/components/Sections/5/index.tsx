import React from 'react'

import { useTranslation } from 'react-i18next'

import { Container } from './styles'

const SectionFive: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Container id='nft' className='section'>
      <div className='content'>
        <span className='title'>{t('sections.five.title')}</span>
        <br />
        <span className='text'>{t('sections.five.text')}</span>
        <br />
        <button type='button' className='more'>
          {t('sections.five.button')}
        </button>
      </div>
    </Container>
  )
}

export default SectionFive
