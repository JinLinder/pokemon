import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Title } from "../style/GlobleStyle";
import { ListWrapper } from "../style/StylePokemonList";
import { useQuery } from "@tanstack/react-query";

export default function PokemonList() {
  const [currentPageApi, setCurrentPageApi] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageApi, setNextPageApi] = useState("");
  const [prePageApi, setPrePageApi] = useState("");

  //fetch function to fetch the data
  const fetch = async () => {
    const response = await axios.get(currentPageApi);
    const results = response.data.results;
    setNextPageApi(response.data.next);
    setPrePageApi(response.data.previous);
    return results;
  };

  // useQuery from Tan Stack Query to fetch data and handle cache
  const { data, isLoading, isError } = useQuery({
    queryKey: [{ currentPageApi }],
    queryFn: fetch,
  });

  const pokemons = data ?? [];

  // handle event from the next and previous button
  const toNextPage = () => {
    setCurrentPageApi(nextPageApi);
  };

  const toPrePage = () => {
    setCurrentPageApi(prePageApi);
  };

  // display a pokemon list
  const pokemonList = pokemons.map((pokemon) => {
    return (
      <li className="pokeCard" key={uuidv4()}>
        <Link
          className="cardText"
          to={`pokemons/${pokemon.name}`}
          state={{ item: { pokemon } }}
        >
          {pokemon.name}
        </Link>
      </li>
    );
  });

  return (
    <ListWrapper>
      <Title>Pokemons</Title>
      <div>
        {isLoading ? (
          <Title>Loading...</Title>
        ) : isError ? (
          <Title>Opps Something went wrong...</Title>
        ) : (
          <ul className="cardWrapper">{pokemonList}</ul>
        )}
      </div>
      <div className="btnGroup">
        {prePageApi && <Button onClick={toPrePage}>Previous</Button>}
        {nextPageApi && <Button onClick={toNextPage}>Next</Button>}
      </div>
    </ListWrapper>
  );
}
