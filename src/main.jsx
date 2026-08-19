import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import config from './config/base.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App appName={config.app_name}/>
  </StrictMode>,
)
