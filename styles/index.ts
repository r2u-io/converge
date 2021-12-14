import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  width: 100%;

  /* padding-left: 120px;
  padding-right: 120px;

  @media only screen and (max-width: 1280px) {
    padding-left: 80px;
    padding-right: 80px;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media only screen and (max-width: 600px) {
    padding-left: unset;
    padding-right: unset;
  } */

  height: 100vh;
  background-image: url(../images/background.svg);
  background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  background-size: cover;
`

export const Content = styled.div`
  width: 1200px;
  margin: auto;
  @media only screen and (max-width: 600px) {
    width: unset;
    margin: unset;
  }
`

export const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
