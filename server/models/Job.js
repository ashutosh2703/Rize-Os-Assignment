const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skills: [{ type: String, required: true }],
  budget: { type: Number },
  location: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  txHash: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema); 