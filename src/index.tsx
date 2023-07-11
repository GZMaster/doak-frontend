import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import NavConfig from "./providers/navigation/NavConfig";
import "./styles/main.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavConfig />
    </BrowserRouter>
  </React.StrictMode>
);
