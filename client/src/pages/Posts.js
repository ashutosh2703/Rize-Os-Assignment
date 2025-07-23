import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/posts').then(res => setPosts(res.data));
  }, []);

  const handlePost = async e => {
    e.preventDefault();
    try {
      const token = getToken();
      await axios.post('http://localhost:8000/posts', { content, type: 'social' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContent('');
      const res = await axios.get('http://localhost:8000/posts');
      setPosts(res.data);
    } catch (err) {
      setError('Failed to post');
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Social Posts</h2>
      <form onSubmit={handlePost} className="mb-4 flex">
        <input value={content} onChange={e => setContent(e.target.value)} className="flex-1 p-2 border rounded-l" placeholder="Share something..." required />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded-r">Post</button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post._id} className="bg-white p-4 rounded shadow">
            <div className="text-gray-700 mb-2">{post.content}</div>
            <div className="text-sm text-gray-500">By: {post.postedBy?.name || 'Unknown'}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 