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

    outline: none;
    border: none;

    background: none;
    color: #54439b;

    padding: 0;
  }

  .logo {
    align-self: end;
  }

  .menu {
    position: absolute;
    right: 10px;
    top: 100px;
    padding: 0 20px;

    background-color: #d71488;

    animation: growDown 400ms ease-in-out forwards;
    transform-origin: top center;

    display: none;

    &.open {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
    }

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
