import styled from 'styled-components'

export const Button = styled.button`
  margin: 20px;

  border: none;
  outline: none;
  background: none;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-size: 1.2rem;

  span {
    margin-left: 10px;
  }
`

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

    padding: 20px 50px;

    display: flex;
    justify-content: space-evenly;
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

    .titles {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;

      .title {
        font-size: 1.5rem;
        font-weight: bold;
      }

      .subtitle {
        font-size: 1.2rem;
      }
    }

    ol {
      padding: 0;
      text-align: left;
      li {
        font-size: 1rem;
        margin-bottom: 5px;
      }

      li::marker {
        font-size: 1.2rem;
        font-weight: bold;
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
