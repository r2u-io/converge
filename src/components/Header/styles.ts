import styled from 'styled-components'

export const Container = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / 2;

  padding: 20px;
  height: 100px;
  width: 100%;

  pointer-events: all;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #e5e5e5;

  transition: opacity 0.3s;
  transition-delay: 0;

  &.hide {
    opacity: 0;
    pointer-events: none;
    transition-delay: 3s;
  }

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
    align-self: end;
  }

  .menu {
    font-size: 1.5rem;
  }
`
