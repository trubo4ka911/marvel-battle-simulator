// src/components/CharacterGallery.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../features/characters/characterSlice";
import Character from "./Character";

const CharacterGallery = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.characters);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCharacters({ limit: 30, offset: 0, searchTerm: "" }));
  }, [dispatch]);

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(fetchCharacters({ limit: 30, offset: 0, searchTerm }));
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Marvel Characters</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a character"
        />
        <button type="submit">Search</button>
      </form>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {characters.map((character) => (
          <Character
            key={`${character.id}-${character.name}`}
            character={character}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterGallery;
