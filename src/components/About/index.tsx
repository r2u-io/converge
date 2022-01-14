import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import { useUIContext } from '../../contexts/UIContext'
import Model from '../../three/experience/World/Model'
import { Container } from './styles'

const About: React.FC = () => {
  const { openAbout, closeAbout, aboutOpened } = useUIContext()
  const { sceneReady, threeExperience } = useThreeContext()

  const [model, setModel] = useState<Model>()

  useEffect(() => {
    if (!sceneReady || !threeExperience || model) return
    const modelInstance = new Model(threeExperience, 'cta_0', 0, null, null, openAbout)
    setModel(modelInstance)
  }, [sceneReady, threeExperience, model])

  return (
    <Container onClick={closeAbout} open={aboutOpened}>
      <Image
        className='background'
        src='/images/about.png'
        alt='about'
        layout='fill'
        quality={100}
      />
      <div className='content'>
        <div className='left'>
          <span>Connecting worlds</span>
          <button type='button'>Contact Us</button>
        </div>
        <div className='right'>
          We believe the future will be connected, and while web3 has given users autonomy and
          ownership of virtual assets, there is still no place where you can store, manage, present,
          trade, and display your decentralized goods.
          <br />
          At Converge, our mission is to empower users and their NFTs from any network or metaverse.
          <br />
          At Converge you are free to build using assets from a myriad of sources, mint your own,
          export, play, and share. You can stake your NFTs at Converge if you want to, but we pose
          no boundaries: users are free to gather or scatter what they have from other universes as
          they please.
          <br />
          Use NFT&apos;s from any network, game, or metaverse inside our world. We allow users to
          easily import NFTs from a variety of media: Images, 3D, Audio, Movies, and more!
        </div>
      </div>
    </Container>
  )
}

export default About
