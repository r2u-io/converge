import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import { useUIContext } from '../../contexts/UIContext'
import Model from '../../three/experience/World/Model'
import { Container } from './styles'

const Team: React.FC = () => {
  const { openTeam, closeTeam, teamOpened } = useUIContext()
  const { sceneReady, threeExperience } = useThreeContext()

  const [model, setModel] = useState<Model>()

  useEffect(() => {
    if (!sceneReady || !threeExperience || model) return
    const modelInstance = new Model(threeExperience, 'meet_team', 5, null, null, openTeam)
    setModel(modelInstance)
  }, [sceneReady, threeExperience, model])

  return teamOpened ? (
    <Container onClick={closeTeam}>
      <Image
        className='background'
        src='/images/team.png'
        alt='about'
        layout='fill'
        quality={100}
      />
      <div className='content'>
        <h2>Meet our team</h2>
        <Image src='/images/placeholder_team.png' alt='team' height={706} width={703} />
      </div>
    </Container>
  ) : null
}

export default Team
