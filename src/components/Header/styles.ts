import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 20px;

  padding: 0 50px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;
  z-index: 2;

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    pointer-events: all;

    outline: none;
    border: none;

    background: none;

    padding: 0;

    color: #642c8e;

    font-size: 1.2rem;

    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu {
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      margin-right: 25px;
    }

    a:last-child {
      margin-right: 0;
    }
  }

  @media (orientation: portrait) {
    & {
      width: 100vw;
      margin: 0;
      padding: 10px;
    }

    .menu {
      display: none;
    }
  }
`
