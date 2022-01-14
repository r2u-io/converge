import styled from 'styled-components'

export const Container = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / -1;
  z-index: 1;

  position: relative;

  pointer-events: all;

  .content {
    position: absolute;
    z-index: 2;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 50px;

    color: white;

    h2 {
      width: 300px;
      font-size: 3rem;
    }

    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }

  .background {
    opacity: 0.8;
    z-index: 1;
  }
`
