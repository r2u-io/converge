import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;

  pointer-events: none;
  will-change: transform;

  .product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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
    border-radius: 10px;
    width: 150px;

    transform-origin: center;

    color: #54439b;

    h2 {
      margin-top: 0;
    }
  }
`
