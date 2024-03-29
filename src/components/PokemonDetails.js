import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Title, TextNormal, Button } from "../style/GlobleStyle";
import { DisplayWrapper } from "../style/StylePokemonDetails";

export default function PokemonDetails() {
  const location = useLocation();
  const navigate = useNavigate();
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

  //handle close button, to the list/home page
  const close = () => {
    navigate("/");
  };

  //fetch a specific pokemon
  const fetchPokemon = async () => {
    try {
      setIsLoading(true);
      setErrMsg("");

      //check cache
      let storage = JSON.parse(sessionStorage.getItem(item.pokemon.name));
      if (storage) {
        setPokemon({
          img: storage.sprites.other.dream_world.front_default,
          species: storage.species.name,
          weight: storage.weight,
          height: storage.height,
          attack: storage.stats[1].base_stat,
          defense: storage.stats[2].base_stat,
          hp: storage.stats[0].base_stat,
          type: storage.types[0].type.name,
        });
      } else {
        const response = await axios.get(API);
        const result = response.data;
        //cache api call in sessionStorage
        sessionStorage.setItem(item.pokemon.name, JSON.stringify(result));

        setPokemon({
          img: result.sprites.other.dream_world.front_default,
          species: result.species.name,
          weight: result.weight,
          height: result.height,
          attack: result.stats[1].base_stat,
          defense: result.stats[2].base_stat,
          hp: result.stats[0].base_stat,
          type: result.types[0].type.name,
        });
      }
    } catch (err) {
      // console.log(err);
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
      <div className="pokemonInfo">
        <TextNormal style={picLoading ? {} : { display: "none" }}>
          Loading ...
        </TextNormal>

        <img
          className="img"
          style={picLoading ? { display: "none" } : {}}
          src={pokemon.img}
          alt="This is how pokemon look like."
          onLoad={() => setPicLoading(false)}
        />
        <TextNormal>
          <strong>Species:</strong> {pokemon.species}{" "}
        </TextNormal>
        <TextNormal>
          <strong>Weight:</strong> {pokemon.weight};<strong> Height: </strong>
          {pokemon.height}
        </TextNormal>
        <TextNormal>
          <strong>Attack:</strong> {pokemon.attack}
        </TextNormal>
        <TextNormal>
          <strong>Defense:</strong> {pokemon.defense}
        </TextNormal>
        <TextNormal>
          <strong>Hit points:</strong> {pokemon.hp}
        </TextNormal>
        <TextNormal>
          <strong>Type:</strong> {pokemon.type}
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
      ) : errMsg ? (
        <Title>{errMsg}</Title>
      ) : (
        pokemonDisplay()
      )}
    </DisplayWrapper>
  );
}
