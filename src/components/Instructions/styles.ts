import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  z-index: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.8);
  color: white;

  h2 {
    font-size: 2rem;
  }

  p,
  span {
    font-size: 1.5rem;
  }

  .instructions {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;
    font-size: 14px;

    pointer-events: all;
    cursor: pointer;
  }

  &.hidden {
    display: none;
  }
`
