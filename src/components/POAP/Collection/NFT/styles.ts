import styled, { css } from 'styled-components'

interface Props {
  rare: boolean
  claimed: boolean
}

export const Container = styled.div<Props>`
  width: ${({ rare }) => (rare ? '100%' : '45%')};
  padding-bottom: ${({ rare }) => (rare ? '100%' : '45%')};
  height: 0;
  position: relative;

  color: #fff;

  ${({ rare }) =>
    rare
      ? css`
          background: radial-gradient(
              ellipse farthest-corner at right bottom,
              #fedb37 0%,
              #fdb931 8%,
              #9f7928 30%,
              #8a6e2f 40%,
              transparent 80%
            ),
            radial-gradient(
              ellipse farthest-corner at left top,
              #ffffff 0%,
              #ffffac 8%,
              #d1b464 25%,
              #5d4a1f 62.5%,
              #5d4a1f 100%
            );
        `
      : css`
          background: #cccccc;
        `}

  box-shadow: rgba(0, 0, 0, 0.15) 3px 3px 6px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  .sticker {
    position: absolute
    width: 100%;
    padding-bottom: 100%;

    display: flex;
    align-items: center;
    justify-content: center;


    .logo {
      position: absolute;
      top: ${({ rare }) => (rare ? '35%' : '25%')};
    }

    .lock {
      position: absolute;
      top: 5%;
      left: 5%;
    }

    span {
      position: absolute;
      bottom: 5%;
      right: 5%;
      font-size: 1rem;
      font-weight: bold;
      color: black;
    }
  }

  video {
    position: absolute;
    width: 100%;
  }
`
