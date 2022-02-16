import styled from 'styled-components'

export const Container = styled.div`
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    z-index: 1;
  }
`

export const CardsContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
