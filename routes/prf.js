const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const PRF = require('../model/PRF')


// ROUTE FOR THE MAP AND POSTS



router.get('/', (req, res) => {
    res.render('prf.hbs')
})


router.post('/add', (req, res) => {

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
        buyer,
        date,
        paxNames: names,
        route,
        particulars,
        airFare,
        travelTax: taxField,
        documentations: documentation,
        usAmount: dollar,
        phpAmount: peso,
        total,
        preparedBy: prepared,
        approvedBy: approved,
        receivedBy: received
    })

    // console.log(req.body)
<<<<<<< Updated upstream
    PRF.find({ prfNumber: this.prfNumber }, function (err, docs) {
        if (!docs.length) {
            console.log('new');
            newPRF.save()
                .then(post => {
                    console.log('PRF Successfully added' + newPRF)
                    req.flash('success_msg', 'New PRF added.')
                    res.redirect('/dashboard')
                })
                .catch(err => {
                    console.log(err)
                })

        } else {
            console.log('updating');
            res.send('updating')
        }
    })





})

router.post('/delete', (req, res) => {

    PRF.deleteOne({ _id: req.body.prfID }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/dashboard')
        }
    });
})

router.get('/view', (req, res) => {
    PRF.findById(req.query.prfID, function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            const { prfNumber, poNumber, buyer, date, paxNames, route, particulars, airFare, travelTax, documentations, usAmount, phpAmount, total, preparedBy, approvedBy, receivedBy } = doc;
            res.render('prf.hbs', {
                prfNumber,
                poNumber,
                buyer,
                date,
                paxNames,
                route,
                particulars,
                airFare,
                travelTax,
                documentations,
                usAmount,
                phpAmount,
                total,
                preparedBy,
                approvedBy,
                receivedBy
            })
        }
    });
=======

    newPRF.save()
        .then(post => {
            console.log('PRF Successfully added' + newPRF)
            req.flash('success_msg', 'New PRF added.')
            res.redirect('/dashboard')
        })
        .catch(err => {
            console.log(err)
        })



>>>>>>> Stashed changes
})

module.exports = router;
