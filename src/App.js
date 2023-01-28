import "./App.css";
import PokemonList from "./components/PokemonList";
import PokeDetails from "./components/PokemonDetails";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {theme} from './style/Theme'
import {GlobalStyles} from './style/GlobleStyle'
function App() {
  return (
    <ThemeProvider theme = {theme}>
      <div className="App">
        <GlobalStyles/>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemons/:name" element={<PokeDetails />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
