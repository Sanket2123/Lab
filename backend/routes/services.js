// routes/services.js
const express = require('express');
const ensureAuthenticated = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => {
  // Fetch and return services
  res.json({ message: 'Services data' });
});

module.exports = router;
