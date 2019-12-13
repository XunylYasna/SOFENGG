const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')


// ROUTE FOR THE MAP AND POSTS



// Displays dashboard
router.get('/', (req, res) => {
  res.render('login')
})

module.exports = router;
