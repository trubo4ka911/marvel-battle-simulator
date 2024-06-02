import React from "react";
import "../styles/about.scss";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Marvel Battle Simulator</h1>
      <p>
        Welcome to the Marvel Battle Simulator app! This application is built to
        provide detailed information about Marvel characters and simulate
        battles between them. Below is a brief overview of the technologies used
        and the features provided by this application.
      </p>
      <h2>Technologies Used</h2>
      <ul>
        <li>
          <strong>React:</strong> For building the user interface.
        </li>
        <li>
          <strong>Redux:</strong> For state management across the application.
        </li>
        <li>
          <strong>Express:</strong> For building the backend server.
        </li>
        <li>
          <strong>MongoDB:</strong> As the database to store character data and
          user-created heroes.
        </li>
        <li>
          <strong>Mongoose:</strong> For MongoDB object modeling.
        </li>
        <li>
          <strong>SCSS:</strong> For styling the application.
        </li>
        <li>
          <strong>Axios:</strong> For making HTTP requests to the backend API.
        </li>
      </ul>
      <h2>Features</h2>
      <ul>
        <li>
          <strong>Character Gallery:</strong> Browse through a collection of
          Marvel characters.
        </li>
        <li>
          <strong>Character Details:</strong> View detailed information about
          each Marvel character.
        </li>
        <li>
          <strong>Battle Arena:</strong> Simulate battles between selected
          characters.
        </li>
        <li>
          <strong>Create Hero:</strong> Add your own custom heroes to the
          database with a name, description, and icon.
        </li>
        <li>
          <strong>User Profile:</strong> View a list of heroes you have created.
        </li>
      </ul>
      <p>
        This application provides a fun and interactive way to explore the
        Marvel universe and engage with your favorite characters. Feel free to
        explore and create your own heroes to see how they fare in the Battle
        Arena!
      </p>
    </div>
  );
};

export default About;
