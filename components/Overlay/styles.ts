import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: black;

  pointer-events: none;

  width: 100%;
  height: 100%;

  button.back {
    pointer-events: all;
    position: absolute;
    top: 90%;
    left: calc(50% - 50px);
  }

  button.go {
    pointer-events: all;
    position: absolute;
    top: 90%;
    left: calc(50% + 50px);
  }
`
