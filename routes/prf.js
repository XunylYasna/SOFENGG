const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const PRF = require('../model/PRF')


// ROUTE FOR THE MAP AND POSTS



router.get('/', (req, res) => {
    res.render('prf.hbs')
})


router.post('/add', (req, res) => {
    // var names = req.body.names,
    // route = req.body.routeField,
    // particulars = req.body.partField,
    // dollar = req.body.dollarField,
    // peso = req.body.pesoField,
    // total = req.body.totalField,
    // prepared = req.body.prepared,
    // approved = req.body.approved,
    // received = req.body.received;

    // const PRFSchema = new mongoose.Schema({
    //     prfNumber: Number,
    //     poNumber: Number,
    //     buyer: String,
    //     date: Date,
    //     paxNames: String,
    //     route: String,
    //     particulars: String,
    //     airFare: Number,
    //     travelTax: Number,
    //     documentations: String,
    //     usAmount: Number,
    //     phpAmount: Number,
    //     total: Number,
    //     preparedBy: String,
    //     approvedBy: String,
    //     receivedBy: String
    // })

    const { buyer, date, names, route, particulars, dollar, peso, total, prepared, approved, received } = req.body;

    // console.log(buyer);


    const newPRF = new PRF({
        prfNumber: 1,
        poNumber: 1,
        buyer: buyer,
        date: date,
        paxNames: names,
        route: route,
        particulars,
        dollar,
        peso,
        total,
        prepared,
        approved,
        received
    })

    newPRF.save()
        .then(newPRF => {
            req.flash('success_msg', 'Added PRF#' + newPRF.prfNumber);
            console.log('Added PRF#' + newPRF.prfNumber);
            res.redirect('/')
        })
        .catch(err => console.log(err))


    // res.render("po.hbs", {
    //     buyer,
    //     date,
    //     names: names.replace("|", "\n"),
    //     route,
    //     particulars,
    //     dollar,
    //     peso,
    //     total,
    //     prepared,
    //     approved,
    //     received
    // })
})

router.post('/save', (req, res) => {

    const { prfNumber, poNumber, buyer, date, names, route, particulars, airFare, taxField, documentation, dollar, peso, total, prepared, approved, received } = req.body;



    const newPRF = new PRF({
        prfNumber,
        poNumber,
        airFare,
        taxField,
        documentation,
        buyer: buyer,
        date: date,
        names: names,
        route: route,
        particulars: particulars,
        dollar: dollar,
        peso: peso,
        total: total,
        prepared: prepared,
        approved: approved,
        received: received
    })

    newPRF.save()
        .then(post => {
            req.flash('success_msg', 'New PRF added.')
            res.render("prf.hbs", {
                message: "Successfully Saved PRF #" + "number"
            })
        })
        .catch(err => {
            console.log(err)
        })

})

module.exports = router;
