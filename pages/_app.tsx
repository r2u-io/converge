import type { AppProps } from 'next/app'
import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { ThreeProvider } from '../contexts/ThreeJSContext'

const GlobalStyle = createGlobalStyle`
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
      <ThreeProvider>
        <Component {...pageProps} />
      </ThreeProvider>
    </ThemeProvider>
  )
}
export default MyApp
