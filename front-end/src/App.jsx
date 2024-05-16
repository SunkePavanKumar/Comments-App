import { useEffect, useState } from "react";
import CommentList from "./components/CommentList";
import AddCommentForm from "./components/AddCommentForm";

const dummyComments = [
  {
    id: 1,
    username: "John Doe",
    content: "Great article!",
    upvotes: 5,
    downvotes: 1,
  },
  {
    id: 2,
    username: "Jane Smith",
    content: "Interesting perspective. I'd like to learn more about this.",
    upvotes: 3,
    downvotes: 0,
  },
];

function App() {
  const [comments, setComments] = useState(dummyComments);

  const handleAddComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  const handleEditComment = (id, newContent) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, content: newContent } : comment
      )
    );
  };

  const handleDeleteComment = (id) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  };

  return (
    <div className="comments-section">
      <h1>Comments</h1>
      <AddCommentForm addComment={handleAddComment} />
      <CommentList
        comments={comments}
        handleEditComment={handleEditComment}
        handleDeleteComment={handleDeleteComment}
      />
      {/* Placeholder for AddCommentForm */}
    </div>
  );
}

export default App;
