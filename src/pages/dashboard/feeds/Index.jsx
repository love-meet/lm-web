import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../../../components/feeds/PostCard';
import Stories from '../../../components/feeds/Stories';
import api from "../../../api/axios"
// import PageLoader from '../../../components/PageLoader';
import PostCardLoader from '../../../components/feeds/PostCardLoader';

const FeedsPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loaderRef = useRef(null);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const fetchPosts = async (nextPage = page) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await api.get(`/post/get-feeds?page=${nextPage}`);
      const newFeeds = response.feeds || [];
      setPosts(newFeeds);
      setHasMore(response.pagination.hasMore);
      setPage(nextPage + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchPosts(page);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };

  }, [loaderRef.current, hasMore, loading, page]);

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
              key={post.postId || post.id}
              className="opacity-0 animate-fadeIn"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards'
              }}
            >
              <PostCard post={post} loading={loading} onClick={() => handlePostClick(post.postId || post.id)} />
            </div>
          ))}
          {hasMore && (
            <div ref={loaderRef} className="w-full  py-4">
              <PostCardLoader />
              <PostCardLoader />
              <PostCardLoader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedsPage;
