import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;

  align-items: center;

  background-color: #2f1346;
  color: #fff;

  margin: 0;
  padding: 0;

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
    animation: 2s linear infinite svg-animation;
    width: 300px;
    height: 300px;

    margin: auto;

    circle {
      animation: 1.4s ease-in-out infinite both circle-animation;
      display: block;
      fill: transparent;
      stroke: #ffffff;
      stroke-linecap: round;
      stroke-dasharray: 283;
      stroke-dashoffset: 280;
      stroke-width: 10px;
      transform-origin: 50% 50%;
    }
  }
`
