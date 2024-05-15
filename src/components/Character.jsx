// src/components/Character.js
import React from "react";
import { useDispatch } from "react-redux";
import { addContender } from "../features/battle/battleSlice";

const Character = ({ character }) => {
  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(addContender(character));
  };

  return (
    <div
      style={{
        margin: 10,
        border: "1px solid black",
        padding: 10,
        cursor: "pointer",
      }}
      onClick={handleSelect}
    >
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        style={{ width: "100px", height: "100px" }}
      />
      <h3>{character.name}</h3>
    </div>
  );
};

export default Character;
