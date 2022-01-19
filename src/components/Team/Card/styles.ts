import styled from 'styled-components'

interface Props {
  active: boolean
}

export const Container = styled.div<Props>`
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.5s;

  .background {
    width: 190px;
    height: 265px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;

    padding: 15px;

    color: black;

    pointer-events: ${({ active }) => (active ? 'all' : 'none')};

    display: flex;
    flex-direction: column;

    text-decoration: none;
    text-transform: capitalize;

    .text {
      display: flex;
      flex-direction: column;

      .name {
        font-size: 1.2rem;
        font-weight: bold;
      }

      .job {
        font-size: 1rem;
      }
    }

    &:hover {
      .text {
        display: flex;
        flex-direction: column;
      }
    }

    .frame {
      width: 160px;
      height: 160px;

      border: solid 4px #54439b;
      background: radial-gradient(
        50.25% 50.25% at 50.02% 49.98%,
        rgba(91, 82, 163, 0) 42.91%,
        rgba(91, 82, 163, 0.6) 100%
      );
    }
  }
`
