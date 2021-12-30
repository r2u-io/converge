import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: black;

  pointer-events: none;

  width: 100%;
  height: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 10%;
  width: 100%;

  .map {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    cursor: pointer;
    justify-content: center;
    margin-left: 12px;
    margin-right: 12px;
    pointer-events: all;
    display: flex;
    padding: 12px 64px;
    width: 203px;
    background: #003e58;
    border-radius: 8px;
    color: white;
  }
`;
