// src/components/AddHero.js
import React, { useState } from "react";
import "../styles/addHeroForm.scss";

const icons = [
  "icon-cyclop-marvel",
  "icon-storm-marvel",
  "icon-black-panther-mask",
  "icon-spiderman-head",
  "icon-captain-america",
  "icon-groot",
  "icon-deadpool",
  "icon-avengers",
  "icon-venom-head",
  "icon-human-torch",
  "icon-thanos",
  "icon-s-h-i-e-l-d",
  "icon-spiderman-old",
  "icon-logan-x-men",
  "icon-x-men",
  "icon-magneto",
  "icon-mystique",
  "icon-beast",
  "icon-hawkeye",
  "icon-jean-grey",
  "icon-luke-cage",
  "icon-fantastic-four",
  "icon-black-widow",
  "icon-rogue",
];

const AddHero = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle hero creation logic here
  };

  return (
    <div className="add-hero-container">
      <h1>Add New Hero</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="add-hero">
          <h2>Select Your Hero Icon</h2>
          <div className="icon-selection">
            {icons.map((icon) => (
              <svg
                key={icon}
                className={`icon ${icon === selectedIcon ? "selected" : ""}`}
                onClick={() => handleIconClick(icon)}
              >
                <use xlinkHref={`/marvel.min.svg#${icon}`} />
              </svg>
            ))}
          </div>
          <h2>Selected Icon</h2>
          <svg className="selected-icon">
            <use xlinkHref={`/marvel.min.svg#${selectedIcon}`} />
          </svg>
        </div>
        <button type="submit">Add Hero</button>
      </form>
    </div>
  );
};

export default AddHero;
