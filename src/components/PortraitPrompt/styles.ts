import styled from 'styled-components'

export const Container = styled.div`
  display: none;

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.8);
  color: white;

  span {
    font-size: 1.5rem;
  }

  @media (orientation: portrait) {
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
`
