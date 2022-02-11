import styled from 'styled-components'

export const Container = styled.section`
  background: url('/images/section_3.png');
  background-size: contain;
  background-repeat: round;

  .content {
    color: white;

    margin: 100px;

    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    text-align: left;

    span {
      width: 100%;
    }
  }
`
