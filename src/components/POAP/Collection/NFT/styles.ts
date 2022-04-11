import styled from 'styled-components'

interface Props {
  rare: boolean
  claimed: boolean
}

export const Container = styled.div<Props>`
  width: 45%;

  background-color: #6e6e6e;
  color: #fff;

  box-shadow: rgba(0, 0, 0, 0.15) 3px 3px 6px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  .sticker {
    width: 100%;
    padding-bottom: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #e6e2e2;
    position: relative;

    .logo {
      position: absolute;
      top: 25%;
    }

    .lock {
      position: absolute;
      top: 5%;
      left: 5%;
    }

    span {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 1rem;
      font-weight: bold;
      color: black;
    }
  }

  video {
    width: 100%;
  }
`
