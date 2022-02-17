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
    height: 285px;
    background-color: #2e2a26;
    border-radius: 10px;

    padding: 10px;

    color: white;

    pointer-events: ${({ active }) => (active ? 'all' : 'none')};

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    text-decoration: none;
    text-transform: capitalize;
    text-align: center;

    .frame {
      width: 160px;
      height: 160px;

      border: solid 2px white;
      border-radius: 15px;
      background-color: #211e30;
    }

    .in {
      width: 25px;
      height: 25px;
      margin-top: auto;
      align-self: end;
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
