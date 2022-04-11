import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyleLight = createGlobalStyle`
  body, html { 
    background-color: #eeeeee;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  overflow-x: hidden;

  .rare {
    display: flex;
    flex-direction: column;
  }

  .title,
  .subtitle {
    margin: 0 20px 20px 20px;
  }

  .title {
    font-size: 3rem;
    font-weight: bold;
  }

  .collection {
    display: flex;
    flex-direction: column;

    .cards {
      display: flex;
      align-items: center;
      justify-content: center;

      flex-wrap: wrap;
      gap: 10px;
    }
  }

  .rare {
    padding: 20px;
  }

  @keyframes svg-animation {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }

  @keyframes circle-animation {
    0%,
    25% {
      stroke-dashoffset: 280;
      transform: rotate(0);
    }
    50%,
    75% {
      stroke-dashoffset: 75;
      transform: rotate(45deg);
    }
    100% {
      stroke-dashoffset: 280;
      transform: rotate(360deg);
    }
  }

  .spinner {
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    svg {
      animation: 2s linear infinite svg-animation;
      width: 250px;
      height: 250px;

      margin: auto;

      circle {
        animation: 1.4s ease-in-out infinite both circle-animation;
        display: block;
        fill: transparent;
        stroke: #2f1346;
        stroke-linecap: round;
        stroke-dasharray: 283;
        stroke-dashoffset: 280;
        stroke-width: 10px;
        transform-origin: 50% 50%;
      }
    }
  }
`
