import { useState } from "react";
import CommentList from "./components/CommentList";
import AddCommentForm from "./components/AddCommentForm";

const dummyComments = [
  {
    id: "1",
    username: "Pavan Kumar",
    content: "Great article!",
    upvotes: 5,
    downvotes: 1,
    replies: [
      {
        id: "1.1",
        username: "Sai Kiran",
        content: "I totally agree! Well written and informative.",
        upvotes: 3,
        downvotes: 0,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    username: "Rohith",
    content: "Interesting perspective. I'd like to learn more about this.",
    upvotes: 3,
    downvotes: 0,
    replies: [
      {
        id: "2.1",
        username: "Raju",
        content: "I'm curious too. Any suggestions for further reading?",
        upvotes: 1,
        downvotes: 0,
        replies: [
          {
            id: "2.1.1",
            username: "Rohith",
            content:
              "@Raju - You might find [this link](https://example.com) helpful!",
            upvotes: 0,
            downvotes: 0,
            replies: [],
          },
        ],
      },
      {
        id: "2.2",
        username: "Sai Kiran",
        content: "This raises some important questions for further discussion.",
        upvotes: 2,
        downvotes: 1,
        replies: [],
      },
    ],
  },
];

function App() {
  const [comments, setComments] = useState(dummyComments);

  const handleAddComment = (parentId, newComment) => {
    setComments((prevComments) => {
      if (!parentId) {
        // This is a top-level comment
        return [newComment, ...prevComments];
      } else {
        // This is a reply
        return handleAddReplyToComments(prevComments, parentId, newComment);
      }
    });
  };

  const handleAddReplyToComments = (comments, parentId, newReply) => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        // Found the parent comment, add the reply
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      } else if (comment.replies) {
        return {
          ...comment,
          replies: handleAddReplyToReplies(comment.replies, parentId, newReply),
        };
      }
      return comment;
    });
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

  const handleAddReply = (parentId, newReply) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies
              ? [...comment.replies, newReply]
              : [newReply], // Check if replies exists
          };
        } else if (comment.replies) {
          // Recursively check replies of replies
          return {
            ...comment,
            replies: handleAddReplyToReplies(
              comment.replies,
              parentId,
              newReply
            ),
          };
        }
        return comment;
      })
    );
  };

  const handleAddReplyToReplies = (replies, parentId, newReply) => {
    return replies.map((reply) => {
      if (reply.id === parentId) {
        return {
          ...reply,
          replies: reply.replies ? [...reply.replies, newReply] : [newReply],
        };
      } else if (reply.replies) {
        return {
          ...reply,
          replies: handleAddReplyToReplies(reply.replies, parentId, newReply),
        };
      }
      return reply;
    });
  };

  return (
    <div className="comments-section">
      <h1>Comments</h1>
      <AddCommentForm addComment={handleAddComment} />
      <CommentList
        comments={comments}
        handleEditComment={handleEditComment}
        handleDeleteComment={handleDeleteComment}
        onAddReply={handleAddReply}
      />
      {/* Placeholder for AddCommentForm */}
    </div>
  );
}

export default App;
