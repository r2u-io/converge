import styled from 'styled-components'

interface Props {
  show: boolean
}

export const Container = styled.form<Props>`
  position: fixed;
  z-index: 3;
  left: 0;
  bottom: 0;

  width: 30vw;
  height: 100%;

  background-color: #d8d6d2;
  border: solid 1px black;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 50px;

  transition: transform 0.5s;
  transform: translateX(${(props) => (props.show ? '0' : '-30vw')});

  .title {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;

    gap: 10px;

    svg {
      width: 25px;
      height: 25px;
    }
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 10px;

    textarea,
    input[type='text'] {
      width: 100%;
      padding: 12px 20px;

      resize: none;
    }
  }

  #form-message {
    height: ;
  }

  button {
    background: none;
    outline: none;
    border: none;
    margin: 0;
    padding: 0;
  }

  .submit {
    background-color: #642c8e;
    color: white;
    border-radius: 30px;

    height: 50px;
    padding: 10px 25px;
    width: 200px;

    font-size: 1rem;
    font-weight: 900;

    &:disabled {
      cursor: not-allowed;
      background-color: #646464;
      color: black;
    }
  }
`
