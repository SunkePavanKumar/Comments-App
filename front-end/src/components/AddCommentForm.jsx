import React, { useState } from "react";

function AddCommentForm({ addComment }) {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newComment = {
      id: Math.random(),
      username: username,
      content: content,
      upvotes: 0,
      downvotes: 0,
    };

    addComment(newComment);
    setUsername("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="add-comment-form p-4 bg-gray-100 rounded"
    >
      <div className=" flex items-center justify-center gap-3 mb-2">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-center gap-3">
        <label htmlFor="content">Comment:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-center mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
        >
          Add Comment
        </button>
      </div>
    </form>
  );
}

export default AddCommentForm;
