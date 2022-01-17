import styled from 'styled-components'

interface Props {
  active: boolean
}

export const Container = styled.div<Props>`
  position: absolute;
  z-index: 0;

  position: absolute;
  top: calc(50% - 140px);
  left: calc(50% - 125px);

  transform-origin: center;

  display: ${({ active }) => (active ? 'block' : 'none')};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.5s;

  .background {
    width: 250px;
    height: 350px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;

    padding: 25px;

    color: black;

    pointer-events: all;

    display: flex;
    flex-direction: column;

    text-decoration: none;
    text-transform: capitalize;

    .name {
      font-size: 1.8rem;
      font-weight: bold;
    }

    .job {
      font-size: 1.2rem;
    }

    .frame {
      width: 200px;
      height: 200px;

      border: solid 4px #54439b;
      background: radial-gradient(
        50.25% 50.25% at 50.02% 49.98%,
        rgba(91, 82, 163, 0) 42.91%,
        rgba(91, 82, 163, 0.6) 100%
      );
    }
  }
`
