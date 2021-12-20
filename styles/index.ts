import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  width: 100%;

  padding-left: 120px;
  padding-right: 120px;

  @media only screen and (max-width: 1280px) {
    padding-left: 80px;
    padding-right: 80px;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media only screen and (max-width: 600px) {
    padding-left: unset;
    padding-right: unset;
  }

  height: 100vh;
  background-image: url(../images/background.svg);
  background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  background-size: cover;

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

      .price {
        color: #58f;
      }
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

export const Content = styled.div`
  width: 1200px;
  margin: auto;
  @media only screen and (max-width: 600px) {
    width: unset;
    margin: unset;
  }
`
