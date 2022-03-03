import React from 'react'

import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const IFrame = styled.iframe`
  overflow: hidden;
  border: 0;
  position: absolute;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const Meet: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t('pages.title.futurejo')}</title>
      </Head>
      <IFrame
        src='https://hubs.mozilla.com/ajRwnyS?embed_token=e06665138272e4c1b1fc48d0328752ea'
        title='futurejo'
        width='300'
        height='150'
        frameBorder='0'
        scrolling='no'
        allow='microphone; camera; vr; speaker;'
      />
    </>
  )
}

export default Meet
