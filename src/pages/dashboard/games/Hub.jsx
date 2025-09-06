import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import GameModal from "../../../components/games/GameModal";
import Mines from "../../../games/mines/Mines";
import LoveInWords from "../../../games/LoveWords/Love";

export default function GamesHub() {
  const [activeGame, setActiveGame] = useState(null);
  const games = [
    { 
      name: "Mines", 
      component: <Mines onClose={() => setActiveGame(null)} />, 
      icon: "/games/MINES.png" 
    },
    { 
      name: "Love Words", 
      component: <LoveInWords onClose={() => setActiveGame(null)} />, 
      icon: "/assets/jesse.jpg" 
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a071e] via-[#0d0d2e] to-[#0a071e] text-white flex flex-col items-center p-6 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-2 h-2 bg-pink-500 rounded-full top-10 left-1/3 animate-pulse"></div>
        <div className="absolute w-1 h-1 bg-blue-400 rounded-full top-1/2 left-1/4 animate-bounce"></div>
        <div className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full bottom-1/3 right-1/4 animate-pulse"></div>
      </div>
{/* 
      Back Button
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
      >
        <ArrowLeft size={18} />
        <span className="text-sm">Back</span>
      </button> */}

      {/* Title */}
      <h1 className="text-2xl font-bold mb-8 relative z-10 mt-10">Choose a Game</h1>

      {/* Games Grid */}
      <div className="grid grid-cols-2 gap-14 relative z-10">
        {games.map((game, index) => (
          <div
            key={game.name}
            onClick={() => setActiveGame(game)}
            className="flex flex-col items-center p-8 bg-gradient-to-br from-[#1c1c34] to-[#121228] rounded-2xl shadow-lg border border-white/10 cursor-pointer hover:scale-110 hover:from-[#23234a] hover:to-[#18182f] transition-transform"
          >
            <div className="w-40 h-40 flex items-center justify-center bg-black/20 rounded-2xl mb-4">
              <img
                src={game.icon}
                alt={game.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <p className="text-lg font-bold">{game.name}</p>
          </div>
        ))}
        
        {activeGame && (
          <GameModal 
            isOpen={!!activeGame} 
            onClose={() => setActiveGame(null)}
            title={activeGame?.name || 'Game'}
          >
            {activeGame?.component}
          </GameModal>
        )}
      </div>
    </div>
  );
}
