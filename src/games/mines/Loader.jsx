import React from 'react';
import "./style.css"

export default function MinesLoader({ name }) {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-gradient-to-br from-[#0b0b1a] via-[#121226] to-[#0d1424] overflow-hidden">
      <div className="text-center">
        {/* Pulsing Heart */}
        <div className="relative w-32 h-32 mb-8 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="heart-loader animate-pulse" />
          </div>
          {/* Sparkles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-pink-400 rounded-full"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateX(${60 + Math.random() * 20}px)`,
                animation: `sparkle ${1.5 + Math.random()}s infinite`,
                opacity: 0,
                animationDelay: `${Math.random()}s`,
              }}
            />
          ))}
        </div>

        <h2 className="text-2xl font-extrabold mb-2 bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
          Loading {name}...
        </h2>
        <p className="text-gray-400">Getting your game ready!</p>
      </div>

    </div>
  );
}