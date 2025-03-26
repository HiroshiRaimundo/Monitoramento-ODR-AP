
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// Import leaflet CSS
import 'leaflet/dist/leaflet.css';
// Import custom CSS for map styling
import './styles/map.css';

createRoot(document.getElementById("root")!).render(<App />);
