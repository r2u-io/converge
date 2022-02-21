import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  background-color: #18131b;

  position: relative;
  z-index: 2;

  display: flex;
  flex-direction: column;

  .content {
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

        display: grid;

        gap: 20px;
        align-items: center;
        justify-content: center;

        &.column-3 {
          grid-template-columns: repeat(3, 180px);
        }

        &.column-5 {
          grid-template-columns: repeat(5, 180px);
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

      .canvas {
        .wrapper {
          gap: 15px;
          &.column-3 {
            grid-template-columns: repeat(3, 140px);
          }
          &.column-5 {
            grid-template-columns: repeat(5, 140px);
          }
        }
      }
    }
  }

  @media (max-width: 1080px) {
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
          margin: 5px;
          font-size: 1.1rem;
        }
      }

      .canvas {
        .wrapper {
          gap: 10px;
          &.column-3 {
            grid-template-columns: repeat(3, 90px);
          }
          &.column-5 {
            grid-template-columns: repeat(5, 90px);
          }
        }
      }
    }
  }

  @media (max-width: 720px) {
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

      .canvas {
        .wrapper {
          gap: 5px;
          &.column-3 {
            grid-template-columns: repeat(3, 80px);
          }
          &.column-5 {
            grid-template-columns: repeat(5, 80px);
          }
        }
      }
    }
  }

  @media (orientation: portrait) {
    width: 100vw;

    .content {
      flex-direction: column;
      width: 100vw;

      .ui {
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 0;

        width: 100%;
        height: 35%;

        button {
          font-size: 1.1rem;
          margin: 5px;
          padding: 5px;
          width: 80%;
        }

        .header {
          margin-top: 20px;
          width: 80%;

          .back {
            width: 30px;
            height: 30px;
          }

          span {
            font-size: 1.5rem;
          }
        }
      }

      .canvas {
        .wrapper {
          gap: 5px;
          &.column-3 {
            grid-template-columns: repeat(3, 90px);
          }
          &.column-5 {
            grid-template-columns: repeat(4, 90px);
          }
        }
      }
    }
  }
`
