import React from 'react';
import { Heart, ChevronDown, ChevronUp, Send } from 'lucide-react';

const Comment = ({ comment, isReply = false, collapsedComments, toggleComment, replyTo, setReplyTo, newReply, setNewReply, handleSubmitReply, user, commentLoading, getTimeAgo, likeComment, likeReply, postId }) => {
  const isCollapsed = collapsedComments.has(comment.id);
  const hasReplies = comment.replies && comment.replies.length > 0;
  const liked = comment.likedBy && comment.likedBy.some(u => u.userId === user.userId);

  const handleLike = () => {
    if (isReply) {
      likeReply(postId, comment.commentId, comment.id);
    } else {
      likeComment(postId, comment.id);
    }
  };

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
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-1 text-xs transition-colors ${liked ? 'text-[var(--accent-pink)] ' : 'text-[var(--text-muted)] hover:text-[var(--accent-pink)]'}`}>
              <Heart size={14} className={`${liked ? 'fill-current ' : ''}`} />
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
            <Comment key={reply.id} comment={{...reply, commentId: comment.id}} isReply={true} collapsedComments={collapsedComments} toggleComment={toggleComment} replyTo={replyTo} setReplyTo={setReplyTo} newReply={newReply} setNewReply={setNewReply} handleSubmitReply={handleSubmitReply} user={user} commentLoading={commentLoading} getTimeAgo={getTimeAgo} likeComment={likeComment} likeReply={likeReply} postId={postId}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;