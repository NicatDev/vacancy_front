import { createRoot } from 'react-dom/client'
import './assets/css/output.css'
import App from './App.jsx'
import "./config/Languages/index.jsx"

createRoot(document.getElementById('root')).render(
    <App />
)
