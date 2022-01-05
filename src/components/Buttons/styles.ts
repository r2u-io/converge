import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;

  bottom: 20px;
  width: 100%;

  pointer-events: none;

  display: flex;
  align-items: center;
  justify-content: center;

  button {
    cursor: pointer;
    pointer-events: all;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: uppercase;

    outline: none;
    border: none;

    background: none;
    color: #54439b;

    padding: 0;

    svg {
      color: currentColor;
    }

    &:disabled {
      cursor: default;
      pointer-events: none;
      color: #545454;
    }
  }

  .back,
  .next {
    height: 100%;
    font-size: 2rem;
    margin: 0 20px;
  }

  .dot {
    width: 20px;
    circle {
      stroke-width: 0px;
      transition: stroke-width 1s;
    }

    &.active {
      circle {
        stroke-width: 10px;
      }
    }
  }

  .tour {
    position: absolute;
    left: 10px;
    bottom: 10px;
    font-size: 2rem;
    background-color: white;
    border-radius: 10px;
    padding: 5px;

    hr {
      width: 10px;
      border: none;
    }
  }
`
