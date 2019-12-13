const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
var fs = require("fs");
const file = "config\\settings.json"
const User = require("../model/User")



router.post('/', (req, res) => {
    let password = req.body.pw
    let type = 'CO'
    let jsonData = JSON.parse(fs.readFileSync(file))
    let heading = jsonData.heading
    let poNumber = jsonData.poNumber
    let prfNumber = jsonData.prfNumber

    console.log(jsonData)

    User.findOne({ type: type }, function (err, doc) {
        if (err) {
            console.log(err)
        }
        if (doc && password == doc.password) {
            res.render("headings.hbs", {
                layout: 'dashboardLayout',
                heading,
                poNumber,
                prfNumber
            })
        }
        else {
            res.redirect(307, 'dashboard3')
        }
    })
})




router.post('/saveheading', (req, res) => {
    // Reading JSON
    let jsonData = JSON.parse(fs.readFileSync(file))
    let newHeading = req.body.changeheader
    jsonData.heading = newHeading;
    let poNumber = jsonData.poNumber
    let prfNumber = jsonData.prfNumber
    // Writing JSON
    fs.writeFileSync(file, JSON.stringify(jsonData));

    res.redirect(307, '/heading');
});

router.post('/savepo', (req, res) => {
    // Reading JSON
    let jsonData = JSON.parse(fs.readFileSync(file))
    let heading = jsonData.heading
    let newPONum = req.body.poNumber;
    jsonData.poNumber = newPONum;
    let prfNumber = jsonData.prfNumber

    // Writing JSON
    fs.writeFileSync(file, JSON.stringify(jsonData));

    res.redirect(307, "/heading");
});

router.post('/saveprf', (req, res) => {
    // Reading JSON
    // Reading JSON
    let jsonData = JSON.parse(fs.readFileSync(file))
    let heading = jsonData.heading
    let poNumber = jsonData.poNumber
    let newPRFNum = req.body.prfNumber;
    jsonData.prfNumber = newPRFNum


    // Writing JSON
    fs.writeFileSync(file, JSON.stringify(jsonData));

    res.redirect(307, "/heading");
});

router.get('/cancel', (req, res) => {
    res.redirect(307, "/heading");
})


module.exports = router;
