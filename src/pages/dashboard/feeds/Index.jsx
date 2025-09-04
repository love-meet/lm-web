import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../../../components/feeds/PostCard';
import { postsData } from '../../../data/postsData';
import Stories from '../../../components/feeds/Stories';

const FeedsPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  useEffect(() => {
    setPosts(postsData);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Streaming Animation Background */}
      <div className="fixed inset-0 z-0">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)]" />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[var(--primary-cyan)] rounded-full opacity-30"
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
          {[...Array(6)].map((_, i) => (
            <div
              key={`heart-${i}`}
              className="absolute text-[var(--accent-pink)] opacity-20"
              style={{
                left: `${Math.random() * 95}%`,
                top: `${Math.random() * 95}%`,
                fontSize: `${8 + Math.random() * 6}px`,
                animation: `float ${6 + Math.random() * 4}s infinite ${Math.random() * 3}s`
              }}
            >
              💖
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-4 space-y-6">
        <div 
          className="px-0 space-y-6 max-h-screen overflow-y-auto scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* 👇 Stories go here at the top */}
          <Stories />

          {/* Posts */}
          {posts.map((post, index) => (
            <div 
              key={post.id}
              className="opacity-0 animate-fadeIn"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards'
              }}
            >
              <PostCard post={post} onClick={() => handlePostClick(post.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedsPage;
