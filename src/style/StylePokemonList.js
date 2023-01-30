import styled from "styled-components";
import { theme } from "./Theme";

export const ListWrapper = styled.div`
  .cardWrapper {
    margin: 3rem;
    padding: 3rem 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12.5rem, 0.5fr));
    grid-gap: 2rem;

    @media ${theme.devices.mobileS} {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 1rem;
      padding: 1rem;
    }

    @media ${theme.devices.mobileM} {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 1rem;
      padding: 1rem;
    }
  }

  .searchBox {
    margin: auto;
    display: block;
    padding: 1rem;
    border-radius: 0.5rem;
    border: none;
    width: 30%;
    :focus{
      outline: none !important;
      border:1px solid ${theme.colors.yellow};
      box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.3)
    }
  }
  
  .pokeCard {
    list-style: none;
    background-color: ${theme.colors.lightRed};
    border-radius: 1rem;
    box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: row;
    justify-content: center;

    :hover {
      transform: scale(1.05);
      background-color: ${theme.colors.darkRed};
    }

    @media ${theme.devices.mobileS} {
      width: 50%;
      max-width: 6rem;
      box-shadow: 0 0.125rem 0.125rem rgba(0, 0, 0, 0.5);
    }

    @media ${theme.devices.mobileM} {
      width: 50%;
      min-width: 8rem;
      box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.5);
    }
  }

  .cardText {
    font-weight: 400;
    font-size: 1.2rem;
    text-decoration: none;
    color: white;
    text-align: center;
    padding: 1.5rem 2.5rem;

    @media ${theme.devices.mobileS} {
      padding: 1rem 1.5rem;
      font-weight: 300;
      font-size: 1rem;
    }
  }

  .btnGroup {
    padding: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;
