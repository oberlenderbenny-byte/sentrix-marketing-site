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
          banner required. Basic traffic counts only (page views, referrers).
          `beforeSend` drops events from any browser that has opted itself
          out via localStorage — run
          localStorage.setItem('sentrix_no_track','1') once in the console
          on any device (team members, your own testing) to stop counting
          it. Remove the key (or run with value '0') to resume tracking. */}
      <Analytics
        beforeSend={(event) => {
          if (typeof window !== "undefined" && localStorage.getItem("sentrix_no_track") === "1") {
            return null;
          }
          return event;
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
