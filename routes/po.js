const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')


// ROUTE FOR THE MAP AND POSTS



router.get('/', (req, res) => {
    res.render('po.hbs')
})




module.exports = router;
