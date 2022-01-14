import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import { useThreeContext } from '../../contexts/ThreeJSContext'
import { useUIContext } from '../../contexts/UIContext'
import Model from '../../three/experience/World/Model'
import { Container } from './styles'

interface Data {
  type: 'all' | 'group'
  group?: 'operations' | 'tech' | 'admin' | 'sales'
}
interface MessageEventCustom extends MessageEvent {
  origin: string
  data: Data
}

const Team: React.FC = () => {
  const { openTeam, closeTeam, teamOpened } = useUIContext()
  const { sceneReady, threeExperience } = useThreeContext()

  const [model, setModel] = useState<Model>()

  const [disabled, setDisabled] = useState({
    all: true,
    operations: false,
    tech: false,
    admin: false,
    sales: false
  })

  const ref = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!sceneReady || !threeExperience || model) return
    const modelInstance = new Model(threeExperience, 'meet_team', 5, null, null, openTeam)
    setModel(modelInstance)
  }, [sceneReady, threeExperience, model])

  const sendMessage = (message: Data) => {
    if (!ref.current || !ref.current.contentWindow) return
    setDisabled({
      all: true,
      operations: true,
      tech: true,
      admin: true,
      sales: true
    })
    ref.current.contentWindow.postMessage(message, window.location.origin)
  }

  useEffect(() => {
    if (!ref.current) return

    window.addEventListener('message', ({ origin, data }: MessageEventCustom) => {
      if (origin !== window.location.origin) return

      const { type, group } = data

      switch (type) {
        case 'all':
          setDisabled({
            all: true,
            operations: false,
            tech: false,
            admin: false,
            sales: false
          })
          break
        case 'group':
          setDisabled({
            all: false,
            operations: false,
            tech: false,
            admin: false,
            sales: false,
            [group as string]: true
          })
          break
        default:
          break
      }
    })
  }, [ref])

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
          <button
            type='button'
            onClick={() => sendMessage({ type: 'all' })}
            disabled={disabled.all}
          >
            BACK
          </button>
          <button
            type='button'
            onClick={() => sendMessage({ type: 'group', group: 'operations' })}
            disabled={disabled.operations}
          >
            OPS
          </button>
          <button
            type='button'
            onClick={() => sendMessage({ type: 'group', group: 'tech' })}
            disabled={disabled.tech}
          >
            TECH
          </button>
          <button
            type='button'
            onClick={() => sendMessage({ type: 'group', group: 'admin' })}
            disabled={disabled.admin}
          >
            ADM
          </button>
          <button
            type='button'
            onClick={() => sendMessage({ type: 'group', group: 'sales' })}
            disabled={disabled.sales}
          >
            SLS
          </button>
        </div>
        <iframe ref={ref} className='right' src='/team' title='team' />
      </div>
    </Container>
  )
}

export default Team
