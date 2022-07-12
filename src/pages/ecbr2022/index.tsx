import React, { useState } from 'react'

import { Timestamp, setDoc, doc} from 'firebase/firestore'
import Head from 'next/head'
import Script from 'next/script'
import { useTranslation } from 'react-i18next'
import styled, { createGlobalStyle } from 'styled-components'

import { db } from '../../firebase'


const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
  }

  .wrapper {
      overflow-x: hidden;
      max-width: 100%;
      max-width: 600px;
      min-height: 700px;
      margin: 0 auto 0;
      position: relative;
      z-index: 0;
  }

  .container {
      text-align: center;
      padding: 15px 0;
      box-sizing: border-box;
      background-color: #ffffff;
      position: relative;
      z-index: 3;
  }

 .container img{
      width: 100px;
      height: auto;
  }

  .container.header img {
      height: 40px;
      width: 150px;
      margin: 0 5px;
      object-fit: contain;
  }

  .container video {
      width: 280px;
      height: 280px;
      max-width: 80%;
      object-fit: contain;
  }

  iframe {
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

  #hidder {
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

  form.container {
    padding: 0 20px;
  }

  form.container h1 {
    text-align: left;
    color: #291d56;
    font-size: 26px;
    line-height: 32px;
  }

  form.container p {
    font-size: 14px;
    line-height: 19px;
    color: #291d56b3;
    text-align: left;
    margin: 5px 0 12px;
  }

  form.container input[type='email'] {
    color: #b264ac;
    padding: 4px 7px 8px;
    font-size: 24px;
    border: none;
    border-bottom: 1px solid;
    font-weight: initial;
    width: 100%;
    background: rgb(234 199 240 / 20%);
  }

  form.container input[type='submit'] {
    outline: none;
    border: 1px solid transparent;
    margin: 18px 0 0;
    box-shadow: rgb(0 0 0 / 10%) 0px 3px 12px 0px;
    padding: 6px 14px;
    min-height: 40px;
    background-color: rgb(255, 91, 107);
    color: rgb(255, 255, 255);
    border-radius: 4px;
    width: 100%;
    font-weight: 700;
    font-size: 18px;
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
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      await setDoc(doc(db, 'ecbr2022-users', email), {
        email,
        walletAddress: null,
        tranferedAt: null,
        createdAt: Timestamp.now()
      }).then(() => {
        setLoading(false)
        setSent(true)
      })
    } catch (err) {
      setLoading(false)
      alert('Erro')
      console.error(err)
    }
  }

  return (
    <>
      <Head>
        <title>{t('pages.title.ecbr2022')}</title>
        <script src='https://unpkg.com/@r2u/javascript-ar-sdk/dist/index.js' async/>
      </Head>
      <GlobalStyle />
      <div className='wrapper'>
        <div className='container header'>
          <img id='social-logo' src='/ecbr2022/social-digital-commerce-logo.svg'/>
          <img id='converge-logo' src='/ecbr2022/converge-logo.svg'/>
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

        { sent ? (
          <form className='container'>
            <h1>{t('poap.ecbr2022.formSuccess')}</h1>
            <h1 style={{
              color: "#FF5B6B",
              textAlign: "center"
            }}>{email}</h1>
          </form>
        ) : (
          <form className='container' onSubmit={handleSubmit}>
              <h1>{t('poap.ecbr2022.emailLabel')}</h1>
              <p>{t('poap.ecbr2022.emailDescription')}</p>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="nome@exemplo.com" />

              <input type="submit" value={t(loading ? 'general.loading' : 'general.send') as string} disabled={loading} />
          </form>
        )}
      </div>
      <Script src='/ecbr2022/ar-script.js' strategy='afterInteractive'/>
    </>
  )
}

export default ECBR2022
