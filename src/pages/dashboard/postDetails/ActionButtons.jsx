import React, { useState } from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';
import api from '../../../api/axios';
import { useAuth } from '../../../context/AuthContext';

export default function ActionButtons({ post }) {
  const { user } = useAuth();
  const activeUserId = user?.userId;

  // Check if the active user has liked the post
  const initialLiked = Array.isArray(post.likedBy) && post.likedBy.some(u => u.userId === activeUserId);
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = async (e) => {
    e.stopPropagation();
    setLiked(prev => !prev);
    setLikes(prev => liked ? prev - 1 : prev + 1);

    try {
      const res = await api.put(`/post/toggle-like/${post.postId}`, {
        userId: activeUserId,
        username: user?.username,
        picture: user?.picture || "/assets/male.jpg"
      });
      setLiked(res.liked);
      setLikes(res.likes);
    } catch (err) {
      setLiked(prev => !prev);
      setLikes(prev => liked ? prev + 1 : prev - 1);
    }
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
      <button className="flex items-center space-x-3 px-6 py-3 rounded-full bg-white/10 hover:bg-[var(--primary-purple)]/20 hover:text-[var(--primary-purple)] transition-all duration-300 group">
        <Send size={20} className="group-hover:scale-110 transition-transform" />
        <span className="font-medium">Message</span>
      </button>
    </div>
  );
}