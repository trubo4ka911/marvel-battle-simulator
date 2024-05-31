// src/components/BattleArena.jsx
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { resetBattle, setResults } from "../features/battle/battleSlice";
import {
  fetchCharacters,
  clearCharacters,
} from "../features/characters/characterSlice";
import { dynamicSimulateBattle } from "../utils/dynamicBattleLogic";
import Character from "./Character";
import SearchBar from "./SearchBar";
import LoadMoreButton from "./LoadMoreButton";
import Spinner from "./Spinner";
import "../styles/battleArena.scss";

const BattleArena = ({ characters = [] }) => {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [visibleCount, setVisibleCount] = useState(30);
  const [searchTerm, setSearchTerm] = useState("");
  const [battleDone, setBattleDone] = useState(false);
  const loadIncrement = 20;
  const totalCharacters = useSelector((state) => state.characters.total);
  const status = useSelector((state) => state.characters.status);
  const dispatch = useDispatch();
  const results = useSelector((state) => state.battle.results);
  const narrative = useSelector((state) => state.battle.narrative);
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
      const { winner, narrative } = dynamicSimulateBattle(
        selectedCharacters[0],
        selectedCharacters[1]
      );
      dispatch(setResults({ winner, narrative }));
      setBattleDone(true);
    }
  };

  const handleReset = () => {
    setSelectedCharacters([]);
    dispatch(resetBattle());
    setBattleDone(false);
  };

  const handleResetSelected = (character) => {
    setSelectedCharacters((prev) => prev.filter((c) => c !== character));
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="battle-arena">
      {status === "loading" && <Spinner />}
      <h2>Battle Arena</h2>
      {results && (
        <div className="battle-result">
          <h3>Winner: {results.name}</h3>
          <p>{narrative}</p>
          <button className="battle-button" onClick={handleReset}>
            Reset Battle
          </button>
        </div>
      )}
      <h2>Select two characters to battle</h2>
      <SearchBar onSearch={handleSearch} />
      <div className="selected-characters">
        {selectedCharacters.map((character) => (
          <div
            key={character.id}
            className={`selected-character ${
              results && results.id === character.id ? "winner" : "loser"
            }`}
          >
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
            />
            <p>{character.name}</p>
            {!battleDone && (
              <button
                className="battle-button"
                onClick={() => handleResetSelected(character)}
              >
                Reset
              </button>
            )}
          </div>
        ))}
        {selectedCharacters.length < 2 &&
          Array.from({ length: 2 - selectedCharacters.length }).map(
            (_, index) => (
              <div
                key={`placeholder-${index}`}
                className="selected-character placeholder"
              >
                <p>Select a character</p>
              </div>
            )
          )}
      </div>
      {selectedCharacters.length < 2 && (
        <div className="character-list">
          {characters.slice(0, visibleCount).map((character) => (
            <button
              key={`${character.id}-${character.modified}`} // Ensure unique key by combining id and modified date
              className={`character-button ${
                selectedCharacters.includes(character) ? "hidden" : ""
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
      )}
      {selectedCharacters.length < 2 && (
        <LoadMoreButton
          onLoadMore={handleLoadMore}
          isVisible={
            visibleCount < totalCharacters && selectedCharacters.length < 2
          }
        />
      )}
      {selectedCharacters.length === 2 && !results && (
        <button className="battle-button" onClick={handleBattle}>
          Battle!
        </button>
      )}
    </div>
  );
};

BattleArena.propTypes = {
  characters: PropTypes.array,
};

export default BattleArena;
