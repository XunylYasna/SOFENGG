const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
var fs = require("fs");
const file = "config\\settings.json"


router.get('/', (req, res) => {
    // Reading JSON
    let jsonData = JSON.parse(fs.readFileSync(file))
    let heading = jsonData.heading
    let poNumber = jsonData.poNumber
    let prfNumber = jsonData.poNumber

    res.render("headings.hbs",
        {
            layout: 'dashboardLayout',
            heading,
            poNumber,
            prfNumber
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

    res.redirect("/headings");
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

    res.redirect("/headings");
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

    res.redirect("/headings");
});

router.get('/cancel', (req, res) => {
    res.redirect("/headings");
})


module.exports = router;
