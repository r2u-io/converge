import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  pointer-events: all;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: black;
  color: white;

  &.loaded {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    transition-delay: 0.5s;
  }

  img {
    position: fixed;
    opacity: 0;
  }
`
