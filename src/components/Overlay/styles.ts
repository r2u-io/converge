import styled from 'styled-components'

export const Container = styled.div`
  * {
    box-sizing: border-box;
  }

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  pointer-events: none;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content auto max-content;
`
