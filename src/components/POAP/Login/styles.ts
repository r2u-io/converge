import styled from 'styled-components'

export const Container = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .instructions {
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
  }

  .login {
    margin: 0;

    background-color: #642c8d;
    color: #fff;

    border: none;

    width: 300px;
    height: 50px;
    border-radius: 35px;

    font-size: 1.5rem;
  }
`
