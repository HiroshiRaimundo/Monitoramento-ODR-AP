import { createRoot } from 'react-dom/client';
import App from './App.js';
import './index.css';

// Adicionar depuração para identificar problemas
console.log('React app initialized');
console.log('DOM loaded:', document.getElementById("root"));

const root = createRoot(document.getElementById("root"));
root.render(App());
