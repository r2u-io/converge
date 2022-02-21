import styled from 'styled-components'

interface Props {
  progress: number
}

export const Container = styled.div<Props>`
  .converge {
    margin: 200px auto;
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 50px;
    align-items: center;
    justify-content: center;

    position: relative;
    z-index: 2;
  }

  .subtitle {
    font-size: 3rem;

    position: relative;
    z-index: 2;
  }

  .loading {
    width: 80%;
    height: 15px;
    padding: 2px;
    border: solid 2px #642c8e;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;

    .bar {
      height: 100%;
      width: 100%;
      transform: scaleX(${({ progress }) => progress});
      transform-origin: left;
      background: #642c8e;

      transition: transform 0.3s;
    }
  }

  .swipe {
    display: none;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;

    span {
      font-size: 1.2rem;
    }

    svg {
      width: 25px;
      height: 25px;
    }
  }

  .scroll {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;

    span {
      font-size: 1.2rem;
    }

    svg {
      width: 25px;
      height: 25px;
    }
  }

  @media (orientation: portrait) {
    .converge {
      margin: 200px 0;
      width: 100vw;

      padding: 50px;
    }

    .subtitle {
      font-size: 2rem;
    }

    .swipe {
      display: flex;
    }

    .scroll {
      display: none;
    }
  }
`
