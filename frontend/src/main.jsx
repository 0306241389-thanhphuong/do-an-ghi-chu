import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx'
import Settings from "./Settings";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Settings />
  </StrictMode>,
);
