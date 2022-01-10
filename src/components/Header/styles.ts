import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px;
  width: 100%;

  pointer-events: none;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  background-color: white;

  position: absolute;
  height: 100px;
  top: -100px;
  transition: top 0.3s;

  &.show {
    top: 0;
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
    font-size: 3rem;
  }

  .menu {
    font-size: 1.5rem;
  }
`
