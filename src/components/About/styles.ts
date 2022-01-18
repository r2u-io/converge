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
  width: 100%;
  height: calc(100vh - 100px);

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
    max-height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 100px;
    padding: 50px 10px;

    @media (max-width: 1080px) {
      & {
        padding: 20px 10px;
        gap: 50px;
      }
    }

    @media (max-width: 720px) {
      & {
        padding: 10px 10px;
        gap: 20px;
      }
    }

    .title {
      width: 50%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: end;

      span {
        width: 70%;
        font-size: 5rem;
        text-align: right;
      }

      @media (max-width: 1080px) {
        span {
          font-size: 3rem;
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
    }

    .text {
      padding-right: 5%;

      overflow: auto;
      scrollbar-color: #d71488 transparent;

      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: #d71488;
        border-radius: 10px;

        margin: 5px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #aa106d;
      }

      width: 50%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      p {
        height: 100%;
        margin: 0;

        font-size: 1.5rem;
        text-align: left;

        br {
          margin-bottom: 20px;
          display: block;
          content: ' ';
        }
      }
    }
  }

  @media (orientation: portrait) {
    .content {
      display: flex;
      flex-direction: column;
      padding: 20px;
      gap: 20px;

      .title {
        width: 100%;
        height: max-content;
        padding: 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;

        span {
          width: 100%;
        }
      }

      .text {
        width: 100%;
        height: 100%;
      }
    }
  }
`
