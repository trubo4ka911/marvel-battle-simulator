// src/components/CharacterDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { generateHash } from "../utils/auth";
import "../styles/characterDetails.scss";

const CharacterDetails = () => {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("comics");

  const API_PUBLIC_KEY = process.env.REACT_APP_API_PUBLIC_KEY;
  const API_PRIVATE_KEY = process.env.REACT_APP_API_PRIVATE_KEY;

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const ts = new Date().getTime();
        const hash = generateHash(ts, API_PRIVATE_KEY, API_PUBLIC_KEY);
        const response = await axios.get(
          `https://gateway.marvel.com:443/v1/public/characters/${characterId}`,
          {
            params: {
              ts,
              apikey: API_PUBLIC_KEY,
              hash,
            },
          }
        );
        setCharacter(response.data.data.results[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [characterId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!character) return <div>No character found</div>;

  return (
    <div className="character-details">
      <div className="tabs">
        <button
          onClick={() => setActiveTab("comics")}
          className={activeTab === "comics" ? "active" : ""}
        >
          Comics
        </button>
        <button
          onClick={() => setActiveTab("events")}
          className={activeTab === "events" ? "active" : ""}
        >
          Events
        </button>
        <button
          onClick={() => setActiveTab("series")}
          className={activeTab === "series" ? "active" : ""}
        >
          Series
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "comics" && (
          <ul>
            {character.comics.items.map((comic, index) => (
              <li key={index}>{comic.name}</li>
            ))}
          </ul>
        )}
        {activeTab === "events" && (
          <ul>
            {character.events.items.map((event, index) => (
              <li key={index}>{event.name}</li>
            ))}
          </ul>
        )}
        {activeTab === "series" && (
          <ul>
            {character.series.items.map((series, index) => (
              <li key={index}>{series.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CharacterDetails;
