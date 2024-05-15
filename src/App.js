// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterGallery from "./components/CharacterGallery";
import BattleArena from "./components/BattleArena";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterGallery />} />
        <Route path="/battle" element={<BattleArena />} />
      </Routes>
    </Router>
  );
}

export default App;
