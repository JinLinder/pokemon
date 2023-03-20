import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Title } from "../style/GlobleStyle";
import { ListWrapper } from "../style/StylePokemonList";

export default function PokemonList() {
  const [currentPageApi, setCurrentPageApi] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageApi, setNextPageApi] = useState("");
  const [prePageApi, setPrePageApi] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [pokeOutPut, setPokeOutPut] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [search, setSearch] = useState("");

  //fech the pokemon list from the api
  const fetchPokemons = async () => {
    try {
      setIsLoading(true);
      setErrMsg("");
      //check cache
      let storage = sessionStorage.getItem(currentPageApi)
      if (storage) {

        setNextPageApi(JSON.parse(storage).next);
        setPrePageApi(JSON.parse(storage).previous);
        setPokemons(JSON.parse(storage).results);
        setPokeOutPut(JSON.parse(storage).results);

      } else {
        const response = await axios.get(currentPageApi);
        const results = response.data.results;
        console.log('fetch' + response.data.next)
        setNextPageApi(response.data.next);
        setPrePageApi(response.data.previous);

        if (results) {
          setPokemons(results);
          setPokeOutPut(results);
          //cache api call in sessionStorage
          sessionStorage.setItem(currentPageApi, JSON.stringify(response.data));
        }
      }
    } catch (err) {
      // console.log(err);
      setErrMsg("Oops! Something went wrong");
    }
    setIsLoading(false);
  };

  // handle next and previous button events
  const toNextPage = () => {
    setCurrentPageApi(nextPageApi);
  };

  const toPrePage = () => {
    setCurrentPageApi(prePageApi);
  };

  // fetch new pokemons connect to the next and previous button
  useEffect(() => {
    fetchPokemons();
  }, [currentPageApi]);

  // filter function
  useEffect(() => {
    setPokeOutPut(
      pokemons.filter((pokemon) => {
        return pokemon.name.includes(search.toLocaleLowerCase());
      })
    );
  }, [search, pokemons]);

  // display a pokemon list
  const pokemonList = pokeOutPut.map((pokemon) => {
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
          className="searchBox"
          placeholder="Choose your pokemon :)"
          onChange={(e) => setSearch(e.target.value)}
        />
        {isLoading ? (
          <Title>Loading...</Title>
        ) : errMsg ? (
          <Title>{errMsg}</Title>
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
