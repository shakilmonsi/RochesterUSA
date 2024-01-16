import React, { useState, useEffect } from 'react';


const CommitMent = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', text: '' });

  // Load comments from local storage on component mount
  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // Save comments to local storage whenever comments change
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, newComment]);
    setNewComment({ name: '', text: '' });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
<h1>COMMENTBOX</h1>


      <div>
        {comments.map((comment, index) => (
          <div key={index} className="mb-2">
            <strong>{comment.name}</strong>: {comment.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleFormSubmit} className="mt-4">
        <input
          type="text"
          placeholder="Your Name"
          value={newComment.name}
          onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <textarea
          placeholder="Add a comment..."
          value={newComment.text}
          onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
          className="p-2 mt-2 border rounded w-full"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};





export default CommitMent;