const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
var fs = require("fs");
const file = "config\\headings.txt"


router.get('/', (req, res) => {
    fs.readFile(file, "utf-8", (err, data) => {
        if (err) { console.log(err) }
        res.render("headings.hbs",
            {
                heading: data
            })
    })
})


router.post('/save', (req, res) => {
    fs.writeFile(file, req.body.changeheader, function (err) {

        if (err) {
            console.log(err);
        }

        console.log("The file was saved!");
        res.render("headings.hbs",
            {
                heading: data
            })
    })
});

router.get('/cancel', (req, res) => {
    fs.readFile(file, "utf-8", (err, data) => {
        if (err) { console.log(err) }
        res.render("headings.hbs",
            {
                heading: data
            })
    })
})


module.exports = router;
