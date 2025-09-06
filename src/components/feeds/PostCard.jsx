import React, { useRef, useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Images } from 'lucide-react';
import { FaUser, FaLeaf, FaSeedling, FaFan, FaTree, FaWater, FaSun, FaStar, FaGem } from 'react-icons/fa';
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

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

const PostCard = ({ post, loading, onClick }) => {
  const { user } = useAuth();
  const activeUserId = user?.userId;

  const videoRef = useRef(null);
  const [videoLoading, setVideoLoading] = useState(true);
  const [showPlay, setShowPlay] = useState(true);

  const initialLiked = Array.isArray(post.likedBy) && post.likedBy.some(u => u.userId === activeUserId);
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(post.likes);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 5;
      videoRef.current.pause();
      setShowPlay(true);
    }
  }, [post.media]);

  const handlePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.play();
      setShowPlay(false);
    }
  };

  const handleLoadedData = () => {
    setVideoLoading(false);
  };

  const handleLike = async () => {
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

  const tiltAngle = 0;
  const postBadge = post.user?.badge || 'Free';
  const PlanIcon = planIcons[postBadge];
  const iconColor = planColors[postBadge];

  return (
    <div 
      className="w-full max-w-sm mx-auto bg-gradient-to-b from-[var(--bg-secondary)]/80 to-[var(--bg-tertiary)]/80 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-2xl mb-8 cursor-pointer  transition-all duration-300"
      onClick={onClick}
    >
      <div className="p-4">
        <div className='flex justify-between items-center'>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--primary-cyan)]">
              <img 
                src={post.userAvatar || "/assets/male.jpg"} 
                alt={post?.user?.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center space-x-2">
              <div>
                <span className="text-white font-semibold text-sm">{post?.user?.username}</span>
                <p className="text-[var(--text-muted)] text-xs mb-1 ">
                  {getTimeAgo(post.timestamp)}
                </p>
              </div>
              {PlanIcon && <PlanIcon size={13} style={{ color: iconColor }} className="text-lg" />}
            </div>
          </div>
          {post.media && post.media.length > 1 && (
            <div className="flex items-center space-x-1 text-[var(--text-muted)]">
              <Images size={16} />
              <span className="text-xs">{post.media.length}</span>
            </div>
          )}
        </div>
        <p
          className="text-[var(--text-secondary)] text-sm mb-2 leading-relaxed line-clamp-2 "
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxHeight: '2.8em'
          }}
        >
          {post.content}
        </p>
      </div>
      <div className="relative px-2">
        <div 
          className="relative rounded-xl overflow-hidden shadow-lg flex items-center justify-center"
          style={{ 
            transform: `rotate(${tiltAngle}deg)`,
            height: '100%',
            width: '100%',
            background: '#232b3a'
          }}
        >
          {post.media[0]?.fileType === 'video' ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                src={post.media[0]?.data}
                className="object-contain w-full h-full"
                autoPlay={true}
                preload="metadata"
                poster="/assets/video-poster.jpg"
                style={{ borderRadius: '12px', background: '#232b3a' }}
                onLoadedData={handleLoadedData}
              />
              {showPlay && !videoLoading && (
                <button
                  className="absolute inset-0 flex items-center justify-center z-20"
                  onClick={handlePlay}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.4)" />
                    <polygon points="26,20 50,32 26,44" fill="#fff" />
                  </svg>
                </button>
              )}
              {videoLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-40">
                  <div className="loader" />
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={post.media[0]?.data} 
                alt="Post"
                className="object-contain w-full h-full"
                style={{ background: '#232b3a', borderRadius: '12px' }}
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
      <div className="p-1 flex flex-col justify-center" style={{ minHeight: '90px' }}>
        <div className="flex items-center justify-around pt-3 border-t border-white/10">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              liked && activeUserId
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
            <span className="text-sm font-medium">Message</span>
          </button>
        </div>
      </div>
    </div>
  );
};


export default PostCard;
