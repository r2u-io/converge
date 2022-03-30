import styled from 'styled-components'

export const Container = styled.div`
  * {
    box-sizing: border-box;
  }

  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid rgb(229, 232, 235);

  .options {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 570px;

    .option {
      padding: 16px;
      margin: 0;

      width: 100%;
      height: 62px;
      border: none;
      border-bottom: 1px solid rgb(229, 232, 235);
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
        background-color: rgb(251, 253, 255);
        z-index: 0;
      }

      .name {
        margin-left: 10px;
        font-weight: bold;
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
      border-bottom: none;
    }
  }
`
