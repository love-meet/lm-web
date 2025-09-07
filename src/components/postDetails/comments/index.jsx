import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { PostContext } from '../../../context/PostContext';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

const CommentSection = ({ postId }) => {
  const { user } = useAuth();
  const { addComment, replyComment, commentLoading, getPostComments, likeComment, likeReply } = useContext(PostContext);
  const [collapsedComments, setCollapsedComments] = useState(new Set());
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [newReply, setNewReply] = useState('');

  const comments = getPostComments(postId);

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
    addComment(postId, newComment.trim(), (response) => {
      if (response.error) {
        console.error(response.error);
      } else {
        setNewComment('');
      }
    });
  };

 const handleSubmitReply = async (e, commentId) => {
    e.preventDefault();
    if (!newReply.trim()) return;
    replyComment(postId, commentId, newReply.trim(), (response) => {
      if (response.error) {
        console.error(response.error);
      }
      setNewReply('');
      setReplyTo(null);
    });
  };

  return (
    <div className="relative h-full flex flex-col">
      <CommentList
        comments={comments}
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
        likeComment={likeComment}
        likeReply={likeReply}
        postId={postId}
      />
      <CommentInput
        newComment={newComment}
        setNewComment={setNewComment}
        handleSubmitComment={handleSubmitComment}
        user={user}
        commentLoading={commentLoading}
      />
    </div>
  );
};

export default CommentSection;