import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowLeft } from 'lucide-react';
import GameModal from './GameModal';
import Mines from '../../games/mines/Mines';
import LoveInWords from '../../games/LoveWords/Love';

const GamesModal = ({ isOpen, onClose }) => {
  const [activeGame, setActiveGame] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

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

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  if (!isOpen) {
    console.log('GamesModal not rendering because isOpen is false');
    return null;
  }

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    console.error('modal-root element not found in the DOM');
    return null;
  }

  console.log('Rendering GamesModal with isOpen:', isOpen);
  
  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0">
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-200 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />
      
      <div 
        className={`relative bg-gradient-to-br from-[#0a071e] via-[#0d0d2e] to-[#0a071e] w-full h-full overflow-hidden transition-all duration-200 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back</span>
          </button>
          <h2 className="text-xl font-semibold text-white">Games</h2>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Games Content */}
        <div className="relative w-full h-[calc(100vh-60px)] bg-gradient-to-b from-[#0a071e] via-[#0d0d2e] to-[#0a071e] text-white flex flex-col items-center p-6 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-2 h-2 bg-pink-500 rounded-full top-10 left-1/3 animate-pulse"></div>
            <div className="absolute w-1 h-1 bg-blue-400 rounded-full top-1/2 left-1/4 animate-bounce"></div>
            <div className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full bottom-1/3 right-1/4 animate-pulse"></div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-8 relative z-10 mt-10">Choose a Game</h1>

          {/* Games Grid */}
          <div className="grid grid-cols-2 gap-8 relative z-10">
            {games.map((game, index) => (
              <div
                key={game.name}
                onClick={() => setActiveGame(game)}
                className="flex flex-col items-center p-6 bg-gradient-to-br from-[#1c1c34] to-[#121228] rounded-2xl shadow-lg border border-white/10 cursor-pointer hover:scale-105 hover:from-[#23234a] hover:to-[#18182f] transition-transform"
              >
                <div className="w-32 h-32 flex items-center justify-center bg-black/20 rounded-2xl mb-4">
                  <img
                    src={game.icon}
                    alt={game.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <p className="text-lg font-bold">{game.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Game Modal */}
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
    </div>,
    modalRoot
  );
};

export default GamesModal;
