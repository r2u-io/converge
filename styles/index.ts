import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;

  padding-left: 120px;
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
  }
`;

export const Content = styled.section`
  width: 1200px;
  margin: auto;
  @media only screen and (max-width: 600px) {
    width: unset;
    margin: unset;
  }
`;
