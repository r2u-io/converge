import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 75vw;
  height: 100vh;

  pointer-events: none;

  z-index: 1;

  canvas {
    width: 100%;
    height: 100%;
  }

  @media (orientation: portrait) {
    & {
      width: 100vw;
      height: 70vh;

      top: unset;
      bottom: 0;
      right: 0;
      left: 0;
    }
  }
`
