import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Routes from "Routes";

import Provider from "./contexts";

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
