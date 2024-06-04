import React, { useState, useEffect } from "react";
import axios from "axios";

const HeroesList = () => {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/heroes");
        setHeroes(response.data);
      } catch (error) {
        console.error("Error fetching heroes:", error);
      }
    };

    fetchHeroes();
  }, []);

  return (
    <div className="heroes-list">
      <h2>Heroes List</h2>
      <ul>
        {heroes.map((hero) => (
          <li key={hero._id}>
            <h3>{hero.name}</h3>
            <p>{hero.description}</p>
            <img src={`/marvel.min.svg#${hero.icon}`} alt={hero.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroesList;
