import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [heroes, setHeroes] = useState([]);

  const fetchHeroes = () => {
    axios
      .get("http://localhost:5000/api/heroes")
      .then((response) => setHeroes(response.data))
      .catch((error) => console.error("Error fetching heroes:", error));
  };

  const deleteHero = (id) => {
    axios
      .delete(`http://localhost:5000/api/heroes/${id}`)
      .then(() => {
        setHeroes(heroes.filter((hero) => hero._id !== id));
      })
      .catch((error) => console.error("Error deleting hero:", error));
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  return (
    <div className="user-profile">
      <h1>Your Heroes</h1>
      <ul>
        {heroes.map((hero) => (
          <li key={hero._id} className="hero-item">
            <h2>{hero.name}</h2>
            <p>{hero.description}</p>
            <svg className="hero-icon">
              <use xlinkHref={`/marvel.min.svg#${hero.imageUrl}`} />
            </svg>
            <button onClick={() => deleteHero(hero._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
