// src/components/CharacterGallery.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../features/characters/characterSlice";
import Character from "./Character";

const CharacterGallery = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.characters);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Marvel Characters</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {characters.map((character) => (
          <Character key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default CharacterGallery;
