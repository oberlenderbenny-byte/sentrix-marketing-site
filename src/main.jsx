import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/* Vercel Web Analytics — cookieless, no personal data, no consent
          banner required. Basic traffic counts only (page views, referrers). */}
      <Analytics />
    </BrowserRouter>
  </StrictMode>,
)
