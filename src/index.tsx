import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

ReactDOM.render(
  <MemoryRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MemoryRouter>,
  document.getElementById("root")
);
