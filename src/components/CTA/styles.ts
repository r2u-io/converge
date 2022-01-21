import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;

  pointer-events: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 330px;
  height: 395px;

  padding: 30px;
  border-radius: 30px;

  color: white;
  background-color: rgba(74, 48, 115, 0.8);

  will-change: transform;
  transition: transform 0.3s;
  transform-origin: center;
  transform: scale(0, 0);

  &.visible {
    transform: scale(1, 1);
  }

  .text {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      text-align: right;
      font-size: 1.5rem;
      font-weight: 700;
    }
  }

  button {
    background: none;
    outline: none;
    border: solid 2px #d71488;
    border-radius: 20px;

    height: 50px;
    width: 275px;

    a {
      width: 100%;
      height: 100%;

      color: white;
      text-decoration: none;

      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;

      pointer-events: all;
      cursor: pointer;

      font-weight: 500;
      font-size: 1.2rem;
    }
  }
`
