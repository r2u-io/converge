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

  .container {
    &.char {
      margin-top: -20%;
    }
    &.hunt {
      margin-top: -20%;
    }

    width: 60%;
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
`
