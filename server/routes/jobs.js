const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

// Get all jobs, filter by skill/location
router.get('/', async (req, res) => {
  const { skill, location } = req.query;
  const filter = {};
  if (skill) filter.skills = skill;
  if (location) filter.location = location;
  const jobs = await Job.find(filter).populate('postedBy', 'name');
  res.json(jobs);
});

// Create job
router.post('/', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).json(job);
});

// Get job by id
router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id).populate('postedBy', 'name');
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

// Job match score (stub logic)
router.post('/match', async (req, res) => {
  const { userSkills, jobDescription } = req.body;
  // Dummy match: count overlapping words
  const jobWords = jobDescription ? jobDescription.split(/\W+/) : [];
  const overlap = userSkills.filter(skill => jobWords.includes(skill));
  const score = Math.min(100, overlap.length * 20);
  res.json({ score });
});

// Suggest jobs based on skills (dummy logic)
router.post('/suggest', async (req, res) => {
  const { skills } = req.body;
  const jobs = await Job.find({ skills: { $in: skills } }).limit(5);
  res.json({ jobs });
});

module.exports = router; 