const express = require('express');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Stub JWT auth middleware
const auth = (req, res, next) => { req.user = { id: req.headers['x-user-id'] }; next(); };

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Get profile
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Update profile
router.put('/', auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
  res.json(user);
});

// Extract skills (stub AI logic)
router.post('/extract-skills', auth, async (req, res) => {
  const { bio } = req.body;
  // Dummy skill extraction: pick 5 random words
  const words = bio ? bio.split(/\W+/).filter(Boolean) : [];
  const skills = words.slice(0, 5);
  res.json({ skills });
});

// Upload resume and extract skills
router.post('/upload-resume', auth, upload.single('resume'), async (req, res) => {
  // Stub: just use file name as text
  const text = req.file.originalname;
  // Dummy skill extraction
  const words = text.split(/\W+/).filter(Boolean);
  const skills = words.slice(0, 5);
  res.json({ skills, file: req.file.filename });
});

module.exports = router; 