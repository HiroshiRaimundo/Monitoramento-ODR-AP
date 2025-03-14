import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.js';
// Removed CSS import that was causing MIME type error

// Adicionar depuração para identificar problemas
console.log('React app initializing...');

// Verificar se o elemento root existe
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Root element not found! Make sure there is a div with id="root" in your HTML.');
} else {
  console.log('Root element found, initializing React...');
  try {
    const root = createRoot(rootElement);
    root.render(React.createElement(App));
    console.log('React app successfully rendered!');
  } catch (error) {
    console.error('Error rendering React app:', error);
  }
}