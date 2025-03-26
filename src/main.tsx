
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// Import leaflet CSS
import 'leaflet/dist/leaflet.css';
// Import custom CSS for map styling
import './styles/map.css';

// Enhanced console logging for debugging
console.log('Application initializing...', {
  environment: import.meta.env.MODE,
  buildTime: new Date().toISOString()
});

const root = document.getElementById('root');
if (root) {
  console.log('Root element found, rendering app...');
  createRoot(root).render(<App />);
} else {
  console.error('Root element not found! DOM may not be fully loaded.');
}

window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

