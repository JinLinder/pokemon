import styled, { createGlobalStyle } from "styled-components";
import { theme } from "./Theme";

export const Button = styled.button`
  background-color: ${theme.colors.darkRed};
  color: white;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  height: 3rem;
  min-width: 6rem;
  padding: 0 0.75rem;
  margin: 0 2rem;
  font-weight: 400;
  font-size: 1.2rem;

  :hover {
    transform: scale(1.05);
    color: ${theme.colors.darkRed};
    background-color: white;
    font-weight: 500;
  }
  
  @media ${theme.devices.mobileS} {
    font-weight: 300;
    font-size: 1rem;
    height: 2rem;
    min-width: 4rem;
  }

  @media ${theme.devices.mobileM} {
    font-weight: 300;
    font-size: 1.2rem;
    height: 3rem;
    min-width: 5rem;
  }
`;

export const Title = styled.h1`
  margin: 5rem;
  font-weight: 700;
  font-size: 2.5rem;
  text-align: center;

  @media ${theme.devices.tablet} {
    margin: 3rem;
    font-weight: 600;
    font-size: 2rem;
  }

  @media ${theme.devices.mobileM} {
    margin: 2rem;
    font-weight: 500;
    font-size: 1.5rem;
  }

  @media ${theme.devices.mobileS} {
    margin: 2rem;
    font-weight: 500;
    font-size: 1.5rem;
  }
`;

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${theme.colors.ligthYellow}
    }
`;
