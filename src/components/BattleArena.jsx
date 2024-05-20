import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { resetBattle, setResults } from "../features/battle/battleSlice";
import { simulateBattle } from "../utils/battleLogic";
import Character from "./Character";
import "../styles/battleArena.scss";

// Set default value for characters directly in the function signature
const BattleArena = ({ characters = [] }) => {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const dispatch = useDispatch();
  const results = useSelector((state) => state.battle.results);

  if (!characters.length) {
    return <div>No characters available</div>;
  }

  const handleSelectCharacter = (character) => {
    setSelectedCharacters((prev) => {
      if (
        prev.includes(character) ||
        (prev.length >= 2 && !prev.includes(character))
      ) {
        return prev.filter((c) => c !== character); // This allows toggling selection on and off
      }
      return [...prev, character];
    });
  };

  const handleBattle = () => {
    // Ensure two unique characters are selected
    if (selectedCharacters.length === 2) {
      const winner = simulateBattle(
        selectedCharacters[0],
        selectedCharacters[1]
      );
      dispatch(setResults(winner));
    }
  };

  const handleReset = () => {
    setSelectedCharacters([]); // Clear selected characters
    dispatch(resetBattle());
  };
  const characterButtonClass = (character) => {
    return selectedCharacters.includes(character) ? "selected" : "";
  };

  return (
    <div className="battle-arena">
      <h2 className="battle-arena-title">Battle Arena</h2>
      {results && (
        <div className="battle-results">
          <h3 className="winner-announcement">Winner: {results.name}</h3>
          <button
            className="reset-battle-button"
            onClick={() => dispatch(resetBattle())}
          >
            Reset Battle
          </button>
        </div>
      )}
      <h2 className="battle-setup-title">Select two characters to battle</h2>
      <div className="character-list">
        {characters.map((character) => (
          <button
            key={character.id}
            className={`character-button ${characterButtonClass(character)}`}
            onClick={() => handleSelectCharacter(character)}
            disabled={
              selectedCharacters.length >= 2 &&
              !selectedCharacters.includes(character)
            }
          >
            {character.name}
          </button>
        ))}
      </div>
      <button
        className="battle-button"
        onClick={handleBattle}
        disabled={selectedCharacters.length !== 2}
      >
        Battle!
      </button>
      {selectedCharacters.length === 2 && (
        <div className="pre-battle-summary">
          <p>
            Battle between {selectedCharacters[0].name} and{" "}
            {selectedCharacters[1].name}
          </p>
        </div>
      )}
    </div>
  );
};

BattleArena.propTypes = {
  characters: PropTypes.array,
};

export default BattleArena;
