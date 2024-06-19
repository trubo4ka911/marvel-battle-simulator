import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { generateHash } from "../utils/auth";
import Spinner from "./Spinner";

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
  }, [characterId, API_PRIVATE_KEY, API_PUBLIC_KEY]);

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;
  if (!character) return <div>No character found</div>;

  return (
    <div className="character-details">
      <h2>{character.name}</h2>
      <div className="character-thumbnail">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
      </div>
      {character.description && (
        <div className="character-description">{character.description}</div>
      )}
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
        <button
          onClick={() => setActiveTab("stories")}
          className={activeTab === "stories" ? "active" : ""}
        >
          Stories
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
        {activeTab === "stories" && (
          <ul>
            {character.stories.items.map((story, index) => (
              <li key={index}>{story.name}</li>
            ))}
          </ul>
        )}
      </div>
      {character.urls.length > 0 && (
        <div className="character-urls">
          <h3>Related Links</h3>
          {character.urls.map((url, index) => (
            <p key={index}>
              <a href={url.url} target="_blank" rel="noopener noreferrer">
                {url.type}
              </a>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterDetails;
