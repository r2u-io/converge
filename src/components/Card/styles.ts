import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;

  pointer-events: none;
  will-change: transform;

  .product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    width: 250px;
    padding: 20px;

    will-change: transform;

    transition: transform 0.3s;
    transform-origin: center;
    transform: scale(0, 0);

    &.visible {
      transform: scale(1, 1);
    }

    pointer-events: none;

    background-color: rgba(255, 255, 255, 0.65);
    border-radius: 30px;

    transform-origin: center;

    color: #5d4680;

    .title {
      text-align: center;
      font-size: 1.6rem;
      margin: 0;
      margin-bottom: auto;
      font-weight: 700;
    }

    .price {
      margin: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      span {
        font-size: 1rem;
        font-weight: 500;
      }
    }

    button {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 20px;
      background-color: #e53b9a;

      a {
        color: #fff;
        text-decoration: none;
        font-size: 1rem;
        font-weight: 900;
      }
    }
  }
`
