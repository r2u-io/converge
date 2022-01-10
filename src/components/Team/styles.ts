import styled from 'styled-components'

export const Container = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / -1;
  z-index: 1;

  pointer-events: all;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: rgba(50, 38, 80, 0.9);
  color: white;

  h2 {
    width: 300px;
    font-size: 3rem;
  }
`
