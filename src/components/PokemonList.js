import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Title } from "../style/GlobleStyle";
import {ListWrapper} from '../style/StylePokemonList'
export default function PokemonList() {
  const [currentPageApi, setCurrentPageApi] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageApi, setNextPageApi] = useState("");
  const [prePageApi, setPrePageApi] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //fech the pokemon list from the api
  const fetchPokemons = async () => {
    try {
      console.log(errMsg);
      setIsLoading(true);
      setErrMsg("");
      const response = await axios.get(currentPageApi);
      const results = response.data.results;
      console.log(response.data);
      setNextPageApi(response.data.next);
      setPrePageApi(response.data.previous);
      if (results) {
        setPokemons(results);
        //caching api call in locakStorage
        sessionStorage.setItem("Pokemons", JSON.stringify(results));
      }
    } catch (err) {
      console.log(err);
      setErrMsg("Oops! Something went wrong");
    }
    setIsLoading(false);
  };

  const toNextPage = () => {
    setCurrentPageApi(nextPageApi);
  };
  const toPrePage = () => {
    setCurrentPageApi(prePageApi);
  };

  useEffect(() => {
    fetchPokemons();
  }, [currentPageApi]);

  // display a pokemon list
  const pokemonList = pokemons.map((pokemon) => {
    return (
      <li className="pokeCard" key={uuidv4()}>
        <Link className="cardText" to={`pokemons/${pokemon.name}`} state={{ item: { pokemon } }}>
          {pokemon.name}
        </Link>
      </li>
    );
  });

  return (
    <ListWrapper>
      <Title>Pokemons</Title>
      <div> {isLoading ? <Title>Loading...</Title> : <ul className="cardWrapper">{pokemonList}</ul>} </div>
      {errMsg && <Title>{errMsg}</Title>}
      <div className = "btnGroup">
        {prePageApi && <Button onClick={toPrePage}>Previous</Button>}
        {nextPageApi && <Button onClick={toNextPage}>Next</Button>}
      </div>
    </ListWrapper>
  );
}
