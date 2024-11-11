import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App";

// Temukan elemen root di dalam index.html
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Render komponen App ke dalam root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
