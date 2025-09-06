import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../../../api/axios';
import ContentLoader from 'react-content-loader';
import UserHeader from './UserHeader';
import MediaSection from './MediaSection';
import ActionButtons from './ActionButtons';
import CommentSection from '../../../components/postDetails/CommentSection';

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


export default function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

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
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft size={16} className="text-white" />
            </button>
            <div className='relative '>
              <div className='flex items-center space-x-4'>
                        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[var(--primary-cyan)]">
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
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="max-w-2xl mx-auto p-2 space-y-2">
          <UserHeader post={post} />
          <MediaSection post={post} />
          <div className="space-y-4">
           
            <ActionButtons post={post} />
          </div>
          <CommentSection comments={post.comments || []} post={post} postId={post.postId} />
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
}