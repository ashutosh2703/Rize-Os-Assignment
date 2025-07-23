const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  txHash: { type: String, required: true },
  amount: { type: Number, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.model('Payment', PaymentSchema); 