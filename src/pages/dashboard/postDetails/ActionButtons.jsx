import React from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { usePost } from '../../../context/PostContext';

export default function ActionButtons({ postId }) {
  const { user } = useAuth();
  const { toggleLike, posts } = usePost();
  const activeUserId = user?.userId;
  const navigate = useNavigate();

  const post = posts.find(p => p.postId === postId); // Find the post from context

  if (!post) {
    return null; // Or handle the case where post is not found
  }

  const liked = Array.isArray(post.likedBy) && post.likedBy.some(u => u.userId === activeUserId);
  const likes = post.likes;

  const handleLike = (e) => {
    e.stopPropagation();
    toggleLike(post.postId);
  };

  const totalComments = (post.comments || []).reduce((acc, comment) => {
    return acc + 1 + (comment.replies?.length || 0);
  }, 0);

  return (
    <div className="flex items-center justify-around py-3 border-t border-b border-white/10">
      <button
        onClick={handleLike}
        className={`flex items-center space-x-3 px-4 py-3 rounded-full transition-all duration-300 ${
          liked && activeUserId
            ? 'bg-[var(--accent-pink)]/20 text-[var(--accent-pink)]'
            : 'text-[var(--text-muted)] hover:bg-white/10 hover:text-white'
        }`}
      >
        <Heart size={20} className={`transition-all duration-300 ${liked ? 'fill-current scale-110' : ''}`} />
        <span className="font-medium">{likes}</span>
      </button>
      <button className="flex items-center space-x-3 px-6 py-3 rounded-full bg-white/10 hover:bg-[var(--primary-cyan)]/20 hover:text-[var(--primary-cyan)] transition-all duration-300 group">
        <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
        <span className="font-medium">{totalComments}</span>
      </button>
      <button
        className="flex items-center space-x-3 px-6 py-3 rounded-full bg-white/10 hover:bg-[var(--primary-purple)]/20 hover:text-[var(--primary-purple)] transition-all duration-300 group"
        onClick={() => navigate(`/chat/${post.user.userId}`)}
      >
        <Send size={20} className="group-hover:scale-110 transition-transform" />
        <span className="font-medium">Message</span>
      </button>
    </div>
  );
}