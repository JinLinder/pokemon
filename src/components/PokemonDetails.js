import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PokemonDetails() {
  const location = useLocation();
  const { item } = location.state;
  const [API, setAPI] = useState(item.pokemon.url);
  const [pokemon, setPokemon] = useState({
    img: "",
    species: "",
    weigth: "",
    height: "",
    attack: "",
    defense: "",
    type: "",
  });

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPokemon({
          img: data.sprites.front_default,
          species: data.species.name,
          weight: data.weight,
          height: data.height,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          hp: data.stats[0].base_stat,
          type: data.types[0].type.name,
        });
      });
  }, [API]);

  useEffect(() => {
    console.log(item);
    console.log(API);
  }, []);
  return (
    <div>
      <h1>{item.pokemon.name}</h1>
      <img src={pokemon.img} alt="This is how pokemon look like." />
      <p>species: {pokemon.species}</p>
      <p>weight: {pokemon.weight}</p>
      <p>Hejght: {pokemon.height}</p>
      <p>Attack: {pokemon.attack}</p>
      <p>Defense: {pokemon.defense}</p>
      <p>Hit points: {pokemon.hp}</p>
      <p>Type: {pokemon.type}</p>
    </div>
  );
}
