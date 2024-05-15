// src/components/BattleArena.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetBattle, setResults } from "../features/battle/battleSlice";
import { simulateBattle } from "../utils/battleLogic";
import Character from "./Character";

const BattleArena = () => {
  const dispatch = useDispatch();
  const contenders = useSelector((state) => state.battle.contenders);
  const results = useSelector((state) => state.battle.results);

  const handleBattle = () => {
    const result = simulateBattle(contenders);
    dispatch(setResults(result));
  };

  const handleReset = () => {
    dispatch(resetBattle());
  };

  return (
    <div>
      <h2>Battle Arena</h2>
      {results ? (
        <>
          <h3>Winner: {results.name}</h3>
          <button onClick={handleReset}>Reset Battle</button>
        </>
      ) : (
        <>
          {contenders.map((contender, index) => (
            <Character key={index} character={contender} />
          ))}
          <button onClick={handleBattle}>Fight!</button>
        </>
      )}
    </div>
  );
};

export default BattleArena;
