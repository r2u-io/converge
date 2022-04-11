import styled from 'styled-components'

export const Container = styled.div`
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

    border-radius: 50px 0 50px 50px;

    background-color: #e6e2e2;

    border: none;
    outline: none;

    position: absolute;
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;

    .corner {
      position: absolute;
      top: 0;
      right: 0;
      border-width: 0 100px 100px 0;
      border-style: solid;
      border-color: #2f1346 #2f1346 #888888 #888888;
      border-radius: 0 0 0 50px;
      background: #888888;
      width: 0;
    }

    .reveal {
      position: absolute;

      border: none;
      outline: none;
      background-color: #642c8d;
      color: #fff;

      border-radius: 20px;
      height: 40px;
      width: 200px;

      bottom: 20px;
    }
  }

  video {
    margin: 50px;
    width: 300px;
    height: 300px;
  }
`
