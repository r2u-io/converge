import styled, { css } from 'styled-components'

interface Props {
  show: boolean
}

export const Container = styled.div<Props>`
  grid-column: 1 / -1;
  grid-row: 1 / 2;

  padding: 20px;
  height: 100px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #e5e5e5;

  transition: opacity 0.3s;

  ${({ show }) =>
    show
      ? css`
          opacity: 1;
          pointer-events: all;
          transition-delay: 0;
        `
      : css`
          opacity: 0;
          pointer-events: none;
          transition-delay: 3s;
        `}

  button {
    cursor: pointer;
    pointer-events: all;

    outline: none;
    border: none;

    background: none;
    color: #54439b;

    padding: 0;
  }

  .logo {
    align-self: end;
  }

  .hamburger {
    height: 50px;
    width: 50px;

    line {
      transition: transform 300ms;
      transform-origin: center;
    }

    .line-1.open {
      transform: rotate(45deg) translate(0, 85px);
    }

    .line-2.open {
      transform: rotate(-45deg);
    }

    .line-3.open {
      transform: translate(0, 100px);
    }
  }
`
