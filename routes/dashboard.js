const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')


// ROUTE FOR THE MAP AND POSTS



// Displaying post on Map
router.get('/', (req, res) => {
    res.render('login')
})

// Adding a post, storing the post to DB
router.get('/co', ensureAuthenticated, (req, res) => {
  res.render('coDashboard')
})

// Adding a post, storing the post to DB
router.get('/manager', ensureAuthenticated, (req, res) => {
  res.render('managerDashboard')
})

// Adding a post, storing the post to DB
router.get('/staff', ensureAuthenticated, (req, res) => {
  res.render('staffDashboard')
})



module.exports = router;
