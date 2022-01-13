import React from 'react'

import type { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0px;

    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    overflow: hidden;

    color: white;
  }
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp
