import React, { useRef } from 'react';
import Comment from './Comment';

const CommentList = ({ comments, collapsedComments, toggleComment, replyTo, setReplyTo, newReply, setNewReply, handleSubmitReply, user, commentLoading, getTimeAgo, likeComment, likeReply, postId }) => {
  const commentsEndRef = useRef(null);

  return (
    <div className="flex-1 overflow-y-auto space-y-4 pb-20">
      {comments.map((comment) => (
        <Comment
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
          likeComment={likeComment}
          likeReply={likeReply}
          postId={postId}
        />
      ))}
      <div ref={commentsEndRef} />
    </div>
  );
};

export default CommentList;