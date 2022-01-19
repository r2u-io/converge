import styled from 'styled-components'

interface Props {
  open: boolean
}

export const Container = styled.div<Props>`
  display: ${({ open }) => (open ? 'block' : 'none')};

  grid-column: 1 / -1;
  grid-row: 2 / -1;
  z-index: 1;

  position: relative;

  pointer-events: all;

  height: calc(100vh - 100px);

  .content {
    position: absolute;
    z-index: 2;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    color: white;
    pointer-events: none;

    .ui {
      padding-left: 20px;
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .back {
          width: 40px;
          height: 40px;
          color: #d71488;
          border: none;
          margin: 0;
          padding: 0;
        }

        span {
          align-self: center;
          font-size: 2.2rem;
          font-weight: bold;
          margin-left: auto;
        }
      }

      button {
        margin: 10px 0;
        padding: 10px 5px;
        color: white;
        background: none;
        outline: none;
        border: solid 2px #d71488;
        border-radius: 20px;

        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        pointer-events: all;
        cursor: pointer;

        font-size: 1.5rem;

        &:disabled {
          border: solid 2px #d7d7d7;
          color: #777;
          cursor: default;
        }
      }
    }

    .canvas {
      width: 100%;
      height: 100%;
      border: none;
      position: relative;

      .wrapper {
        width: 100%;
        height: 100%;

        position: absolute;
        padding: 10px;

        display: grid;

        gap: 20px;
        align-items: center;
        justify-content: center;

        &.column-3 {
          grid-template-columns: repeat(3, 190px);
        }

        &.column-5 {
          grid-template-columns: repeat(5, 190px);
        }
      }
    }
  }

  .background {
    opacity: 0.8;
    z-index: 1;
  }

  @media (max-width: 1440px) {
    .content {
      .ui {
        .header {
          .back {
            width: 30px;
            height: 30px;
          }

          span {
            font-size: 2rem;
          }
        }

        button {
          font-size: 1.4rem;
        }
      }
    }
  }

  @media (max-width: 1080px) {
    & {
      height: calc(100vh - 75px);
    }

    .content {
      .ui {
        .header {
          margin-bottom: 10px;
          .back {
            width: 25px;
            height: 25px;
          }

          span {
            font-size: 1.5rem;
          }
        }

        button {
          font-size: 1.1rem;
        }
      }
    }
  }

  @media (max-width: 720px) {
    & {
      height: calc(100vh - 50px);
    }

    .content {
      .ui {
        .header {
          margin-bottom: 5px;
          .back {
            width: 20px;
            height: 20px;
          }

          span {
            font-size: 1.4rem;
          }
        }

        button {
          font-size: 1rem;
        }
      }
    }
  }

  @media (orientation: portrait) {
    .content {
      flex-direction: column;

      .ui {
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 0;

        width: 100%;
        height: 30%;

        button {
          font-size: 1.1rem;
          margin: 5px;
          padding: 5px;
          width: 80%;
        }

        .header {
          width: 80%;

          .back {
            width: 30px;
            height: 30px;
          }

          span {
            font-size: 2rem;
          }
        }
      }
    }
  }
`
