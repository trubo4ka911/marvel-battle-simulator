// src/components/BattleArena.jsx
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { resetBattle, setResults } from "../features/battle/battleSlice";
import {
  fetchCharacters,
  clearCharacters,
} from "../features/characters/characterSlice";
import { simulateBattle } from "../utils/battleLogic";
import Character from "./Character";
import SearchBar from "./SearchBar";
import LoadMoreButton from "./LoadMoreButton";
import "../styles/battleArena.scss";

const BattleArena = ({ characters = [] }) => {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [visibleCount, setVisibleCount] = useState(30);
  const [searchTerm, setSearchTerm] = useState("");
  const loadIncrement = 20;
  const totalCharacters = useSelector((state) => state.characters.total);
  const dispatch = useDispatch();
  const results = useSelector((state) => state.battle.results);
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

  const handleSelectCharacter = (character) => {
    setSelectedCharacters((prev) =>
      prev.includes(character)
        ? prev.filter((c) => c !== character)
        : [...prev, character].slice(-2)
    );
  };

  const handleLoadMore = () => {
    const currentLength = characters.length;
    if (currentLength < totalCharacters) {
      dispatch(
        fetchCharacters({
          limit: loadIncrement,
          offset: currentLength,
          searchTerm,
        })
      );
      setVisibleCount((prev) => prev + loadIncrement);
    }
  };

  const handleBattle = () => {
    if (selectedCharacters.length === 2) {
      const winner = simulateBattle(
        selectedCharacters[0],
        selectedCharacters[1]
      );
      dispatch(setResults(winner));
    }
  };

  const handleReset = () => {
    setSelectedCharacters([]);
    dispatch(resetBattle());
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="battle-arena">
      <h2>Battle Arena</h2>
      {results && (
        <div>
          <h3>Winner: {results.name}</h3>
          <button onClick={handleReset}>Reset Battle</button>
        </div>
      )}
      <h2>Select two characters to battle</h2>
      <SearchBar onSearch={handleSearch} />
      <div className="character-list">
        {characters.slice(0, visibleCount).map((character) => (
          <button
            key={`${character.id}-${character.modified}`} // Ensure unique key by combining id and modified date
            className={`character-button ${
              selectedCharacters.includes(character) ? "selected" : ""
            }`}
            onClick={() => handleSelectCharacter(character)}
            disabled={
              selectedCharacters.length >= 2 &&
              !selectedCharacters.includes(character)
            }
          >
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
            />
            {character.name}
          </button>
        ))}
      </div>
      <LoadMoreButton
        onLoadMore={handleLoadMore}
        isVisible={visibleCount < totalCharacters}
      />
      <button onClick={handleBattle} disabled={selectedCharacters.length !== 2}>
        Battle!
      </button>
    </div>
  );
};

BattleArena.propTypes = {
  characters: PropTypes.array,
};

export default BattleArena;
