import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink
            exact="true"
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/battle-arena"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Battle Arena
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-hero"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Create Hero
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Your Heroes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
