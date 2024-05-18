import React, { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import CommentList from "./CommentList";

function Comment({ comment, onDeleteComment, onEditComment, onAddReply }) {
  const [upvotes, setUpvotes] = useState(comment.upvotes);
  const [downvotes, setDownvotes] = useState(comment.downvotes);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEditComment(comment.id, editedContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteComment(comment.id);
  };

  const handleUpvote = () => {
    setUpvotes(upvotes + 1);
  };

  const handleDownvote = () => {
    setDownvotes(downvotes + 1);
  };
  return (
    <div className="comment bg-white p-4 rounded shadow border border-gray-200">
      <div className="comment-header flex items-center justify-between mb-2">
        <span className="comment-username font-semibold text-gray-800">
          {comment.username}
        </span>
        <span className="comment-time font-semibold text-gray-800">
          {/* Placeholder for time */}
        </span>
      </div>
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <p className="text-gray-600">{comment.content}</p>
      )}
      {isEditing && <button onClick={handleSave}>Save</button>}
      <div className="comment-actions mt-2 flex space-x-2">
        <button
          className="upvote text-gray-500 hover:text-green-500"
          onClick={handleUpvote}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>{" "}
          {upvotes}
        </button>
        <button
          className="downvote text-gray-500 hover:text-red-500"
          onClick={handleDownvote}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 011.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>{" "}
          {downvotes}
        </button>
        <button
          className="edit text-gray-500 hover:text-blue-500"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="delete text-gray-500 hover:text-red-500"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-blue-500 hover:underline"
        >
          Reply
        </button>
      </div>
      {showReplyForm && (
        <AddCommentForm parentId={comment.id} addComment={onAddReply} />
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-4 mt-2">
          {" "}
          {/* Add left margin for visual nesting */}
          <CommentList
            comments={comment.replies}
            onEditComment={onEditComment}
            onDeleteComment={onDeleteComment}
            onAddReply={onAddReply}
          />
        </div>
      )}
    </div>
  );
}

export default Comment;
