import styled from 'styled-components'

interface Props {
  open: boolean
}

export const Container = styled.div<Props>`
  display: ${({ open }) => (open ? 'flex' : 'none')};

  grid-column: 1 / -1;
  grid-row: 2 / -1;
  z-index: 1;

  pointer-events: all;

  flex-direction: column;
  align-items: center;
  justify-content: start;

  background-color: rgba(84, 66, 124, 0.8);
  color: white;

  span {
    margin: 20px;
    font-size: 3rem;
    font-weight: 600;
  }
`
