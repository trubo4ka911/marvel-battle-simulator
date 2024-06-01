// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "./features/characters/characterSlice";
import Navigation from "./components/Navigation";
import CharacterGallery from "./components/CharacterGallery";
import CharacterDetails from "./components/CharacterDetails";
import BattleArena from "./components/BattleArena";
import AddHero from "./components/AddHeroForm";
import About from "./components/About";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharacters({ limit: 30, offset: 0, searchTerm: "" }));
  }, [dispatch]);

  const characters = useSelector((state) => state.characters.characters);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<CharacterGallery />} />
        <Route path="/character/:characterId" element={<CharacterDetails />} />
        <Route
          path="/battle-arena"
          element={<BattleArena characters={characters} />}
        />
        <Route path="/add-hero" element={<AddHero />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
