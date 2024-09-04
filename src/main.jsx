import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';
import { Analytics } from "@vercel/analytics/react"
import './index.css'
import '../scrollbar.css';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthProvider>
    <App />
    <Analytics />
  </AuthProvider>
  // </StrictMode>,
)
