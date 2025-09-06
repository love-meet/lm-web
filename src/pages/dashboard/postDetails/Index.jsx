import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Send, X } from 'lucide-react';
import ImageSwiper from '../../../components/postDetails/ImageSwiper';
import CommentSection from '../../../components/postDetails/CommentSection';
import api from '../../../api/axios';
import ContentLoader from 'react-content-loader';

export default function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenType, setFullscreenType] = useState(null); // 'image' or 'video'
  const [fullscreenSrc, setFullscreenSrc] = useState('');
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/post/get-post/${postId}`);
        setPost(res.post); 
      } catch (err) {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  // Video controller logic
  useEffect(() => {
    if (videoRef.current && post?.media?.[0]?.fileType === 'video') {
      videoRef.current.currentTime = 0;
      setVideoPlaying(false);
      setVideoProgress(0);
    }
  }, [post]);

  const handleVideoPlayPause = () => {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.pause();
      setVideoPlaying(false);
    } else {
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  const handleVideoProgress = () => {
    if (videoRef.current) {
      const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(percent || 0);
    }
  };

  const handleVideoSeek = (e) => {
    if (videoRef.current) {
      const rect = e.target.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = clickX / rect.width;
      videoRef.current.currentTime = percent * videoRef.current.duration;
    }
  };

  const openFullscreen = (type, src) => {
    setFullscreenType(type);
    setFullscreenSrc(src);
    setFullscreen(true);
  };

  const closeFullscreen = () => {
    setFullscreen(false);
    setFullscreenSrc('');
    setFullscreenType(null);
    if (videoRef.current) {
      videoRef.current.pause();
      setVideoPlaying(false);
    }
  };

  const getBadgeColor = (badge) => {
    switch ((badge || '').toLowerCase()) {
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

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[var(--bg-primary)] flex items-center justify-center z-50">
        <ContentLoader
          speed={2}
          width={400}
          height={600}
          viewBox="0 0 400 600"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="20" y="20" rx="8" ry="8" width="60" height="60" />
          <rect x="100" y="30" rx="4" ry="4" width="200" height="20" />
          <rect x="100" y="60" rx="4" ry="4" width="120" height="16" />
          <rect x="20" y="100" rx="8" ry="8" width="360" height="240" />
          <rect x="20" y="360" rx="4" ry="4" width="360" height="20" />
          <rect x="20" y="400" rx="4" ry="4" width="360" height="60" />
        </ContentLoader>
      </div>
    );
  }

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

  // Fullscreen modal
  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[9999]">
        <button
          className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white"
          onClick={closeFullscreen}
        >
          <X size={32} />
        </button>
        {fullscreenType === 'image' ? (
          <img src={fullscreenSrc} alt="" className="max-h-[90vh] max-w-[90vw] object-contain" />
        ) : (
          <video
            src={fullscreenSrc}
            controls
            autoPlay
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        )}
      </div>
    );
  }

  // Main content
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
              onClick={() => navigate("/feeds")}
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
                src={post?.user?.userAvatar || "/assets/male.jpg"} 
                alt={post?.user.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <span className="text-white font-semibold text-lg">{post?.user.username}</span>
                <div 
                  className="px-3 py-1 rounded-full text-xs font-bold text-black"
                  style={{ backgroundColor: getBadgeColor(post.badge) }}
                >
                  {post.badge?.toUpperCase()}
                </div>
              </div>
              <p className="text-[var(--text-muted)] text-sm">{getTimeAgo(post.timestamp)}</p>
            </div>
          </div>

          {/* Media Section */}
          <div className="w-full flex items-center justify-center">
            {post.media?.length > 0 && post.media[0].fileType === 'video' ? (
              <div className="relative w-full flex flex-col items-center">
                <video
                  ref={videoRef}
                  src={post.media[0].data}
                  className="w-full max-h-[400px] rounded-lg bg-black"
                  onClick={() => openFullscreen('video', post.media[0].data)}
                  onTimeUpdate={handleVideoProgress}
                  controls={false}
                  onLoadedData={() => setVideoPlaying(false)}
                />
                {/* Custom Controls */}
                <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center px-4">
                  <div
                    className="w-full h-2 bg-gray-700 rounded cursor-pointer"
                    onClick={handleVideoSeek}
                  >
                    <div
                      className="h-2 bg-pink-500 rounded"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>
                  <button
                    className="mt-2 px-4 py-2 bg-white/20 rounded-full text-white font-semibold flex items-center gap-2"
                    onClick={handleVideoPlayPause}
                  >
                    {videoPlaying ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>
            ) : (
              post.media?.length > 0 && post.media[0].fileType === 'image' && (
                <img
                  src={post.media[0].data}
                  alt=""
                  className="w-full max-h-[400px] rounded-lg object-contain cursor-pointer"
                  onClick={() => openFullscreen('image', post.media[0].data)}
                />
              )
            )}
          </div>

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
                <span className="font-medium">{post.comments?.length || 0}</span>
              </button>
              
              <button className="flex items-center space-x-3 px-6 py-3 rounded-full bg-white/10 hover:bg-[var(--primary-purple)]/20 hover:text-[var(--primary-purple)] transition-all duration-300 group">
                <Send size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <CommentSection comments={post.comments || []} postId={post.postId} />
        </div>

        {/* Bottom Padding */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}