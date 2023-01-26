import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

export default function PokemonList() {
  const [API, setAPI] = useState("https://pokeapi.co/api/v2/pokemon");
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setPokemons(data.results);
      });
  }, [API]);

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
      <ul> {pokemonList}</ul>
    </div>
  );
}
