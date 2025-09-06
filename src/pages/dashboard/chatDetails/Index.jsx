import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Video, MoreHorizontal, Gamepad2, X } from 'lucide-react';
import { chatsData, currentUserId } from '../../../data/chatsData';
import { io } from 'socket.io-client';
import { useAuth } from '../../../context/AuthContext';
import ChatBubble from '../../../components/chat/ChatBubble';
import ChatInput from '../../../components/chat/ChatInput';
import { backendUrl } from '../../../api/axios';

// Lazy load the GamesHub component
const GamesHub = lazy(() => import('../games/Hub'));

const socket = io(backendUrl(), {
  withCredentials: true
});

export default function ChatDetails() {
  const { user } = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [showGamesModal, setShowGamesModal] = useState(false);
  const messagesEndRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowActions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!user?.userId) return;
    socket.emit('join', user.userId);

    // Open chat with the other user
    socket.emit('open_chat', { userId: user.userId, otherUserId: userId });

    socket.on('chat_opened', (chatData) => {
      setChat(chatData);
      setMessages(chatData.messages || []);
    });

    socket.on('new_message', ({ chatId, message }) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('chat_opened');
      socket.off('new_message');
    };
  }, [userId, user?.userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content) => {
    if (!chat || !user?.userId) return;
    socket.emit('send_message', {
      chatId: chat._id,
      senderId: user.userId,
      receiverId: userId,
      content
    });
  };

  if (!chat) {
    return (
      <div className="fixed inset-0 bg-[var(--bg-primary)] flex items-center justify-center z-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Chat Not Found</h2>
          <button 
            onClick={() => navigate('/chats')}
            className="px-6 py-3 bg-gradient-to-r from-[var(--primary-cyan)] to-[var(--primary-blue)] text-white rounded-full font-medium hover:from-[var(--primary-cyan)]/80 hover:to-[var(--primary-blue)]/80 transition-all duration-300"
          >
            Go Back to Chats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] z-50 flex flex-col">
      {/* Streaming Animation Background */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[var(--primary-cyan)] rounded-full opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatParticles ${8 + Math.random() * 4}s infinite ${Math.random() * 5}s`,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>
        
        {/* Subtle love icons */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={`heart-${i}`}
              className="absolute text-[var(--accent-pink)] opacity-5"
              style={{
                left: `${Math.random() * 95}%`,
                top: `${Math.random() * 95}%`,
                fontSize: `${4 + Math.random() * 3}px`,
                animation: `float ${10 + Math.random() * 6}s infinite ${Math.random() * 4}s`
              }}
            >
              💖
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-[var(--bg-primary)]/90 backdrop-blur-lg border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Back Button */}
            <button 
              onClick={() => navigate("/chats")}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
            
            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--primary-cyan)]">
                  <img 
                    src={chat.userAvatar || "/assets/default-profile.jpg"} 
                    alt={chat.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Online status */}
                {chat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[var(--accent-green)] border-2 border-[var(--bg-primary)] rounded-full animate-pulse" />
                )}
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">{chat.username}</h2>
                <p className="text-[var(--text-muted)] text-xs">
                  {chat.isOnline ? 'Online' : 'Last seen recently'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowActions(!showActions)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <MoreHorizontal size={18} className="text-white" />
            </button>
            
            {/* Dropdown Menu */}
            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-secondary)] rounded-lg shadow-lg border border-white/10 z-50">
                <button className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/5 flex items-center gap-2">
                  <Phone size={16} />
                  <span>Voice Call</span>
                </button>
                <button className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/5 flex items-center gap-2">
                  <Video size={16} />
                  <span>Video Call</span>
                </button>
                <button 
                  onClick={() => {
                    setShowActions(false);
                    setShowGamesModal(true);
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/5 flex items-center gap-2"
                >
                  <Gamepad2 size={16} />
                  <span>Play Games</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 relative z-10 overflow-y-auto scrollbar-hide">
        <div className="p-4 space-y-2">
          {messages.map((message, index) => (
            <ChatBubble 
              key={message.id} 
              message={message} 
              isLast={index === messages.length - 1}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="relative z-10">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>

      {/* Games Modal */}
      {showGamesModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl h-[80vh] bg-[#0a071e] rounded-2xl overflow-hidden border border-white/10">
            <button
              onClick={() => setShowGamesModal(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-cyan)]"></div>
              </div>
            }>
              <GamesHub />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
