import React from 'react'

import Head from 'next/head'

import { IFrame } from '../styles/Meet'

const Meet: React.FC = () => (
  <>
    <Head>
      <title>Converge | Meet</title>
    </Head>
    <IFrame
      src='https://app.learnbrite.com/dashboard/spaces/visit/spcc26dfb1d9c544e1962842b'
      title='meet'
      width='300'
      height='150'
      frameBorder='0'
      scrolling='no'
      allow='xr-spatial-tracking; display-capture; magnetometer; picture-in-picture; wake-lock; screen-wake-lock; vr; geolocation; microphone; camera; midi; encrypted-media; autoplay; fullscreen; gyroscope; accelerometer;'
    />
  </>
)

export default Meet
