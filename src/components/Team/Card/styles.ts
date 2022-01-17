import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  z-index: 0;

  position: absolute;
  top: calc(50% - 100px);
  left: calc(50% - 100px);

  transform-origin: center;

  background-color: rgba(255, 255, 255, 0.5);
  opacity: 0;

  transition: opacity 0.5s;

  .frame {
    width: 200px;
    height: 200px;
    border: solid 2px #54439b;
  }
`
