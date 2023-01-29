import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Title, TextNormal, Button } from "../style/GlobleStyle";
import { DisplayWrapper } from "../style/StylePokemonDetails";
import { useQuery } from "@tanstack/react-query";

export default function PokemonDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state;
  const [API, setAPI] = useState(item.pokemon.url);
  const [picLoading, setPicLoading] = useState(true);

  //handle close button-to the list/home page
  const close = () => {
    navigate("/");
  };

  //fetch function to fetch the data
  const fetch = async () => {
    const response = await axios.get(API);
    const result = response.data;
    return result;
  };

  // useQuery from Tan Stack Query to fetch data and handle cache
  const { data, isLoading, isError } = useQuery({
    queryKey: [{ API }],
    queryFn: fetch,
  });

  const pokemon = data ?? [];

  // display pokemon
  const pokemonDisplay = () => {
    return (
      <div className="pokemonInfo">
        <TextNormal style={picLoading ? {} : { display: "none" }}>
          Loading ...
        </TextNormal>
        <img
          className="img"
          style={picLoading ? { display: "none" } : {}}
          src={pokemon.sprites.other.dream_world.front_default}
          alt={item.pokemon.name}
          onLoad={() => setPicLoading(false)}
        />

        <TextNormal>
          <strong>Species:</strong> {pokemon.species.name}{" "}
        </TextNormal>
        <TextNormal>
          <strong>Weight:</strong> {pokemon.weight};<strong> Height: </strong>
          {pokemon.height}
        </TextNormal>
        <TextNormal>
          <strong>Attack:</strong> {pokemon.stats[1].base_stat}
        </TextNormal>
        <TextNormal>
          <strong>Defense:</strong> {pokemon.stats[2].base_stat}
        </TextNormal>
        <TextNormal>
          <strong>Hit points:</strong> {pokemon.stats[0].base_stat}
        </TextNormal>
        <TextNormal>
          <strong>Type:</strong> {pokemon.types[0].type.name}
        </TextNormal>
        <Button className="closeButton" onClick={close}>
          Back to the List
        </Button>
      </div>
    );
  };

  return (
    <DisplayWrapper>
      <Title>{item.pokemon.name}</Title>
      {isLoading ? (
        <Title>Loading...</Title>
      ) : isError ? (
        <Title>Opps Something went wrong...</Title>
      ) : (
        pokemonDisplay()
      )}
    </DisplayWrapper>
  );
}
