
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Adicionar depuração para identificar problemas
console.log("React app initializing...");

// Verificar se o elemento root existe
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found! Make sure there is a div with id=\"root\" in your HTML.");
} else {
  console.log("Root element found, initializing React...");
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React app successfully rendered!");
  } catch (error) {
    console.error("Error rendering React app:", error);
  }
}
