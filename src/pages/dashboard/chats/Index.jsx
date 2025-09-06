import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Search } from 'lucide-react';
import { chatsData } from '../../../data/chatsData';
import GamesModal from '../../../components/games/GamesModal';

export default function Chats() {
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showGamesModal, setShowGamesModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setChats(chatsData);
  }, []);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const chatTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - chatTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}min`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d`;
    return `${Math.floor(diffInMinutes / 10080)}w`;
  };

  const filteredChats = chats.filter(chat =>
    chat.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Streaming Animation Background */}
      <div className="fixed inset-0 z-0">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[var(--primary-cyan)] rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatParticles ${6 + Math.random() * 4}s infinite ${Math.random() * 3}s`,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>
        
        {/* Floating love icons */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={`heart-${i}`}
              className="absolute text-[var(--accent-pink)] opacity-15"
              style={{
                left: `${Math.random() * 95}%`,
                top: `${Math.random() * 95}%`,
                fontSize: `${6 + Math.random() * 4}px`,
                animation: `float ${8 + Math.random() * 4}s infinite ${Math.random() * 3}s`
              }}
            >
              💖
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 space-y-4 px-4  max-h-screen overflow-y-auto scrollbar-hide">

        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full bg-[var(--bg-secondary)]/80 border border-white/20 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-cyan)] backdrop-blur-sm transition-colors"
          />
        </div>

        {/* Chat List */}
        <div className="space-y-3">
          {filteredChats.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle size={48} className="mx-auto text-[var(--text-muted)] mb-4" />
              <p className="text-[var(--text-muted)]">
                {searchQuery ? 'No conversations found' : 'No messages yet. Start connecting!'}
              </p>
            </div>
          ) : (
            filteredChats.map((chat, index) => (
              <div
                key={chat.id}
                onClick={() => handleChatClick(chat.id)}
                className="flex items-center p-4 bg-gradient-to-r from-[var(--bg-secondary)]/60 to-[var(--bg-tertiary)]/60 backdrop-blur-sm border border-white/10 rounded-2xl cursor-pointer hover:bg-gradient-to-r hover:from-[var(--bg-secondary)]/80 hover:to-[var(--bg-tertiary)]/80 transition-all duration-300 hover:scale-105 opacity-0 animate-fadeIn"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {/* Profile Image */}
                <div className="relative flex-shrink-0 mr-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--primary-cyan)]">
                    <img 
                      src={chat.userAvatar || "/assets/default-profile.jpg"} 
                      alt={chat.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Online status */}
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--accent-green)] border-2 border-[var(--bg-primary)] rounded-full animate-pulse" />
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-semibold text-base truncate">
                      {chat.username}
                    </span>
                    <span className="text-[var(--text-muted)] text-xs flex-shrink-0 ml-2">
                      {getTimeAgo(chat.timestamp)}
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm truncate leading-relaxed">
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Unread Count */}
                {chat.unreadCount > 0 && (
                  <div className="flex-shrink-0 ml-3">
                    <div className="bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-orange)] text-white text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center px-2 animate-pulse">
                      {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
      {/* Floating Games Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowGamesModal(true)}
          className="w-14 h-14 rounded-full bg-pink-600 flex items-center justify-center shadow-lg hover:bg-pink-700 transition"
        >
          🎮
        </button>
      </div>

      {/* Games Modal */}
      <GamesModal 
        isOpen={showGamesModal} 
        onClose={() => setShowGamesModal(false)} 
      />


    </div>
  );
}
