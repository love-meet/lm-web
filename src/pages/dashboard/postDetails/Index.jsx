import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Send, Share } from 'lucide-react';
import { postsData } from '../../../data/postsData';
import ImageSwiper from '../../../components/postDetails/ImageSwiper';
import CommentSection from '../../../components/postDetails/CommentSection';

export default function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();
  
  const post = postsData.find(p => p.id === parseInt(postId));
  
  if (!post) {
    return (
      <div className="fixed inset-0 bg-[var(--bg-primary)] flex items-center justify-center z-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
          <button 
            onClick={() => navigate('/feeds')}
            className="px-6 py-3 bg-gradient-to-r from-[var(--primary-cyan)] to-[var(--primary-blue)] text-white rounded-full font-medium hover:from-[var(--primary-cyan)]/80 hover:to-[var(--primary-blue)]/80 transition-all duration-300"
          >
            Go Back to Feeds
          </button>
        </div>
      </div>
    );
  }

  const getBadgeColor = (badge) => {
    switch(badge.toLowerCase()) {
      case 'bronze': return '#CD7F32';
      case 'silver': return '#C0C0C0';
      case 'gold': return '#FFD700';
      case 'diamond': return '#B9F2FF';
      case 'platinum': return '#E5E4E2';
      default: return '#CD7F32';
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

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] z-50 overflow-hidden">
      {/* Streaming Animation Background */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[var(--primary-cyan)] rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatParticles ${8 + Math.random() * 4}s infinite ${Math.random() * 5}s`,
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
              className="absolute text-[var(--accent-pink)] opacity-10"
              style={{
                left: `${Math.random() * 95}%`,
                top: `${Math.random() * 95}%`,
                fontSize: `${6 + Math.random() * 4}px`,
                animation: `float ${8 + Math.random() * 6}s infinite ${Math.random() * 4}s`
              }}
            >
              💖
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="sticky top-0 bg-[var(--bg-primary)]/80 backdrop-blur-lg border-b border-white/10 p-4 z-20">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
            <h1 className="text-lg font-semibold text-white">Post Details</h1>
          </div>
        </div>

        {/* Post Content */}
        <div className="max-w-2xl mx-auto p-6 space-y-6">
          {/* User Header */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--primary-cyan)]">
              <img 
                src={post.userAvatar || "/assets/default-profile.jpg"} 
                alt={post.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <span className="text-white font-semibold text-lg">{post.username}</span>
                <div 
                  className="px-3 py-1 rounded-full text-xs font-bold text-black"
                  style={{ backgroundColor: getBadgeColor(post.badge) }}
                >
                  {post.badge.toUpperCase()}
                </div>
              </div>
              <p className="text-[var(--text-muted)] text-sm">{getTimeAgo(post.timestamp)}</p>
            </div>
          </div>

          {/* Image Swiper */}
          <ImageSwiper images={post.images} />

          {/* Post Content */}
          <div className="space-y-4">
            <p className="text-[var(--text-secondary)] text-base leading-relaxed">
              {post.content}
            </p>
            
            {/* Action Buttons */}
            <div className="flex items-center justify-around py-4 border-t border-b border-white/10">
              <button className="flex items-center space-x-3 px-6 py-3 rounded-full bg-white/10 hover:bg-[var(--accent-pink)]/20 hover:text-[var(--accent-pink)] transition-all duration-300 group">
                <Heart size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">{post.likes}</span>
              </button>
              
              <button className="flex items-center space-x-3 px-6 py-3 rounded-full bg-white/10 hover:bg-[var(--primary-cyan)]/20 hover:text-[var(--primary-cyan)] transition-all duration-300 group">
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">{post.comments.length}</span>
              </button>
              
              <button className="flex items-center space-x-3 px-6 py-3 rounded-full bg-white/10 hover:bg-[var(--primary-purple)]/20 hover:text-[var(--primary-purple)] transition-all duration-300 group">
                <Send size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <CommentSection comments={post.comments} postId={post.id} />
        </div>

        {/* Bottom Padding */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
