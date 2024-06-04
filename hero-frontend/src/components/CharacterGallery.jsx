import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCharacters,
  clearCharacters,
} from "../features/characters/characterSlice";
import Character from "./Character";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner";

const CharacterGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(30);
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.characters);
  const status = useSelector((state) => state.characters.status);
  const totalCharacters = useSelector((state) => state.characters.total);
  const error = useSelector((state) => state.characters.error);
  const initialFetch = useRef(true);

  useEffect(() => {
    if (initialFetch.current) {
      dispatch(fetchCharacters({ limit: 30, offset: 0, searchTerm: "" }));
      initialFetch.current = false;
    }
  }, [dispatch]);

  useEffect(() => {
    if (initialFetch.current === false) {
      dispatch(fetchCharacters({ limit: 30, offset: 0, searchTerm: "" }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(clearCharacters());
      setVisibleCount(30);
      dispatch(fetchCharacters({ limit: 30, offset: 0, searchTerm }));
    }
  }, [dispatch, searchTerm]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleLoadMore = () => {
    const currentLength = characters.length;
    if (currentLength < totalCharacters) {
      dispatch(
        fetchCharacters({
          limit: 30,
          offset: currentLength,
          searchTerm,
        })
      );
      setVisibleCount((prev) => prev + 30);
    }
  };

  return (
    <div className="character-gallery">
      {status === "loading" && <Spinner />}
      <h1>Marvel Characters</h1>
      <div className="search-bar">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="character-list">
        {characters.map((character) => (
          <div
            className="character-card"
            key={`${character.id}-${character.modified}`}
          >
            <Character character={character} />
          </div>
        ))}
      </div>
      {visibleCount < totalCharacters && (
        <div className="load-more">
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterGallery;
