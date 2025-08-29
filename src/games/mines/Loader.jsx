
import React from 'react'

export default function MinesLoader() {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-gradient-to-br from-[#0b0b1a] via-[#121226] to-[#0d1424]">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Mines Game</h2>
        <div className="flex items-center justify-center space-x-4">
          <span className="h-3 w-3 rounded-full bg-violet-500 shadow-md animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="h-3 w-3 rounded-full bg-indigo-400 shadow-md animate-bounce" style={{ animationDelay: '120ms' }} />
          <span className="h-3 w-3 rounded-full bg-sky-400 shadow-md animate-bounce" style={{ animationDelay: '240ms' }} />
          <span className="h-3 w-3 rounded-full bg-orange-500 shadow-md animate-bounce" style={{ animationDelay: '360ms' }} />
          <span className="h-3 w-3 rounded-full bg-orange-400 shadow-md animate-bounce" style={{ animationDelay: '480ms' }} />
        </div>
      </div>
    </div>
  )
}

