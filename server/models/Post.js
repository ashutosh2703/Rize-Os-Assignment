const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['job', 'social'], default: 'social' },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema); 