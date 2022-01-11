import styled from 'styled-components'

export const Container = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / -1;
  z-index: 1;

  pointer-events: all;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: rgba(84, 66, 124, 0.8);
  color: white;
`
