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

  .images {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .char-3,
    .char-1 {
      display: none;
    }

    .hunt {
      position: relative;

      width: 270px;
      height: 270px;
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    margin: 10px;

    text-align: center;

    &.title {
      font-size: 1.4rem;
    }

    &.subtitle {
      font-size: 1.1rem;
    }
  }

  @media (min-width: 720px) {
    .images {
      flex-direction: row;

      .char-3,
      .char-1 {
        display: block;
      }

      .char-2 {
        display: none;
      }

      .hunt {
        width: 500px;
        height: 500px;
      }
    }
  }
`
