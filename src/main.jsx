import { createRoot } from 'react-dom/client'
import './assets/css/output.css'
import App from './App.jsx'
import "./config/Languages/index.jsx"
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
)
