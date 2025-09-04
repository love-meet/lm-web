import React from 'react'

export default function SimpleLoader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] flex items-center justify-center z-50">


      <div className="relative z-10 text-center">
        {/* Love Heart Loader */}
        <div className="w-20 h-20 mx-auto mb-6 relative">
          {/* Outer Heart Ring */}
          <div className="absolute inset-0 animate-pulse">
            <div className="w-full h-full text-6xl text-[var(--accent-pink)] flex items-center justify-center animate-bounce">
              💖
            </div>
          </div>
          
          {/* Spinning Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-[var(--primary-cyan)] border-r-[var(--accent-pink)] rounded-full animate-spin"></div>
          
          {/* Inner Spinning Ring */}
          <div className="absolute inset-3 border-2 border-transparent border-b-[var(--primary-purple)] border-l-[var(--accent-orange)] rounded-full animate-spin" 
               style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
          </div>
        </div>
      
      </div>
    </div>
  )
}
