const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

// Extract skills (stub)
router.post('/extract-skills', (req, res) => {
  const { bio } = req.body;
  const words = bio ? bio.split(/\W+/).filter(Boolean) : [];
  const skills = words.slice(0, 5);
  res.json({ skills });
});

// Suggest jobs (stub)
router.post('/suggest-jobs', async (req, res) => {
  const { skills } = req.body;
  // Dummy: return jobs that match any skill
  const jobs = await Job.find({ skills: { $in: skills } }).limit(5);
  res.json({ jobs });
});

module.exports = router; 