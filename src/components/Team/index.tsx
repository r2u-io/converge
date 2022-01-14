import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useAvatarsContext } from '../../contexts/AvatarsContext'
import { useThreeContext } from '../../contexts/ThreeJSContext'
import { useUIContext } from '../../contexts/UIContext'
import Model from '../../three/experience/World/Model'
import CanvasTeam from './Canvas'
import { Container } from './styles'

const Team: React.FC = () => {
  const { openTeam, closeTeam, teamOpened } = useUIContext()
  const { sceneReady, threeExperience } = useThreeContext()
  const {
    disabled,
    onClickBack,
    onClickOperations3D,
    onClickTechProduct,
    onClickGeneralAdmin,
    onClickSalesMarketing
  } = useAvatarsContext()

  const [model, setModel] = useState<Model>()

  useEffect(() => {
    if (!sceneReady || !threeExperience || model) return
    const modelInstance = new Model(threeExperience, 'meet_team', 5, null, null, openTeam)
    setModel(modelInstance)
  }, [sceneReady, threeExperience, model])

  return (
    <Container open={teamOpened}>
      <Image
        onClick={closeTeam}
        className='background'
        src='/images/team.png'
        alt='about'
        layout='fill'
        quality={100}
      />
      <div className='content'>
        <div className='left'>
          <h2>Meet our team</h2>
          <button type='button' onClick={onClickBack} disabled={disabled.all}>
            Everyone
          </button>
          <button type='button' onClick={onClickOperations3D} disabled={disabled.operations3D}>
            Operations & 3D
          </button>
          <button type='button' onClick={onClickTechProduct} disabled={disabled.techProduct}>
            Technology & Product
          </button>
          <button type='button' onClick={onClickGeneralAdmin} disabled={disabled.generalAdmin}>
            General & Administrative
          </button>
          <button type='button' onClick={onClickSalesMarketing} disabled={disabled.salesMarketing}>
            Sales & Marketing
          </button>
        </div>
        <div className='right'>
          <CanvasTeam />
        </div>
      </div>
    </Container>
  )
}

export default Team
