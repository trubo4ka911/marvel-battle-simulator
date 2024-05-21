import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { resetBattle, setResults } from "../features/battle/battleSlice";
import { fetchCharacters } from "../features/characters/characterSlice"; // Make sure this is imported
import { simulateBattle } from "../utils/battleLogic";
import Character from "./Character";
import "../styles/battleArena.scss";

const BattleArena = ({ characters = [] }) => {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [visibleCount, setVisibleCount] = useState(30); // Ensure this matches initial fetch size or manage dynamically
  const loadIncrement = 20; // Adjust if different from initial fetch size
  const totalCharacters = useSelector((state) => state.characters.total);
  const dispatch = useDispatch();
  const results = useSelector((state) => state.battle.results);

  useEffect(() => {
    if (!characters.length) {
      dispatch(fetchCharacters({ limit: 30, offset: 0 })); // Fetch initial characters if none are loaded
    }
  }, [dispatch, characters.length]);

  const handleSelectCharacter = (character) => {
    setSelectedCharacters((prev) => {
      return prev.includes(character)
        ? prev.filter((c) => c !== character) // Toggle selection off if already selected
        : [...prev, character].slice(-2); // Keep only the last two characters
    });
  };

  const handleLoadMore = () => {
    if (visibleCount < totalCharacters) {
      setVisibleCount((prevCount) => prevCount + loadIncrement);
      dispatch(fetchCharacters({ limit: loadIncrement, offset: visibleCount }));
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
      <div className="character-list">
        {characters.slice(0, visibleCount).map((character) => (
          <button
            key={character.id}
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
        <button onClick={handleLoadMore}>Load More</button>
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
