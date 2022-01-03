import styled from 'styled-components'

export const Container = styled.div`
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

  padding: 5% 30%;

  .back {
    position: absolute;
    top: 90%;
    left: calc(50% - 50px);
  }

  .go {
    position: absolute;
    top: 90%;
    left: calc(50% + 50px);
  }

  .map {
    position: absolute;

    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .print {
    position: absolute;
    top: 90%;
    left: calc(50% + 100px);
  }

  button {
    cursor: pointer;
    &:disabled {
      cursor: default;
    }
    pointer-events: all;
    width: 100px;
    height: 70px;
    text-align: center;
    font-size: 1.2rem;
    border-radius: 20px;
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
