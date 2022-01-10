import styled from 'styled-components'

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
  color: black;

  pointer-events: none;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  .map {
    position: absolute;

    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hidden {
    display: none;
  }

  .background {
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
  }

  .fullscreen {
    pointer-events: all;
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 60px;
    height: 60px;
    border: none;
    outline: none;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #54439b;
  }
`
