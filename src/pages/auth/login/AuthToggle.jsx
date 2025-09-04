import React from 'react'

export default function AuthToggle({authMode, setAuthMode}) {
  return (
      <div className="flex w-full mb-6 bg-white/10 rounded-lg p-1">
        <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
                authMode === 'login' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg' 
                    : 'text-white/70 hover:text-white'
            }`}
        >
            Sign In
        </button>
        <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
                authMode === 'signup' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg' 
                    : 'text-white/70 hover:text-white'
            }`}
        >
            Sign Up
        </button>
    </div>
  )
}
