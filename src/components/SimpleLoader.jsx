import React from 'react';

export default function SimpleLoader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          {/* Pulsating Heart */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 text-[var(--accent-pink)] animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>

          {/* Orbiting Particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-full rounded-full animate-spin"
              style={{ animationDuration: '3s', animationDelay: `${i * 0.2}s` }}
            >
              <div
                className="absolute w-3 h-3 bg-[var(--primary-cyan)] rounded-full opacity-75"
                style={{ top: '50%', left: '0', transform: 'translateY(-50%)' }}
              />
            </div>
          ))}
        </div>

        {/* Company Name with Shimmer */}
        <h2 className="text-2xl font-semibold text-white relative overflow-hidden">
          <span className="animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-400 to-white">
            LOVE MEET
          </span>
        </h2>

        {/* Loading Text */}
        <p className="text-gray-400 mt-2">Connecting hearts...</p>
      </div>

    </div>
  );
}