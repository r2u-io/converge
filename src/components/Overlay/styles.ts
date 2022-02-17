import styled, { createGlobalStyle } from 'styled-components'

interface GlobalProps {
  ready: boolean
}

export const Container = styled.div`
  * {
    box-sizing: border-box;
  }

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  pointer-events: none;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content auto max-content;
`

export const GlobalStyle = createGlobalStyle<GlobalProps>`
  html {
    overflow-x: hidden;
    overflow-y: ${(props) => (props.ready ? 'auto' : 'hidden')};
    
    scrollbar-color: #d71488 #18131b;

    ::-webkit-scrollbar {
      width: 8px;
      margin: 5px;
    }
    ::-webkit-scrollbar-track {
      background: #18131b;  
    }
    ::-webkit-scrollbar-thumb {
      background: #d71488;
      border-radius: 10px;
      margin: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #aa106d;
    }
  }
  
  body {
    background-color: #D8D6D2;
  }

  section {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: #642c8e;

    z-index: 0;

    .content {
      z-index: 2;

      margin: 200px 50px;

      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      text-align: left;

      span {
        width: 100%;
      }
    }

    .title {
      font-size: 2.5rem;
    }

    br {
      margin: 25px;
    }

    .text {
      font-size: 1.2rem;
    }

    .more {
      background: none;
      outline: none;

      color: #642c8e;
      border: solid 1px #642c8e;
      border-radius: 30px;

      height: 50px;
      padding: 10px 25px;

      font-size: 1rem;
      font-weight: 900;

      &.white {
        color: white;
        border: solid 1px white;
      }
    }
  }
`
