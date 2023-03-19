import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavConfig from "./navigation/NavConfig";

function App() {
  return (
    <Router>
      <NavConfig />
    </Router>
  );
}

export default App;
