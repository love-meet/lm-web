import React, { useState, useEffect } from 'react';
import PostCard from '../../../components/feeds/PostCard';

const FeedsPage = () => {
  const [posts, setPosts] = useState([]);

  // Sample data using gallery images
  const samplePosts = [
    {
      id: 1,
      username: "Sarah_Love",
      badge: "Diamond",
      userAvatar: "/assets/default-profile.jpg",
      image: "/gallery/photo_2025-08-23_18-52-12.jpg",
      content: "Beautiful sunset today! Feeling grateful for these peaceful moments. 🌅✨",
      timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      username: "Mike_Adventure",
      badge: "Platinum", 
      userAvatar: "/assets/default-profile.jpg",
      images: ["/gallery/DSC_9900.jpeg", "/gallery/IMG-20230504-WA0025.jpg"],
      image: "/gallery/DSC_9900.jpeg",
      content: "Weekend adventure with amazing friends! Life is so much better when shared with someone special 💕",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      likes: 156,
      comments: 23
    },
    {
      id: 3,
      username: "Emma_Wanderlust",
      badge: "Gold",
      userAvatar: "/assets/default-profile.jpg", 
      image: "/gallery/FB_IMG_1702736841815_1.jpg",
      content: "Exploring new places and making memories. Who wants to join me on my next adventure? 🗺️",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      likes: 89,
      comments: 12
    },
    {
      id: 4,
      username: "Alex_Photographer",
      badge: "Silver",
      userAvatar: "/assets/default-profile.jpg",
      images: ["/gallery/IMG-20241027-WA0044.jpg", "/gallery/photo_2024-12-05_00-48-44.jpg"],
      image: "/gallery/IMG-20241027-WA0044.jpg", 
      content: "Captured this perfect moment today. Photography helps me see the beauty in everything 📸",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      likes: 67,
      comments: 8
    },
    {
      id: 5,
      username: "Luna_Dreamer",
      badge: "Bronze",
      userAvatar: "/assets/default-profile.jpg",
      image: "/gallery/IMG_20240117_150001_111_optimized_100.webp",
      content: "Sometimes the best moments are the quiet ones. Looking for someone to share these peaceful times with 🌙",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      likes: 143,
      comments: 31
    },
    {
      id: 6,
      username: "David_Explorer",
      badge: "Diamond",
      userAvatar: "/assets/default-profile.jpg",
      image: "/gallery/photo_2024-12-05_00-48-44.jpg",
      content: "New day, new possibilities! Ready to make some amazing connections today 🌟",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago 
      likes: 91,
      comments: 15
    },
       {
      id: 6,
      username: "David_Explorer",
      badge: "Diamond",
      userAvatar: "/assets/default-profile.jpg",
      image: "/gallery/IMG-20230504-WA0025.jpg",
      content: "New day, new possibilities! Ready to make some amazing connections today 🌟",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago 
      likes: 91,
      comments: 15
    }
  ];

  useEffect(() => {
    setPosts(samplePosts);
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
      <div className="relative z-10 pt-0 pb-1">
        {/* Header */}

        {/* Posts Container */}
        <div 
          className="px-4 space-y-6 max-h-screen overflow-y-auto scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {posts.map((post, index) => (
            <div 
              key={post.id}
              className="opacity-0 animate-fadeIn"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards'
              }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedsPage;
