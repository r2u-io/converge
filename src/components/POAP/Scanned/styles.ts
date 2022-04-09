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

    border-radius: 50px;

    background-color: gray;

    position: absolute;
    z-index: 2;

    opacity: ${({ clicked }) => (clicked ? 0 : 1)};
  }

  video {
    margin: 50px;
    width: 300px;
    height: 300px;
  }
`
