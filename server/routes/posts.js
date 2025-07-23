const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Auth middleware for posts
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().populate('postedBy', 'name');
  res.json(posts);
});

// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { content, type } = req.body;
    const post = new Post({
      content,
      type,
      postedBy: req.user.id,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get post by id
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).populate('postedBy', 'name');
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

module.exports = router; 