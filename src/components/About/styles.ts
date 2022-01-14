import styled from 'styled-components'

interface Props {
  open: boolean
}

export const Container = styled.div<Props>`
  display: ${({ open }) => (open ? 'flex' : 'none')};

  grid-column: 1 / -1;
  grid-row: 2 / -1;
  z-index: 1;

  position: relative;

  pointer-events: all;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: white;

  .background {
    opacity: 0.75;
    z-index: 1;
  }

  .content {
    z-index: 2;

    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 50px;

    padding: 50px 10%;

    .left {
      width: 50%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: end;

      span {
        font-size: 6rem;
        text-align: right;
      }

      button {
        color: white;
        background: none;
        outline: none;
        border: solid 2px #d71488;
        border-radius: 20px;

        height: 50px;
        width: 275px;

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

    .right {
      width: 50%;
      height: 100%;
      font-size: 1.5rem;

      display: flex;
      justify-content: center;
      align-items: center;
      text-align: left;

      br {
        margin: 20px;
      }
    }
  }
`
