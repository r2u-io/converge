import styled from 'styled-components'

export const Button = styled.button`
  width: max-content;

  margin: 20px;
  margin-top: 0;

  color: white;
  background: #2f1346;
  border: none;

  padding: 10px 20px;
  border-radius: 5px;

  font-size: 1.5rem;

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
  justify-content: center;
  align-items: center;

  padding: 20px;

  background-color: #eeeeee;

  .close {
    position: absolute;
    top: 20px;
    left: 20px;

    border: none;
    outline: none;
    background: none;
  }

  .warning {
    color: #a00;
    opacity: 0.8;
    margin: 20px 0;
  }

  .options {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    .option {
      padding: 16px;
      margin: 0;

      width: 100%;
      height: 62px;
      border: none;
      border: 1px solid #cccccc;
      outline: none;

      background: white;

      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      text-align: center;

      text-decoration: none;
      color: rgb(0, 0, 0);
      font-size: 1rem;

      &:hover {
        box-shadow: rgba(4, 17, 29, 0.25) 0px 0px 8px 0px;
        background-color: #cccccc;
        z-index: 0;
      }

      .name {
        margin-left: 10px;
        font-weight: bold;
        font-size: 1.1rem;
      }

      .popular {
        margin-left: auto;
        color: rgb(112, 122, 131);
      }
    }

    .option:first-child {
      border-radius: 10px 10px 0 0;
    }

    .option:last-child {
      border-radius: 0 0 10px 10px;
      border-top: none;
    }
  }

  .or {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    hr {
      width: 40px;
      height: 0;
      margin: 0;
      border: none;
      border-top: solid 1px black;
    }

    span {
      margin: 20px 10px;
      text-transform: uppercase;

      font-size: 1.4rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    width: 100%;

    label {
      display: flex;
      flex-direction: column;
      gap: 10px;

      font-size: 1.1rem;

      input[type='text'] {
        width: 100%;
        padding: 12px 20px;

        border-radius: 5px;
        border: 1px solid #cccccc;

        resize: none;

        font-size: 1.2rem;

        &::placeholder {
          color: #888888;
          opacity: 0.8;
        }
      }
    }

    .submit {
      color: white;
      background: #2f1346;
      border: none;

      padding: 10px 20px;
      border-radius: 5px;

      font-size: 1.3rem;

      &:disabled {
        background-color: #cccccc;
        color: #888888;
        cursor: not-allowed;
      }
    }
  }

  .success {
    text-align: center;
    color: #335;
    font-size: 1.4rem;
  }
`
