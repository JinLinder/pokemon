import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import axios from "axios";

export default function PokemonList() {
  const [API, setAPI] = useState("https://pokeapi.co/api/v2/pokemon");
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //fech the pokemon list from the api
  const fetchPokemons = async () => {
    try {
      console.log(errMsg);
      setIsLoading(true);
      setErrMsg("");
      const response = await axios.get(API);
      const results = response.data.results;
      console.log(results);
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

  useEffect(() => {
    fetchPokemons();
  }, [API]);

  // display a pokemon list
  const pokemonList = pokemons.map((pokemon) => {
    return (
      <li key={uuidv4()}>
        <Link to={`pokemons/${pokemon.name}`} state={{ item: { pokemon } }}>
          {pokemon.name}
        </Link>
      </li>
    );
  });

  return (
    <div>
      <h1>PokemonList</h1>
      <ul> {isLoading ? <p>Loading...</p> : pokemonList} </ul>
      {errMsg ? <p>{errMsg}</p> : null}
    </div>
  );
}
