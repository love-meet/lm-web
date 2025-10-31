import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ChatBubble = ({ message, isLast }) => {
  const { user } = useAuth();
  const isMyMessage = message.role === 'user';

  const getTimeFormat = (timestamp) => {
    if (message.time) return message.time;
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className={`flex mb-4 ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${isMyMessage ? 'order-2' : 'order-1'}`}>
        {/* Message Bubble */}
        <div
          className={`relative px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
            isMyMessage
              ? 'bg-gradient-to-r from-[var(--primary-cyan)] to-[var(--primary-blue)] text-white border-[var(--primary-cyan)]/30 rounded-br-md'
              : 'bg-[var(--bg-secondary)]/80 text-[var(--text-primary)] border-white/20 rounded-bl-md'
          }`}
        >
          {/* Message Content */}
          <p className="text-sm leading-relaxed break-words">
            {message.message || message.content}
          </p>
          
          {/* Time and Status */}
          <div className={`flex items-center justify-end mt-2 space-x-1 ${
            isMyMessage ? 'text-white/70' : 'text-[var(--text-muted)]'
          }`}>
            <span className="text-xs">
              {getTimeFormat(message.timestamp || message.time)}
            </span>
            
            {/* Sender name for system/admin messages */}
            {(message.role === 'system' || message.role === 'admin') && (
              <div className="text-xs text-[var(--text-muted)] mt-1">
                {message.sender}
              </div>
            )}
          </div>
        </div>
        
        {/* Message Tail */}
        <div className={`w-0 h-0 ${
          isMyMessage 
            ? 'ml-auto mr-4 border-l-[12px] border-l-transparent border-t-[12px] border-t-[var(--primary-cyan)]'
            : 'ml-4 border-r-[12px] border-r-transparent border-t-[12px] border-t-[var(--bg-secondary)]'
        }`} />
      </div>
    </div>
  );
};

export default ChatBubble;