import styled from 'styled-components'

export const Container = styled.div`
  grid-row: 3 / 4;

  justify-self: center;

  pointer-events: all;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #54439b;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  opacity: 0.4;
  transition: opacity 0.25s;

  border-radius: 20px;
  padding: 10px;
  margin: 10px;

  &:hover {
    opacity: 0.9;
  }

  button {
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: uppercase;

    outline: none;
    border: none;

    background: none;
    color: #d71488;

    padding: 0;

    svg {
      color: currentColor;
    }

    &:disabled {
      cursor: default;
      pointer-events: none;
      color: #999;
    }
  }

  .back,
  .next {
    height: 100%;
    font-size: 2rem;
    margin: 0 10px;
  }

  .dot {
    width: 20px;
    height: 20px;
    margin: 5px;
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
