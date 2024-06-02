import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navigation.scss";

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/characters" activeClassName="active">
            Characters
          </NavLink>
        </li>
        <li>
          <NavLink to="/battle-arena" activeClassName="active">
            Battle Arena
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-hero" activeClassName="active">
            Create Hero
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
