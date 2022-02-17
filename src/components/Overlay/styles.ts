import styled, { createGlobalStyle } from 'styled-components'

interface GlobalProps {
  ready: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

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
      width: 100%;
    }

    br {
      margin: 25px;
    }

    .text {
      font-size: 1.2rem;
      width: 100%;
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

  @media (orientation: portrait) {
    & {
      flex-direction: row;

      section {
        width: 100vw;

        .content {
          padding: 50px 25px;
          margin: 0;
          height: 30%;
          width: 100vw;

          .title {
            font-size: 2rem;
          }

          br {
            margin: 10px;
          }

          .text {
            font-size: 1rem;
          }
        }
      }
    }
  }
`

export const GlobalStyle = createGlobalStyle<GlobalProps>`
  html {
    scroll-behavior: smooth;

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

  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 100vw;
  }

  @media (orientation: portrait) {
    html {
      overflow-y: hidden;
      overflow-x: ${(props) => (props.ready ? 'auto' : 'hidden')};
      height: 100vh;
    }

    body {
      overflow-y: hidden;
      scroll-behavior: smooth;
    }
  }
`
