import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    margin-left: auto;
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logout {
    border: none;
    outline: none;
    background: none;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    padding: 0;
    margin: 0;

    span {
      font-size: 1.2rem;
      color: #2f1346;
    }
  }
`
