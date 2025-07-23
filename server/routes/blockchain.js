const express = require('express');
const Payment = require('../models/Payment');
const router = express.Router();

// Log ETH payment
router.post('/log', async (req, res) => {
  const { userId, txHash, amount } = req.body;
  const payment = new Payment({ user: userId, txHash, amount });
  await payment.save();
  res.status(201).json(payment);
});

module.exports = router; 