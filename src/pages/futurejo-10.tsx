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
        src='https://hubs.mozilla.com/Xu4jSTX?embed_token=d324a84d2e6ab2162a645464316cd05e'
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
