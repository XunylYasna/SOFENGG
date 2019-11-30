const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')


// ROUTE FOR THE MAP AND POSTS



// Displaying post on Map
router.get('/', (req, res) => {
    res.render('login')
})

router.post('/passwordmanager', (req, res) => {
    let password = req.body.pw
    let type = 'CO'
  
    User.findOne({type:type}, function(err, doc) {
      if(err) {
        console.log(err)
      }
      if(doc && password == doc.password) {
        console.log(doc.password)
        console.log(password)
        res.render("passwordmanager.hbs")
      }
      else{
        res.redirect('dashboard')
      }
    })
  })

module.exports = router;