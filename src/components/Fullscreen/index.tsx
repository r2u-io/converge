import React, { useState } from 'react'

const Fullscreen: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullScreen(false)
      return
    }
    await document.body.requestFullscreen()
    setIsFullScreen(true)
  }

  return (
    <>
      <button type='button' className='fullscreen' onClick={toggleFullscreen}>
        {isFullScreen ? (
          <svg
            width='30'
            height='30'
            viewBox='0 0 60 60'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0.833374 46.6667H13.3334V59.1667H21.6667V38.3333H0.833374V46.6667ZM13.3334 13.3333H0.833374V21.6667H21.6667V0.833344H13.3334V13.3333ZM38.3334 59.1667H46.6667V46.6667H59.1667V38.3333H38.3334V59.1667ZM46.6667 13.3333V0.833344H38.3334V21.6667H59.1667V13.3333H46.6667Z'
              fill='currentColor'
            />
          </svg>
        ) : (
          <svg
            width='50'
            height='50'
            viewBox='0 0 100 100'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M29.1667 58.3333H20.8334V79.1667H41.6667V70.8333H29.1667V58.3333ZM20.8334 41.6667H29.1667V29.1667H41.6667V20.8333H20.8334V41.6667ZM70.8334 70.8333H58.3334V79.1667H79.1667V58.3333H70.8334V70.8333ZM58.3334 20.8333V29.1667H70.8334V41.6667H79.1667V20.8333H58.3334Z'
              fill='currentColor'
            />
          </svg>
        )}
      </button>
    </>
  )
}

export default Fullscreen
