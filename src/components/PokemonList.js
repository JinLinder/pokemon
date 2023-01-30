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
  const [search, setSearch] = useState("");

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

  let pokemons = data ?? [];

  // handle search
  if (search) {
    pokemons = pokemons.filter((pokemon) => {
      return pokemon.name.includes(search.toLocaleLowerCase());
    });
  }

  // handle button events
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
        <input
          className="searchBox" placeholder="Choose your pokemon :)" onChange={(e) => setSearch(e.target.value)}
        />
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
