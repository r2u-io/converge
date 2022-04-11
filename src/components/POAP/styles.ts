import styled, { createGlobalStyle } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`
export const GlobalStyleDark = createGlobalStyle`
  body, html {
    background-color: #2f1346;

    overflow-x: hidden;
  }
`
