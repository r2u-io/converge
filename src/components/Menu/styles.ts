import styled, { css } from 'styled-components'

interface Props {
  open: boolean
}

export const Container = styled.div<Props>`
  z-index: 1;

  position: absolute;
  right: 10px;
  top: 100px;
  padding: 0 20px;

  background-color: #d71488;

  animation: growDown 400ms ease-in-out forwards;
  transform-origin: top center;

  ${({ open }) =>
    open
      ? css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
        `
      : css`
          display: none;
        `}

  hr {
    width: 100%;
    border: 1px solid #54439b;
    height: 0;
    margin: 0;
  }

  .item {
    width: 100%;
    text-align: left;
    font-size: 1.2rem;
    padding: 15px 0;
    margin: 0 20px;
    color: white;

    a {
      color: white;
      text-decoration: none;
    }
  }

  @keyframes growDown {
    0% {
      transform: scaleY(0);
    }
    80% {
      transform: scaleY(1.1);
    }
    100% {
      transform: scaleY(1);
    }
  }
`
