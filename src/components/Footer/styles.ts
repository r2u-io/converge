import styled from 'styled-components'

export const Container = styled.div`
  padding: 40px 50px 50px 50px;
  width: 100%;

  position: relative;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #18131b;
  border-top: solid 1px #642c8e;

  .menu {
    display: flex;
    align-items: center;
    justify-content: center;

    color: white;

    a {
      text-decoration: none;
    }

    button {
      cursor: pointer;
      pointer-events: all;
      outline: none;
      border: none;
      background: none;

      color: white;

      font-size: 1.2rem;

      text-align: center;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    .top {
      border-radius: 30px;
      color: white;
      border: solid 1px white;

      padding: 5px 10px;

      margin-right: 20px;

      font-size: 1rem;
      font-weight: 900;
    }
  }
`
