import styled from 'styled-components'

export const Container = styled.div`
  background: linear-gradient(
    0deg,
    rgba(216, 214, 210, 1) 0%,
    rgba(100, 44, 142, 1) 20%,
    rgba(100, 44, 142, 1) 80%,
    rgba(216, 214, 210, 1) 100%
  );
  background-size: contain;
  background-repeat: round;

  .content {
    color: white;
  }

  @media (orientation: portrait) {
    & {
      background: linear-gradient(
        180deg,
        rgba(216, 214, 210, 1) 0%,
        rgba(100, 44, 142, 1) 20%,
        rgba(100, 44, 142, 1) 80%
      );
    }
  }
`
