import "./App.css";
import PokemonList from "./components/PokemonList";
import PokeDetails from "./components/PokemonDetails";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemons/:name" element={<PokeDetails />} />
      </Routes>
    </div>
  );
}

export default App;
