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

  width: 100%;
  height: calc(100vh - 100px);

  @media (max-width: 1080px) {
    & {
      height: calc(100vh - 75px);
    }
  }

  @media (max-width: 720px) {
    & {
      height: calc(100vh - 50px);
    }
  }

  span {
    margin: 20px 0;
    font-size: 3rem;
    font-weight: 600;
  }
`
