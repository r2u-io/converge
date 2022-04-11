import styled from 'styled-components'

interface Props {
  clicked: boolean
  reserved: boolean
}

export const Container = styled.div<Props>`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;

  align-items: center;

  background-color: #2f1346;
  color: #fff;

  margin: 0;
  padding: 0;

  .title,
  .subtitle {
    margin: 10px;

    text-align: center;

    &.title {
      font-size: 1.4rem;
    }

    &.subtitle {
      font-size: 1.1rem;
    }
  }

  .nft {
    width: 400px;
    height: 400px;
  }

  .cover {
    width: 400px;
    height: 400px;

    border-radius: 20px 0 20px 20px;

    background-color: #e6e2e2;

    border: none;
    outline: none;

    position: absolute;
    z-index: 2;

    opacity: ${({ reserved }) => (reserved ? 0 : 1)};
    transition: opacity 500ms;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      animation: ${({ clicked }) => (clicked ? 'pulse' : '')} 1s ease-in-out infinite;

      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }
    }

    .corner {
      position: absolute;
      top: 0;
      right: 0;
      border-width: 0 100px 100px 0;
      border-style: solid;
      border-color: #2f1346 #2f1346 #888888 #888888;
      border-radius: 0 0 0 20px;
      background: #888888;
      width: 0;
    }
  }

  video {
    margin: 50px;
    width: 300px;
    height: 300px;
  }

  .buttons {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .claim {
      margin: 0;

      background-color: #642c8d;
      color: #fff;

      border: none;

      width: 300px;
      height: 50px;
      border-radius: 5px;

      font-size: 1.5rem;
    }
  }
`
