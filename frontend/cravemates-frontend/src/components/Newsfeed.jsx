import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Newsfeed = () => {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');

 
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();
   
    const newPost = {
      content: postContent,
      user: 'current-user', 
    };


    setPosts([newPost, ...posts]);
    setPostContent('');
  };

  return (
    <div className="newsfeed">
      <div className="header">
        <input
          type="text"
          placeholder="Search posts..."
          className="search-bar"
        />
        <Link to="/private-messages">
          <button className="private-messages">Private Messages</button>
        </Link>
      </div>

      {/* Post creation area */}
      <form onSubmit={handlePostSubmit}>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button type="submit">Post</button>
      </form>

      {/* Display Posts */}
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <p>{post.user}</p>
            <p>{post.content}</p>
            <span>{new Date(post.created_at).toLocaleString()}</span>
            {/* Display comments, likes, etc. */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newsfeed;
