import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import EmojiButton from './EmojiPicker';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 80); // Max 2 lines
      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji);
    textareaRef.current?.focus();
  };

  return (
    <div className="sticky bottom-0 bg-[var(--bg-primary)]/90 backdrop-blur-lg border-t border-white/10 p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Emoji Button */}
        <EmojiButton onEmojiSelect={handleEmojiSelect} />
        
        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full bg-[var(--bg-secondary)]/80 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-cyan)] resize-none backdrop-blur-sm transition-all duration-300 min-h-[48px]"
            rows={1}
            style={{ maxHeight: '80px' }}
          />
        </div>
        
        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim()}
          className={`p-3 rounded-full transition-all duration-300 ${
            message.trim()
              ? 'bg-gradient-to-r from-[var(--primary-cyan)] to-[var(--primary-blue)] text-white hover:from-[var(--primary-cyan)]/80 hover:to-[var(--primary-blue)]/80 hover:scale-110'
              : 'bg-white/10 text-[var(--text-muted)] cursor-not-allowed'
          }`}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
