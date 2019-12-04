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
    let prfNumber = jsonData.poNumber
    // Writing JSON
    fs.writeFileSync(file, jsonData);

    res.render("headings.hbs",
        {
            heading: newHeading,
            poNumber,
            prfNumber

        })
});

router.post('/savepo', (req, res) => {
    // Reading JSON
    let jsonData = JSON.parse(fs.readFileSync(file))
    let heading = jsonData.heading
    let newPONum = req.body.poNumber;
    jsonData.poNumber = newPONum;
    let prfNumber = jsonData.prfNumber

    // Writing JSON
    fs.writeFileSync(file, jsonData);

    res.render("headings.hbs",
        {
            heading,
            poNumber: newPONum,
            prfNumber
        })
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
    fs.writeFileSync(file, jsonData);

    res.render("headings.hbs",
        {
            heading,
            poNumber,
            prfNumber: newPRFNum
        })
});

router.get('/cancel', (req, res) => {
    res.redirect("/");
})


module.exports = router;
