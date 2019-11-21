const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')


// ROUTE FOR THE MAP AND POSTS



// Displaying post on Map
router.get('/', (req, res) => {
    res.render('login')
})

// Connects to Atlas DB
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Lynux:<password>@cluster0-isebt.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}).then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err));

router.get('/grossreport', (req, res) => {
  res.render('')
})


module.exports = router;