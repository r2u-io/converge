import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100vh;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .display {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 80%;
    height: 80%;

    background-color: #dddddd;
    border-radius: 30px;

    padding: 50px;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    .close {
      position: absolute;
      top: 20px;
      left: 20px;

      border: none;
      outline: none;
      background: none;
    }

    .title {
      font-size: 1.5rem;
    }

    .subtitle {
      font-size: 1.2rem;
      margin-bottom: auto;
    }

    ol {
      padding: 0;
      text-align: left;
      li {
        font-size: 1rem;
      }
    }

    .cta {
      margin: 0;

      background-color: #642c8d;
      color: #fff;

      border: none;

      width: 200px;
      padding: 10px;
      border-radius: 5px;

      font-size: 1.2rem;
    }
  }
`
