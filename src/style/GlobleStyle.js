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
  margin: 0.5rem 2rem;
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
    font-size: 0.6rem;
    height: 1.5rem;
    min-width: 4rem;
  }

  @media ${theme.devices.mobileM} {
    font-weight: 300;
    font-size: 0.8rem;
    height: 2.5rem;
    min-width: 5rem;
  }
`;

export const Title = styled.h1`
  margin: 5rem;
  font-weight: 700;
  font-size: 3rem;
  text-align: center;
  color: ${theme.colors.darkRed};

  @media ${theme.devices.tablet} {
    margin: 3rem;
    font-weight: 600;
    font-size: 2.5rem;
  }

  @media ${theme.devices.mobileM} {
    margin: 2rem;
    font-weight: 500;
    font-size: 2rem;
  }

  @media ${theme.devices.mobileS} {
    margin: 2rem;
    font-weight: 500;
    font-size: 1.5rem;
  }
`;

export const TextNormal = styled.p`
  font-weight: 400;
  font-size: 1.2rem;
  margin: 1rem 0;

  @media ${theme.devices.tablet} {
    font-weight: 400;
    font-size: 1rem;
    margin: 1rem 0;
  }

  @media ${theme.devices.mobileM} {
    font-weight: 400;
    font-size: 0.8rem;
    margin: 0.8rem 0;
  }

  @media ${theme.devices.mobileS} {
    font-weight: 300;
    font-size: 0.6rem;
    margin: 0.5rem 0;
  }
`;
export const GlobalStyles = createGlobalStyle`
    body {
        background: ${theme.colors.ligthYellow}
    }
`;
