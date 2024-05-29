// src/components/BattleArena.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { resetBattle, setResults } from "../features/battle/battleSlice";
import { fetchCharacters } from "../features/characters/characterSlice";
import { simulateBattle } from "../utils/battleLogic";
import Character from "./Character";
import "../styles/battleArena.scss";

const BattleArena = ({ characters = [] }) => {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [visibleCount, setVisibleCount] = useState(30);
  const [searchTerm, setSearchTerm] = useState("");
  const loadIncrement = 20;
  const totalCharacters = useSelector((state) => state.characters.total);
  const dispatch = useDispatch();
  const results = useSelector((state) => state.battle.results);

  useEffect(() => {
    if (characters.length === 0 && totalCharacters === 0) {
      dispatch(fetchCharacters({ limit: 30, offset: 0, searchTerm: "" }));
    }
  }, [dispatch, characters.length, totalCharacters]);

  useEffect(() => {
    if (searchTerm) {
      setVisibleCount(30);
      dispatch(fetchCharacters({ limit: 30, offset: 0, searchTerm }));
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

  const handleSearch = (event) => {
    event.preventDefault();
    setVisibleCount(30);
    setSearchTerm(event.target.value);
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
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a character"
        />
        <button type="submit">Search</button>
      </form>
      <div className="character-list">
        {characters.slice(0, visibleCount).map((character) => (
          <button
            key={`${character.id}-${character.name}`} // Ensure unique key by combining id and name
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
      {visibleCount < totalCharacters && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More
        </button>
      )}
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
