import styled from 'styled-components'

interface Props {
  progress: number
}

export const Container = styled.section<Props>`
  .converge {
    margin: 200px 0;
    width: 100%;
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
`
