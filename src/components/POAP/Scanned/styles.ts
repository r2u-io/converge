import styled from 'styled-components'

export const Container = styled.div`
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
    width: 60%;
    padding-bottom: 60%;
    position: relative;
  }
`
