import React from "react";
import ReactDOM from "react-dom";

import { consoleGreetings } from "./helpers/dev/consoleGreetings.js";
import App from "./App.tsx";

/* if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then(() => {
    console.log("Service Worker Registered");
  });
} */

process.env.PROD && consoleGreetings();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
