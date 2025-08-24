import React, { useState } from 'react';
import { Heart, MessageCircle, ChevronDown, ChevronUp, Send } from 'lucide-react';

const CommentSection = ({ comments, postId }) => {
  const [collapsedComments, setCollapsedComments] = useState(new Set());
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [newReply, setNewReply] = useState('');

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

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Handle comment submission here
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  const handleSubmitReply = (e, commentId) => {
    e.preventDefault();
    if (newReply.trim()) {
      // Handle reply submission here
      console.log('New reply to', commentId, ':', newReply);
      setNewReply('');
      setReplyTo(null);
    }
  };

  const CommentItem = ({ comment, isReply = false }) => {
    const isCollapsed = collapsedComments.has(comment.id);
    const hasReplies = comment.replies && comment.replies.length > 0;

    return (
      <div className={`${isReply ? 'ml-8 border-l-2 border-[var(--primary-cyan)]/30 pl-4' : ''}`}>
        <div className="flex items-start space-x-3 mb-3">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--primary-cyan)]/50 flex-shrink-0">
            <img 
              src={comment.userAvatar || "/assets/default-profile.jpg"} 
              alt={comment.username}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Comment Content */}
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

            {/* Comment Actions */}
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

            {/* Reply Input */}
            {replyTo === comment.id && (
              <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="mt-3 ml-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-[var(--primary-cyan)]/50">
                    <img 
                      src="/assets/default-profile.jpg" 
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
                    disabled={!newReply.trim()}
                    className="p-2 bg-[var(--primary-cyan)] text-white rounded-full hover:bg-[var(--primary-cyan)]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Replies */}
        {hasReplies && !isCollapsed && (
          <div className="space-y-3">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} isReply={true} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Comments Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Comments ({comments.length})
        </h3>
      </div>

      {/* New Comment Input */}
      <form onSubmit={handleSubmitComment} className="space-y-3">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--primary-cyan)] flex-shrink-0">
            <img 
              src="/assets/default-profile.jpg" 
              alt="Your avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full bg-[var(--bg-secondary)]/80 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-cyan)] resize-none h-20 backdrop-blur-sm"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-6 py-2 bg-gradient-to-r from-[var(--primary-cyan)] to-[var(--primary-blue)] text-white rounded-full font-medium hover:from-[var(--primary-cyan)]/80 hover:to-[var(--primary-blue)]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8">
          <MessageCircle size={48} className="mx-auto text-[var(--text-muted)] mb-3" />
          <p className="text-[var(--text-muted)]">No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
