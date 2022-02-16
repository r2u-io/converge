import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 75vw;
  height: 100vh;

  z-index: 1;

  canvas {
    width: 100%;
    height: 100%;
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
