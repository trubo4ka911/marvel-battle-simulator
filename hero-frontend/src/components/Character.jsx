import React from "react";
import { Link } from "react-router-dom";

const Character = ({ character }) => {
  return (
    <div>
      <Link to={`/character/${character.id}`}>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          style={{ width: 100, height: 100 }}
        />
        <p>{character.name}</p>
      </Link>
    </div>
  );
};

export default Character;
