import styled from 'styled-components'

interface Props {
  light: boolean
}

export const Container = styled.div<Props>`
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

  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    padding: 10px;

    gap: 10px;
    color: ${({ light }) => (light ? '#2f1346' : '#ffffff')};

    width: 50%;

    .contact {
      padding: 0;

      align-self: flex-start;
      color: ${({ light }) => (light ? '#2f1346' : '#ffffff')};

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
