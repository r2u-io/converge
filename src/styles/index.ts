import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

  height: 100vh;
  max-height: 100vh;

  .product-card-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;

    top: 0;
    left: 0;

    pointer-events: none;

    transform: scale(0, 0);
    transition: transform 0.3s;
    will-change: transform;

    &.visible {
      transform: scale(1, 1);
    }

    .product-card {
      pointer-events: none;

      position: absolute;
      top: 50%;
      left: 50%;
      background-color: #fff;
      border-radius: 10px;
      width: 150px;

      transform-origin: center;

      color: black;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      padding: 20px;
    }
  }

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
