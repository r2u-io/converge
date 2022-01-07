import styled from 'styled-components'

interface Props {
  block: boolean
}

export const Container = styled.div<Props>`
  padding: 20px;
  width: 100%;

  pointer-events: none;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  background-color: ${({ block }) => (block ? 'white' : 'none')};

  button {
    cursor: pointer;
    pointer-events: all;
    text-transform: uppercase;

    outline: none;
    border: none;

    background: none;
    color: #54439b;

    padding: 0;

    span {
      padding: 0;
    }
  }

  .logo {
    font-size: 3rem;
  }

  .menu {
    font-size: 1.5rem;
  }
`
