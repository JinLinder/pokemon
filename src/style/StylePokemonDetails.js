import styled from "styled-components";
import { theme } from "./Theme";

export const DisplayWrapper = styled.div`
  color: ${theme.colors.darkRed};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .pokemonInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    border-radius: 1rem;
    padding: 1rem 8rem 2rem;
    margin-bottom: 3rem;
    box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.5);

    @media ${theme.devices.mobileM} {
      padding: 1rem 4rem 2rem;
    }

    @media ${theme.devices.mobileS} {
      padding: 1rem 3rem 2rem;
    }
  }

  .img {
    margin: 0 0 1.5rem 0rem;
    max-width: 50%;
    height: auto;

    @media ${theme.devices.mobileM} {
      max-width: 6rem;
      height: auto;
    }

    @media ${theme.devices.mobileS} {
      max-width: 5rem;
      height: auto;
    }
  }

  .closeButton {
    :hover {
      transform: scale(1.02);
      color: white;
      background-color: ${theme.colors.darkRed};
    }
  }
`;
