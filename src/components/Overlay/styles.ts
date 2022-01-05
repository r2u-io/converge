import styled from 'styled-components'

export const Container = styled.div`
  * {
    box-sizing: border-box;
  }

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: black;

  pointer-events: none;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  .map {
    position: absolute;

    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hidden {
    display: none;
  }

  .blocker {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;

    h2 {
      font-size: 2rem;
    }
    p {
      font-size: 1.5rem;
    }

    .instructions {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      text-align: center;
      font-size: 14px;
      cursor: pointer;
    }
  }
`
