import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function GamesHub() {
  const navigate = useNavigate();

  const games = [
    { name: "Love In Words", path: "/games/love", icon: "/assets/jesse.jpg" },
    { name: "Mines", path: "/games/mines", icon: "/assets/miness.jpg" },
  ];

  return (
    <div className="relative min-h-screen bg-[#060417] text-white flex flex-col items-center p-6 overflow-hidden">
      {/* Background Grid and Animated Particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-repeat [background-image:linear-gradient(to_right,#1b1b46_1px,transparent_1px),linear-gradient(to_bottom,#1b1b46_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
        {/* Animated Particles */}
        <div className="absolute w-2 h-2 bg-pink-500 rounded-full top-10 left-1/3 animate-pulse"></div>
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full top-1/2 left-1/4 animate-bounce"></div>
        <div className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full bottom-1/3 right-1/4 animate-pulse"></div>
        <div className="absolute w-1 h-1 bg-purple-400 rounded-full top-1/4 right-1/2 animate-spin-slow"></div>
        <div className="absolute w-2 h-2 bg-emerald-400 rounded-full bottom-1/4 left-3/4 animate-ping"></div>
      </div>

      {/* Main Content Container with a higher z-index */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 text-sm font-medium backdrop-blur-sm"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-16 mt-20 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-xl animate-fade-in">
          Choose Your Adventure
        </h1>

        {/* Games Grid */}
        <div className="grid grid-cols-2 gap-12 w-full max-w-xl">
          {games.map((game) => (
            <div
              key={game.name}
              onClick={() => navigate(game.path)}
              className="flex flex-col items-center group cursor-pointer animate-fade-in-up"
            >
              {/* Game Icon Box - Perfectly square with a nice hover effect */}
              <div
                className="w-40 h-40 relative rounded-2xl overflow-hidden shadow-lg 
                           bg-gradient-to-br from-[#1a0f3d] to-[#2d185e] border border-transparent
                           group-hover:scale-105 group-hover:shadow-2xl transition-all duration-300
                           before:absolute before:inset-0 before:rounded-2xl before:border before:border-transparent 
                           before:transition-all before:duration-500 before:group-hover:border-purple-400/50"
              >
                {/* The glowing border effect on hover */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-light"></div>
                <img
                  src={game.icon}
                  alt={game.name}
                  className="relative z-10 w-full h-full object-cover rounded-xl transition-transform duration-300"
                />
              </div>

              {/* Game title below the icon */}
              <p className="text-xl font-semibold mt-6 text-white group-hover:text-pink-300 transition-colors duration-300 tracking-wide text-center">
                {game.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}