import React, { useEffect, useState } from 'react'

import { Button } from './styles'

const Fullscreen: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      return
    }
    await document.body.requestFullscreen()
  }

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      setIsFullScreen(document.fullscreenElement !== null)
    })
  }, [])

  return (
    <Button onClick={toggleFullscreen}>
      <svg
        width='30'
        height='30'
        viewBox='0 0 100 100'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        {isFullScreen ? (
          <path
            d='M65 65v35h15V80h20V65zM35 65H0v15h20v20h15zM35 35V0H20v20H0v15zM65 35h35V20H80V0H65z'
            fill='currentColor'
          />
        ) : (
          <path
            d='M0 0v35h15V15h20V0zm100 0H65v15h20v20h15zm0 100V65H85v20H65v15zM0 100h35V85H15V65H0z'
            fill='currentColor'
          />
        )}
      </svg>
    </Button>
  )
}

export default Fullscreen
