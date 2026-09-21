import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx'
// import Settings from "./Settings";
import Notes from "./Notes";
import PrivateNotes from "./PrivateNotes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Settings  */}
    <Notes />
    <PrivateNotes />
  </StrictMode>,
);
