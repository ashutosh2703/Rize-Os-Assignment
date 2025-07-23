var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ message: 'Welcome to the Job & Networking Portal API' });
});

module.exports = router;
