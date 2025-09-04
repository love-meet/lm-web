import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { AffiliateProvider } from './context/AffiliateContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
const GOOGLECLIENT = "63546536150-sppjkartqet1n5i3e6ko559gblh6rup5.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLECLIENT}>
      <AuthProvider>
        <AffiliateProvider>
          <App />
        </AffiliateProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
