import React from 'react'

import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

import Canvas from '../components/Canvas'
import Overlay from '../components/Overlay'
import { ThreeProvider } from '../contexts/ThreeJSContext'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #D8D6D2;
  }

  section {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: #642c8e;

    .title {
      font-size: 3.5rem;
    }

    br {
      margin: 25px;
    }

    .text {
      font-size: 1.5rem;
    }

    .more {
      background: none;
      outline: none;

      color: #642c8e;
      border: solid 1px #642c8e;
      border-radius: 30px;

      height: 50px;
      padding: 10px 25px;

      font-size: 1rem;
      font-weight: 900;

      &.white {
        color: white;
        border: solid 1px white;
      }
    }
  }
`

const Home: React.FC = () => (
  <>
    <Head>
      <title>Converge</title>
    </Head>
    <GlobalStyle />
    <ThreeProvider>
      <Canvas />
    </ThreeProvider>
    <Overlay />
  </>
)

export default Home
