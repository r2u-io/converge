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

const ECBR2022: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t('pages.title.ecbr2022')}</title>
      </Head>
      <IFrame
        src='https://storage.googleapis.com/r2u-demos-bucket/social-commerce-nft/index.html'
        title='Social Digital Commerce - NFTs POAP'
        width='300'
        height='150'
        frameBorder='0'
        scrolling='no'
        allow='xr-spatial-tracking; display-capture; magnetometer; picture-in-picture; wake-lock; screen-wake-lock; vr; geolocation; microphone; camera; midi; encrypted-media; autoplay; fullscreen; gyroscope; accelerometer;'
      />
    </>
  )
}

export default ECBR2022
