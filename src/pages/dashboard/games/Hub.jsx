import React from "react";
import { useNavigate } from "react-router-dom";

export default function GamesHub() {
  const navigate = useNavigate();

  const games = [
    { name: "Love In Words", path: "/games/love", icon: "/assets/love.png" },
    { name: "Mines", path: "/games/mines", icon: "/assets/mines.png" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a071e] via-[#0d0d2e] to-[#0a071e] text-white flex flex-col items-center p-6 overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-2 h-2 bg-pink-500 rounded-full top-10 left-1/3 animate-pulse"></div>
        <div className="absolute w-1 h-1 bg-blue-400 rounded-full top-1/2 left-1/4 animate-bounce"></div>
        <div className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full bottom-1/3 right-1/4 animate-pulse"></div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-8 relative z-10"> Choose a Game</h1>

      {/* Games Grid */}
      <div className="grid grid-cols-2 gap-6 relative z-10">
        {games.map((game) => (
          <div
            key={game.name}
            onClick={() => navigate(game.path)}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-[#1c1c34] to-[#121228] rounded-xl shadow-lg border border-white/10 cursor-pointer hover:scale-105 hover:from-[#23234a] hover:to-[#18182f] transition-transform"
          >
            <img
              src= {game.icon}
              alt={game.name}
              className="w-20 h-20 object-cover rounded-lg mb-2"
            />
            <p className="text-sm font-medium">{game.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
