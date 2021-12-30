import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: black;

  pointer-events: none;

  width: 100%;
  height: 100%;

  .back {
    position: absolute;
    top: 90%;
    left: calc(50% - 50px);
  }

  .go {
    position: absolute;
    top: 90%;
    left: calc(50% + 50px);
  }

  .map {
    position: absolute;

    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .print {
    position: absolute;
    top: 90%;
    left: calc(50% + 100px);
  }

  button {
    pointer-events: all;
  }
`
