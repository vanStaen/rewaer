import React from "react";
import { createRoot } from "react-dom/client";

import { consoleGreetings } from "./helpers/dev/consoleGreetings.js";
import App from "./App.tsx";

/* if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then(() => {
    console.log("Service Worker Registered");
  });
} */

process.env.PROD && consoleGreetings();

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
