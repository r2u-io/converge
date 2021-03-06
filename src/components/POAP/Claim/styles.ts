import styled from 'styled-components'

interface Props {
  clicked: boolean
}

export const Container = styled.div<Props>`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;

  align-items: center;

  color: #fff;

  margin: 0;
  padding: 0;

  .title,
  .subtitle {
    margin: 20px 10px;

    text-align: center;

    &.title {
      font-size: 1.4rem;
    }

    &.subtitle {
      font-size: 1.1rem;
    }
  }

  .nft {
    width: 60%;
    padding-bottom: 60%;
    position: relative;
    height: 0;
  }

  .cover {
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
  }

  video {
    width: 100%;
  }

  .bottom {
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

      &:disabled {
        background-color: #e6e2e2;
        color: #888888;
        cursor: not-allowed;
      }
    }
  }
`
