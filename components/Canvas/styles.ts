import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  background-image: url(../images/background.svg);
  background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  background-size: cover;

  button {
    position: absolute;
    top: 90%;
    left: 50%;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
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
