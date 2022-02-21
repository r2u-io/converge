import React from 'react'

import type { AppProps } from 'next/app'
import { I18nextProvider } from 'react-i18next'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import i18nInstance from '../config/i18n'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Inter, sans-serif;
    box-sizing: border-box;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;

    max-width: 100vw;
    max-height: 100vh;
  }

  body {
    background-color: #D8D6D2;
  }
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <I18nextProvider i18n={i18nInstance}>
      <ThemeProvider theme={{}}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </I18nextProvider>
  )
}
export default MyApp
