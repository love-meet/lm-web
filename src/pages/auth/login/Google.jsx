import React from 'react'
import { GoogleLogin } from '@react-oauth/google'; 
import { jwtDecode } from "jwt-decode";

export default function Google({authMode, fetchWithGoogle}) {
  return (
    <>
        <div className="flex items-center w-full mb-6">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-4 text-white/60 text-sm">or</span>
            <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Google Login */}
        <GoogleLogin
            theme="filled_blue"
            logo_alignment="left"
            onSuccess={(event) => fetchWithGoogle(jwtDecode(event.credential))} 
            onError={() => console.log("Login Failed")}
        />

        <p className="text-xs text-[var(--text-secondary)] mt-6 text-center">
            By {authMode === 'login' ? 'signing in' : 'creating an account'}, you agree to our{' '}
            <a href="/terms" className="text-[var(--accent-pink)] hover:underline">Terms of Service</a> and{' '}
            <a href="/privacy" className="text-[var(--accent-pink)] hover:underline">Privacy Policy</a>.
        </p>
    </>
  )
}
