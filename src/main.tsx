import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/leaflet-fixes.css'

createRoot(document.getElementById("root")!).render(<App />);
