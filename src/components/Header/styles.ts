import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;

  top: 0;
  padding: 20px;
  width: 100%;

  pointer-events: none;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

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
    font-size: 5rem;
  }

  .menu {
    font-size: 2rem;
  }
`
