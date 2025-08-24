import React, { useState } from 'react';
import { Smile } from 'lucide-react';

const EmojiPicker = ({ onEmojiSelect, isOpen, onToggle }) => {
  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
    '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
    '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
    '💕', '💖', '💗', '💘', '💝', '💞', '💓', '💟', '❤️', '🧡',
    '💛', '💚', '💙', '💜', '🤍', '🖤', '🤎', '❤️‍🔥', '💋', '💯',
    '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '👏', '🙌', '💪',
    '🎉', '🎊', '🎈', '🎁', '🎂', '🎄', '🎆', '🎇', '✨', '⭐'
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-full mb-2 left-0 bg-[var(--bg-secondary)]/95 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-4 w-80 max-h-64 overflow-y-auto scrollbar-hide">
      <div className="grid grid-cols-10 gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onEmojiSelect(emoji)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all duration-200 text-lg hover:scale-125"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

const EmojiButton = ({ onEmojiSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emoji) => {
    onEmojiSelect(emoji);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <EmojiPicker 
        isOpen={isOpen} 
        onToggle={() => setIsOpen(!isOpen)}
        onEmojiSelect={handleEmojiSelect}
      />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[var(--text-muted)] hover:text-[var(--primary-cyan)] hover:bg-white/10 rounded-full transition-all duration-300"
      >
        <Smile size={20} />
      </button>
    </div>
  );
};

export default EmojiButton;
