import styled from 'styled-components'

interface Props {
  active: boolean
}

export const Container = styled.div<Props>`
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.5s;

  .background {
    position: relative;

    width: 180px;
    height: 260px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;

    padding: 10px;

    color: black;

    pointer-events: ${({ active }) => (active ? 'all' : 'none')};

    display: flex;
    flex-direction: column;

    text-decoration: none;
    text-transform: capitalize;

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

    .in {
      position: absolute;
      width: 25px;
      height: 25px;
      bottom: 5px;
      right: 5px;
    }

    .text {
      display: flex;
      flex-direction: column;

      .name {
        font-size: 1.1rem;
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
  }

  @media (max-width: 1440px) {
    .background {
      width: 140px;
      height: 250px;

      .frame {
        width: 120px;
        height: 120px;
      }

      .text {
        .name {
          font-size: 1.1rem;
        }

        .job {
          font-size: 1rem;
        }
      }
    }
  }

  @media (max-width: 1080px) {
    .background {
      width: 90px;
      height: 180px;
      padding: 5px;

      .frame {
        width: 80px;
        height: 80px;
      }

      .in {
        width: 15px;
        height: 15px;
      }

      .text {
        .name {
          font-size: 1rem;
        }

        .job {
          font-size: 0.8rem;
        }
      }
    }
  }

  @media (max-width: 720px) {
    .background {
      width: 80px;
      height: 150px;
      padding: 5px;

      .frame {
        width: 70px;
        height: 70px;
      }

      .text {
        .name {
          font-size: 0.9rem;
        }

        .job {
          font-size: 0.7rem;
        }
      }
    }
  }

  @media (orientation: portrait) {
    .background {
      width: 90px;
      height: 175px;
      padding: 5px;

      .frame {
        width: 80px;
        height: 80px;
      }

      .text {
        .name {
          font-size: 1rem;
        }

        .job {
          font-size: 0.8rem;
        }
      }
    }
  }
`
