import React from "react";
import Comment from "./Comment.jsx";
function CommentList({
  comments,
  handleEditComment,
  handleDeleteComment,
  onAddReply,
}) {
  return (
    <div className="comment-list mt-8 space-y-4">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onDeleteComment={handleDeleteComment}
          onEditComment={handleEditComment}
          onAddReply={onAddReply}
        />
      ))}
    </div>
  );
}

export default CommentList;
