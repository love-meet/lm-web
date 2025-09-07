import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../../../components/feeds/PostCard';
import Stories from '../../../components/feeds/Stories';
import PostCardLoader from '../../../components/feeds/PostCardLoader';
import { PostContext } from '../../../context/PostContext';

const FeedsPage = () => {
  const { posts, loading, pagination, fetchPosts, error } = useContext(PostContext);
  const navigate = useNavigate();
  const loaderRef = useRef(null);

  const handlePostClick = (postId) => {
    navigate(`?modal=post-details&postId=${postId}`);
    // navigate(`/post/${postId}`);
  };

  useEffect(() => {
    if (!pagination || !pagination.hasMore || loading) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchPosts(pagination.page + 1);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };

  }, [loaderRef.current, pagination, loading]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)]" />
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
      <div className="relative z-10 p-0 space-y-6">
        <div 
          className="px-0 space-y-6 max-h-screen overflow-y-auto scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div className=''>
            <Stories />
          </div>
     
          {posts.map((post, index) => (
            <div 
              key={index}
              className="opacity-0 animate-fadeIn"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards'
              }}
            >
              <PostCard post={post} loading={loading} onClick={() => handlePostClick(post.postId || post.id)} />
            </div>
          ))}
          {loading && (
            <div ref={loaderRef} className="w-full  py-4">
              <PostCardLoader />
              <PostCardLoader />
              <PostCardLoader />
            </div>
          )}
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default FeedsPage;
