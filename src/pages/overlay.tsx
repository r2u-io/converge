import React from 'react'

import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

import SectionOne from '../components/Sections/1'
import SectionTwo from '../components/Sections/2'
import SectionThree from '../components/Sections/3'
import SectionFour from '../components/Sections/4'
import SectionFive from '../components/Sections/5'
import SectionSix from '../components/Sections/6'
import Team from '../components/Team'
import { AvatarsProvider } from '../contexts/AvatarsContext'

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
      font-size: 3rem;
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
      border-radius: 20px;

      height: 50px;
      width: 240px;

      font-size: 1rem;
      font-weight: 900;
    }
  }
`

const Home: React.FC = () => (
  <>
    <Head>
      <title>Overlay</title>
    </Head>
    <>
      <GlobalStyle />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <AvatarsProvider>
        <Team />
      </AvatarsProvider>
    </>
  </>
)

export default Home
