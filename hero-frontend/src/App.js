import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "./features/characters/characterSlice";
import Navigation from "./components/Navigation";
import CharacterGallery from "./components/CharacterGallery";
import CharacterDetails from "./components/CharacterDetails";
import BattleArena from "./components/BattleArena";
import AddHeroForm from "./components/AddHeroForm";
import About from "./components/About";
import HeroesList from "./components/HeroesList";
import UserProfile from "./components/UserProfile";
import "./styles/_main.scss";

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
        <Route path="/add-hero" element={<AddHeroForm />} />
        <Route path="/heroes" element={<HeroesList />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
