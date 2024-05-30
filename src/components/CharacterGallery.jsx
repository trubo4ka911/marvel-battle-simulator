// src/components/CharacterGallery.jsx
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCharacters,
  clearCharacters,
} from "../features/characters/characterSlice";
import Character from "./Character";

const CharacterGallery = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.characters);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  const [searchTerm, setSearchTerm] = useState("");
  const initialFetch = useRef(true);

  useEffect(() => {
    if (initialFetch.current) {
      dispatch(fetchCharacters({ limit: 30, offset: 0, searchTerm: "" }));
      initialFetch.current = false;
    }
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(clearCharacters());
      dispatch(fetchCharacters({ limit: 30, offset: 0, searchTerm }));
    }
  }, [dispatch, searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
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
            key={`${character.id}-${character.modified}`}
            character={character}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterGallery;
