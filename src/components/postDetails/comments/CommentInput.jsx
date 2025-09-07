import React from 'react';
import { Send } from 'lucide-react';

const CommentInput = ({ newComment, setNewComment, handleSubmitComment, user, commentLoading }) => {
  return (
    <form
      onSubmit={handleSubmitComment}
      className="fixed bottom-0 left-0 right-0 bg-[var(--bg-secondary)]/90 backdrop-blur-lg border-t border-white/10 px-4 py-3 flex items-center gap-2"
      style={{ zIndex: 10 }}
    >
      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--primary-cyan)] flex-shrink-0">
        <img
          src={user?.picture || "/assets/male.jpg"}
          alt="Your avatar"
          className="w-full h-full object-cover"
        />
      </div>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 bg-[var(--bg-primary)]/50 border border-white/20 rounded-full px-4 py-2 text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-cyan)] text-sm"
        disabled={commentLoading}
      />
      <button
        type="submit"
        disabled={!newComment.trim() || commentLoading}
        className="p-2 bg-gradient-to-r from-[var(--primary-cyan)] to-[var(--primary-blue)] text-white rounded-full font-medium hover:from-[var(--primary-cyan)]/80 hover:to-[var(--primary-blue)]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default CommentInput;