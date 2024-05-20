// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider
import { store } from "./store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
