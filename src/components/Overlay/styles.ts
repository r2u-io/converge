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
  width: 100%;
  height: 100%;
  overflow: hidden;
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

  .blocker,
  .portrait {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;

    h2 {
      font-size: 2rem;
    }
    p,
    span {
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

  .portrait {
    display: none;
  }

  @media (orientation: portrait) {
    .portrait {
      display: flex;
      pointer-events: all;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      text-align: center;
      padding: 20px;

      button {
        outline: none;
        border: none;
        background-color: white;
        border-radius: 10px;
        width: 50%;
        height: 50px;
        font-size: 1.2rem;
      }
    }
  }

  .background {
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
  }

  .fullscreen {
    pointer-events: all;
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 60px;
    height: 60px;
    border: none;
    outline: none;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #54439b;
  }
`
