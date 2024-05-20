import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "./features/characters/characterSlice";
import CharacterGallery from "./components/CharacterGallery";
import CharacterDetails from "./components/CharacterDetails";
import BattleArena from "./components/BattleArena";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const characters = useSelector((state) => state.characters.characters);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterGallery />} />
        <Route path="/character/:characterId" element={<CharacterDetails />} />
        <Route
          path="/battle-arena"
          element={<BattleArena characters={characters} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
