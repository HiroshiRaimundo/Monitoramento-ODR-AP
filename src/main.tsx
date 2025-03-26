
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// Import leaflet CSS
import 'leaflet/dist/leaflet.css';
// Import custom CSS for map styling
import './styles/map.css';

// Console log for debugging
console.log('Application initializing...');

const root = document.getElementById('root');
if (root) {
  console.log('Root element found, rendering app...');
  createRoot(root).render(<App />);
} else {
  console.error('Root element not found!');
}
