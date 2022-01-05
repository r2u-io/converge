import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;

  bottom: 100px;
  width: 100%;

  pointer-events: none;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  button {
    cursor: pointer;
    pointer-events: all;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    outline: none;
    border: none;

    background: none;
    color: #54439b;

    padding: 0;
    height: 50px;
    width: 50px;

    svg {
      color: currentColor;
    }

    &:disabled {
      cursor: default;
      pointer-events: none;
      color: #545454;
    }
  }

  .back {
    font-size: 1.5rem;
    margin: 0 10px;
  }

  .next {
    font-size: 2rem;
    margin: 0 10px;
  }

  .dot {
    width: 20px;
    circle {
      /* transform-origin: center; */
      stroke-width: 0px;
      transition: stroke-width 1s;
    }

    &.active {
      circle {
        /* transform: scale(2, 2); */
        stroke-width: 10px;
      }
    }
  }
`
