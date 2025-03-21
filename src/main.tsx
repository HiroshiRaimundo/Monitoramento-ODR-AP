import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// Removed CSS import that was causing MIME type error

createRoot(document.getElementById("root")!).render(<App />);