import React from "react";
import ReactDOM from "react-dom";
import "core-js/stable"; 
// Polyfil: Use only what is needed (instead of whole package)
// preset env. babel
import "regenerator-runtime/runtime";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
