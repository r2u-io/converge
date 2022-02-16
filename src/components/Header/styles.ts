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

    button {
      margin-right: 25px;
    }

    button:last-child {
      margin-right: 0;
    }
  }
`
