// src/components/CharacterGallery.jsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCharacters,
  clearCharacters,
} from "../features/characters/characterSlice";
import Character from "./Character";
import SearchBar from "./SearchBar";
import LoadMoreButton from "./LoadMoreButton";

const CharacterGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(30);
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.characters);
  const totalCharacters = useSelector((state) => state.characters.total);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  const initialFetch = useRef(true);

  useEffect(() => {
    if (initialFetch.current) {
      dispatch(fetchCharacters({ limit: 30, offset: 0, searchTerm: "" }));
      initialFetch.current = false;
    }
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm !== "") {
      dispatch(clearCharacters());
      setVisibleCount(30);
      dispatch(fetchCharacters({ limit: 30, offset: 0, searchTerm }));
    } else {
      dispatch(clearCharacters());
      dispatch(fetchCharacters({ limit: 30, offset: 0, searchTerm: "" }));
    }
  }, [dispatch, searchTerm]);

  const handleLoadMore = () => {
    const currentLength = characters.length;
    if (currentLength < totalCharacters) {
      dispatch(
        fetchCharacters({ limit: 20, offset: currentLength, searchTerm })
      );
      setVisibleCount((prev) => prev + 20);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Marvel Characters</h1>
      <SearchBar onSearch={handleSearch} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {characters.map((character) => (
          <Character
            key={`${character.id}-${character.modified}`}
            character={character}
          />
        ))}
      </div>
      <LoadMoreButton
        onLoadMore={handleLoadMore}
        isVisible={visibleCount < totalCharacters}
      />
    </div>
  );
};

export default CharacterGallery;
