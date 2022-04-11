import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .logos {
    width: 100%;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  .login,
  .logout {
    align-self: flex-end;

    margin: 20px;

    width: 150px;
    height: 30px;
    border-radius: 5px;
    border: none;
    outline: none;
    background-color: #642c8d;
    color: #fff;
    font-size: 1rem;
  }
`
