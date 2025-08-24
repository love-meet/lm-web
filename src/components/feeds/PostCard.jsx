import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Images } from 'lucide-react';
import { FaUser, FaLeaf, FaSeedling, FaFan, FaTree, FaWater, FaSun, FaStar, FaGem } from 'react-icons/fa';

const planIcons = {
  'Free': FaUser,
  'Sprout': FaLeaf,
  'Seedling': FaSeedling,
  'Blossom': FaFan,
  'Orchard': FaTree,
  'Oasis': FaWater,
  'Paradise': FaSun,
  'Utopia': FaStar,
  'Nirvana': FaGem,
};

const planColors = {
  'Free': '#9CA3AF',
  'Sprout': '#10B981',
  'Seedling': '#84CC16',
  'Blossom': '#F59E0B',
  'Orchard': '#8B5CF6',
  'Oasis': '#3B82F6',
  'Paradise': '#EC4899',
  'Utopia': '#F97316',
  'Nirvana': '#A855F7',
};

const PostCard = ({ post, onClick }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return `${Math.floor(diffInMinutes / 10080)}w ago`;
  };

  const tiltAngle = (Math.random() - 0.5) * 6; // Random tilt between -3 and 3 degrees

  const PlanIcon = planIcons[post.badge];
  const iconColor = planColors[post.badge];

  return (
    <div 
      className="w-full max-w-sm mx-auto bg-gradient-to-b from-[var(--bg-secondary)]/80 to-[var(--bg-tertiary)]/80 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-2xl mb-8 cursor-pointer hover:transform hover:scale-105 transition-all duration-300"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--primary-cyan)]">
            <img 
              src={post.userAvatar || "/assets/default-profile.jpg"} 
              alt={post.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white font-semibold text-sm">{post.username}</span>
            {PlanIcon && <PlanIcon style={{ color: iconColor }} className="text-lg" />}
          </div>
        </div>
        
        {/* Multiple images indicator */}
        {post.images && post.images.length > 1 && (
          <div className="flex items-center space-x-1 text-[var(--text-muted)]">
            <Images size={16} />
            <span className="text-xs">{post.images.length}</span>
          </div>
        )}
      </div>

      {/* Image */}
      <div className="relative px-4">
        <div 
          className="relative rounded-xl overflow-hidden shadow-lg"
          style={{ transform: `rotate(${tiltAngle}deg)` }}
        >
          <img 
            src={post.image || post.images?.[0]} 
            alt="Post"
            className="w-full h-full object-cover"
          />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Text content */}
        <p className="text-[var(--text-secondary)] text-sm mb-2 leading-relaxed">
          {post.content}
        </p>
        
        {/* Time */}
        <p className="text-[var(--text-muted)] text-xs mb-4">
          {getTimeAgo(post.timestamp)}
        </p>
        
        {/* Action buttons */}
        <div className="flex items-center justify-around pt-3 border-t border-white/10">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              liked 
                ? 'bg-[var(--accent-pink)]/20 text-[var(--accent-pink)]' 
                : 'text-[var(--text-muted)] hover:bg-white/10 hover:text-white'
            }`}
          >
            <Heart 
              size={18} 
              className={`transition-all duration-300 ${liked ? 'fill-current scale-110' : ''}`}
            />
            <span className="text-sm font-medium">{likes}</span>
          </button>
          
          <button 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center space-x-2 px-4 py-2 rounded-full text-[var(--text-muted)] hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            <MessageCircle size={18} />
            <span className="text-sm font-medium">{Array.isArray(post.comments) ? post.comments.length : post.comments || 0}</span>
          </button>
          
          <button 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center space-x-2 px-4 py-2 rounded-full text-[var(--text-muted)] hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            <Send size={18} />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
