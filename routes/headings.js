const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')


// ROUTE FOR THE MAP AND POSTS



// Displaying post on Map
router.get('/', (req, res) => {
    res.render('dashboard')
})
