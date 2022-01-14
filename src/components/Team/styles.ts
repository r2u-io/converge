import styled from 'styled-components'

interface Props {
  open: boolean
}

export const Container = styled.div<Props>`
  display: ${({ open }) => (open ? 'block' : 'none')};

  grid-column: 1 / -1;
  grid-row: 2 / -1;
  z-index: 1;

  position: relative;

  pointer-events: all;

  .content {
    position: absolute;
    z-index: 2;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 50px;

    color: white;

    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      h2 {
        width: 300px;
        height: 50%;
        font-size: 3rem;
      }
    }

    .right {
      width: 100%;
      height: 100%;
      border: none;
    }
  }

  .background {
    opacity: 0.8;
    z-index: 1;
  }
`
