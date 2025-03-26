
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// Import leaflet CSS
import 'leaflet/dist/leaflet.css';
// Import custom CSS for map styling
import './styles/map.css';

// Enhanced console logging for debugging
console.log('Application initializing...', {
  environment: import.meta.env.MODE,
  buildTime: new Date().toISOString(),
  baseUrl: import.meta.env.BASE_URL || '/',
  netlifyEnv: import.meta.env.NETLIFY || 'not defined'
});

const root = document.getElementById('root');
if (root) {
  console.log('Root element found, rendering app...');
  createRoot(root).render(<App />);
} else {
  console.error('Root element not found! DOM may not be fully loaded.');
}

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', {
    message: event.error?.message,
    stack: event.error?.stack,
    url: event.filename,
    line: event.lineno,
    column: event.colno
  });
});

// Log navigation for debugging
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    console.log('Navigation occurred, current path:', window.location.pathname);
  });
}
