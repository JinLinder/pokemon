import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Title } from "../style/GlobleStyle";

export default function PokemonDetails() {
  const location = useLocation();
  const { item } = location.state;
  const [API, setAPI] = useState(item.pokemon.url);
  const [picLoading, setPicLoading] = useState(true);
  const [pokemon, setPokemon] = useState({
    img: "",
    species: "",
    weigth: "",
    height: "",
    attack: "",
    defense: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //fetch a specific pokemon
  const fetchPokemon = async () => {
    try {
      setIsLoading(true);
      setErrMsg("");
      const response = await axios.get(API);
      //if user calls it multiple times in a roll before the request has finished
      const result = response.data;
      console.log(result);
      sessionStorage.setItem(item.pokemon.name, JSON.stringify(result));
      setPokemon({
        img: result.sprites.front_default,
        species: result.species.name,
        weight: result.weight,
        height: result.height,
        attack: result.stats[1].base_stat,
        defense: result.stats[2].base_stat,
        hp: result.stats[0].base_stat,
        type: result.types[0].type.name,
      });
    } catch (err) {
      console.log(err);
      setErrMsg("Oops! Something went wrong");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPokemon();
  }, [API]);

  // display pokemon
  const pokemonDisplay = () => {
    return (
      <>
        <p style={picLoading ? {} : { display: "none" }}>
          Loading the picture...
        </p>

        <img
          style={picLoading ? { display: "none" } : {}}
          src={pokemon.img}
          alt="This is how pokemon look like."
          loading="eager"
          onLoad={() => {
            console.log("finished loading");
            setPicLoading(false);
          }}
        />
        {/* )} */}
        <p>species: {pokemon.species}</p>
        <p>weight: {pokemon.weight}</p>
        <p>Hejght: {pokemon.height}</p>
        <p>Attack: {pokemon.attack}</p>
        <p>Defense: {pokemon.defense}</p>
        <p>Hit points: {pokemon.hp}</p>
        <p>Type: {pokemon.type}</p>
      </>
    );
  };

  return (
    <div>
      <Title>{item.pokemon.name}</Title>
      <div>{isLoading ? <p>Loading...</p> : pokemonDisplay()}</div>
      {errMsg ? <p>{errMsg}</p> : null}
    </div>
  );
}
