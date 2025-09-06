import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, ChevronDown, ChevronUp, Send } from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const CommentSection = ({ comments: initialComments, postId }) => {
  const { user } = useAuth();
  const [collapsedComments, setCollapsedComments] = useState(new Set());
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [newReply, setNewReply] = useState('');
  const [comments, setComments] = useState(initialComments || []);
  const [commentLoading, setCommentLoading] = useState(false);
  const commentsEndRef = useRef(null);

  useEffect(() => {
    setComments(initialComments || []);
    const newCollapsed = new Set();
    (initialComments || []).forEach(comment => {
      if (comment.replies && comment.replies.length > 0) {
        newCollapsed.add(comment.id);
      }
    });
    setCollapsedComments(newCollapsed);
  }, [initialComments]);

  // useEffect(() => {
  //   // Scroll to bottom when comments update
  //   if (commentsEndRef.current) {
  //     commentsEndRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [comments]);

  const toggleComment = (commentId) => {
    const newCollapsed = new Set(collapsedComments);
    if (newCollapsed.has(commentId)) {
      newCollapsed.delete(commentId);
    } else {
      newCollapsed.add(commentId);
    }
    setCollapsedComments(newCollapsed);
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - commentTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return `${Math.floor(diffInMinutes / 10080)}w ago`;
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setCommentLoading(true);
    try {
      const res = await api.post(`/post/comment/${postId}`, {
        username: user?.username,
        userAvatar: user?.picture || "/assets/male.jpg",
        content: newComment.trim()
      });
      setComments(res.comments);
      setNewComment('');
    } catch (err) {
      console.error(err);
    } finally {
      setCommentLoading(false);
    }
  };

 const handleSubmitReply = async (e, commentId) => {
    e.preventDefault();
    if (!newReply.trim()) return;
    setCommentLoading(true);
    try {
      const res = await api.post(
        `/post/replay-comment/${postId}`,
        { 
          commentId,
          username: user?.username,
          userAvatar: user?.picture || "/assets/male.jpg",
          content: newReply.trim()
        }
      );
      setComments(comments =>
        comments.map(c =>
          c.id === commentId ? { ...c, replies: res.replies } : c
        )
      );
      setNewReply('');
      setReplyTo(null);
    } catch (err) {
      console.error(err);
    } finally {
      setCommentLoading(false);
    }
  };

  return (
    <div className="relative h-full flex flex-col">
      {/* Comments List */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-20">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            collapsedComments={collapsedComments}
            toggleComment={toggleComment}
            replyTo={replyTo}
            setReplyTo={setReplyTo}
            newReply={newReply}
            setNewReply={setNewReply}
            handleSubmitReply={handleSubmitReply}
            user={user}
            commentLoading={commentLoading}
            getTimeAgo={getTimeAgo}
          />
        ))}
        <div ref={commentsEndRef} />
      </div>

      <form
        onSubmit={handleSubmitComment}
        className="fixed bottom-0 left-0 right-0 bg-[var(--bg-secondary)]/90 backdrop-blur-lg border-t border-white/10 px-4 py-3 flex items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--primary-cyan)] flex-shrink-0">
          <img
            src={user?.picture || "/assets/male.jpg"}
            alt="Your avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-[var(--bg-primary)]/50 border border-white/20 rounded-full px-4 py-2 text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-cyan)] text-sm"
          disabled={commentLoading}
        />
        <button
          type="submit"
          disabled={!newComment.trim() || commentLoading}
          className="p-2 bg-gradient-to-r from-[var(--primary-cyan)] to-[var(--primary-blue)] text-white rounded-full font-medium hover:from-[var(--primary-cyan)]/80 hover:to-[var(--primary-blue)]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default CommentSection;

const CommentItem = ({ comment, isReply = false, collapsedComments, toggleComment, replyTo, setReplyTo, newReply, setNewReply, handleSubmitReply, user, commentLoading, getTimeAgo }) => {
  const isCollapsed = collapsedComments.has(comment.id);
  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className={`${isReply ? 'ml-8 border-l-2 border-[var(--primary-cyan)]/30 pl-4' : ''}`}>
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--primary-cyan)]/50 flex-shrink-0">
          <img 
            src={comment.userAvatar || "/assets/default-profile.jpg"} 
            alt={comment.username}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-[var(--bg-secondary)]/80 rounded-2xl px-4 py-3 backdrop-blur-sm border border-white/10">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-white font-semibold text-sm">{comment.username}</span>
              <span className="text-[var(--text-muted)] text-xs">{getTimeAgo(comment.timestamp)}</span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {comment.content}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-2 ml-4">
            <button className="flex items-center space-x-1 text-[var(--text-muted)] hover:text-[var(--accent-pink)] transition-colors text-xs">
              <Heart size={14} />
              <span>{comment.likes || 0}</span>
            </button>
            
            {!isReply && (
              <button 
                onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                className="text-[var(--text-muted)] hover:text-white transition-colors text-xs"
              >
                Reply
              </button>
            )}

            {hasReplies && (
              <button 
                onClick={() => toggleComment(comment.id)}
                className="flex items-center space-x-1 text-[var(--primary-cyan)] hover:text-[var(--accent-cyan)] transition-colors text-xs"
              >
                {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                <span>{isCollapsed ? 'Show' : 'Hide'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}</span>
              </button>
            )}
          </div>

          {replyTo === comment.id && (
            <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="mt-3 ml-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-[var(--primary-cyan)]/50">
                  <img 
                    src={user?.picture || "/assets/default-profile.jpg"} 
                    alt="Your avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="text"
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder={`Reply to ${comment.username}...`}
                  className="flex-1 bg-[var(--bg-primary)]/50 border border-white/20 rounded-full px-4 py-2 text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-cyan)] text-sm"
                />
                <button
                  type="submit"
                  disabled={!newReply.trim() || commentLoading}
                  className="p-2 bg-[var(--primary-cyan)] text-white rounded-full hover:bg-[var(--primary-cyan)]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {hasReplies && !isCollapsed && (
        <div className="space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply={true} collapsedComments={collapsedComments} toggleComment={toggleComment} replyTo={replyTo} setReplyTo={setReplyTo} newReply={newReply} setNewReply={setNewReply} handleSubmitReply={handleSubmitReply} user={user} commentLoading={commentLoading} getTimeAgo={getTimeAgo} />
          ))}
        </div>
      )}
    </div>
  );
};
