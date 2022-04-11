import styled from 'styled-components'

interface Props {
  opacity: number
}

export const Button = styled.button<Props>`
  margin: 0;
  padding: 0;

  position: absolute;

  width: 100%;
  height: 100%;

  border-radius: 20px 0 20px 20px;

  background-color: #e6e2e2;

  border: none;
  outline: none;

  position: absolute;
  z-index: 2;

  opacity: ${({ opacity }) => opacity};
  transition: opacity 500ms;

  display: flex;
  align-items: center;
  justify-content: center;

  .corner {
    position: absolute;
    top: 0;
    right: 0;
    border-width: 0 100px 100px 0;
    border-style: solid;
    border-color: #2f1346 #2f1346 #888888 #888888;
    border-radius: 0 0 0 20px;
    background: #888888;
    width: 0;
  }
`
