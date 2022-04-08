import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  border-top: solid 1px #ec248f;
  padding: 15px;

  span {
    text-align: left;
    margin: 0;
    padding: 0;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    gap: 10px;

    .contact {
      padding: 0;

      align-self: flex-start;
      color: #fff;

      border: none;

      outline: none;
      background: none;

      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      font-size: 1rem;

      span {
        margin-left: 10px;
      }
    }
  }
`
