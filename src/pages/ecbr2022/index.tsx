import React from 'react'

import Head from 'next/head'
import Script from 'next/script'
import { useTranslation } from 'react-i18next'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
  }

  .wrapper {
      overflow-x: hidden;
      max-width: 100%;
      max-width: 600px;
      margin: 0 auto 0;
      position: relative;
      z-index: 0;
  }

  .wrapper .container {
      text-align: center;
      padding: 15px 0;
      box-sizing: border-box;
      background-color: #ffffff;
      position: relative;
      z-index: 3;
  }

  .wrapper .container img{
      width: 100px;
      height: auto;
  }

  .wrapper #converge-logo {
      width: 100px;
      height: auto;
      margin-top: 10px;
  }

  .wrapper .container video {
      width: 300px;
      height: 300px;
      max-width: 90%;
      object-fit: contain;
  }

  .wrapper iframe {
      border-radius: 0 !important;
      margin: 0 auto 0;
      width: 98%;
      min-height: 500px;
      position: relative;
      top: -45px;
      left: -3px;
      z-index: 2;
      border: none;
  }

  .wrapper #hidder {
      width: 100%;
      height: 105px;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: #ffffff;
  }

  #hidder i {
    color: #bebebe;
    display: block;
    width: 100%;
    padding: 5px;
    clear: both;
  }

  #ar-button {
    background-color: transparent;
    color: #675fed;
    padding: 2px 10px;
    border: 1px solid #675fed;
    border-radius: 5px;
    text-transform: uppercase;
    margin: 10px auto;
    display: flex;
    align-items: center;
  }

  #ar-button img {
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }
`

export const IFrame = styled.iframe`
  border-radius: 0 !important;
  margin: 0 auto 0;
  width: 98%;
  min-height: 500px;
  position: relative;
  top: -45px;
  left: -3px;
  z-index: 2;
  border: none;
`
const ECBR2022: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t('pages.title.ecbr2022')}</title>
        <script src='https://unpkg.com/@r2u/javascript-ar-sdk/dist/index.js' async/>
      </Head>
      <GlobalStyle />
      <div className='wrapper'>
        <div className='container'>
          <img id='social-logo' src='/ecbr2022/social-digital-commerce-logo.svg'/>
        </div>
        <div className='container'>
          <video width='250' height='250' controls autoPlay muted loop>
              <source src='/ecbr2022/nft-art.mp4' type='video/mp4'/>
          </video>
          <button id='ar-button' type='button'>
            <img src='/ecbr2022/ar-icon.png'/>
            <span>{t('general.openAr')}</span>
          </button>
        </div>
        <IFrame
            src='https://eovvoavx7w2.typeform.com/to/CSX5sXwK'
            title='form'
            frameBorder='0'
            allow='xr-spatial-tracking; display-capture; magnetometer; picture-in-picture; wake-lock; screen-wake-lock; vr; geolocation; microphone; camera; midi; encrypted-media; autoplay; fullscreen; gyroscope; accelerometer;'
        />
        <div className='container' id='hidder'>
          <i>{t('general.poweredBy')}</i>
          <a href='https://converge.land' target='_blank' rel='noreferrer'>
            <img id='converge-logo' src='/ecbr2022/converge-logo.svg'/>
          </a>
        </div>
      </div>
      <Script src='/ecbr2022/ar-script.js' strategy='afterInteractive'/>
    </>
  )
}

export default ECBR2022
