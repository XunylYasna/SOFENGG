const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const PRF = require('../model/PRF')
const User = require('../model/User')
const file = "config\\settings.json"
const fs = require("fs");



// ROUTE FOR THE MAP AND POSTS



router.get('/', (req, res) => {
    //res.render('prf.hbs')
    let type = 'CO'
    let password = 'poop'
    let jsonData = JSON.parse(fs.readFileSync(file))

    const { prfNumber, poNumber, header } = req.body;

    User.find({ type: type }, function (err, doc) {
        if (err) {
            console.log(err)
        }

        if (doc) {
            var obj = doc
            var stringify = JSON.stringify(obj);
            var x = JSON.parse(stringify)
            console.log(x[0]['password'])
            res.render('prf.hbs', {
                password: x[0]['password'],
                prfNumber: jsonData.prfNumber,
                poNumber: jsonData.poNumber,
                header: jsonData.heading
            })
        }
        else {
            console.log('failed')
            res.render('prf.hbs', {
                prfNumber: jsonData.prfNumber,
                poNumber: jsonData.poNumber,
                header: jsonData.heading
            })
        }
    })
})


router.get('/add', (req, res) => {

    let jsonData = JSON.parse(fs.readFileSync(file))

    // const { prfNumber, poNumber, buyer, date, names, route, particulars, dollar, peso, total, prepared, approved, received } = req.body;

    // console.log(buyer);

    PRF.findById(req.query.prfID, function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            const { prfNumber, buyer, date, paxNames, route, particulars, airFare, travelTax, documentations, usAmount, phpAmount, total, preparedBy, approvedBy, receivedBy } = doc;
            res.render('po.hbs', {
                prfNumber,
                poNumber: jsonData.poNumber,
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

    /*
        const newPRF = new PRF({
            prfNumber,
            poNumber,
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
    
                let jsonData = JSON.parse(fs.readFileSync(file))
                jsonDate.prfNumber += 1;
                fs.writeFileSync(file, JSON.stringify(jsonData));
    
                console.log('Added PRF#' + newPRF.prfNumber);
            })
            .catch(err => console.log(err))*/


    /*    res.render("po.hbs", {
            prfNumber,
            poNumber,
            buyer,
            date,
            names,
            route,
            particulars,
            dollar,
            peso,
            total,
            prepared,
            approved,
            received
        })*/
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
    PRF.find({ prfNumber: this.prfNumber }, function (err, docs) {
        if (!docs.length) {
            console.log('new');
            newPRF.save()
                .then(post => {
                    console.log('PRF Successfully added' + newPRF)

                    let jsonData = JSON.parse(fs.readFileSync(file))
                    jsonData.prfNumber += 1;
                    fs.writeFileSync(file, JSON.stringify(jsonData));

                    req.flash('success_msg', 'New PRF added.')
                    res.redirect('back')
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

router.post('/dashboard3', (req, res) => {
    let invalid = 'INVALID'
    PRF.find({}, function (err, prfs) {
        var dataSet = {};

        prfs.forEach(function (prfs) {
            dataSet[prfs._id] = prfs;
        });

        console.log(dataSet)

        res.render("dashboard.hbs", {
            title: 'my other page', layout: 'dashboardLayout',
            dataSet,
            invalid: invalid
        })
    });
})

router.post('/dashboard1', (req, res) => {
    let invalid = ''
    PRF.find({}, function (err, prfs) {
        var dataSet = {};

        prfs.forEach(function (prfs) {
            dataSet[prfs._id] = prfs;
        });

        console.log(dataSet)

        res.render("dashboard.hbs", {
            layout: 'dashboardLayout',
            dataSet,
            invalid: invalid
        })
    });
})


router.post('/delete', (req, res) => {

    let password = req.body.pw
    let type = 'CO'

    User.findOne({ type: type }, function (err, doc) {
        if (err) {
            console.log(err)
        }
        if (doc && password == doc.password) {
            console.log(doc.password)
            console.log(password)

            PRF.deleteOne({ _id: req.body.prfID }, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.redirect(307, '/dashboard1')
                }
            })
        }
        else {
            res.redirect(307, '/dashboard3')
        }
    })
})

router.get('/view', (req, res) => {
    PRF.findById(req.query.prfID, function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            const { prfNumber, poNumber, buyer, date, paxNames, route, particulars, airFare, travelTax, documentations, usAmount, phpAmount, total, preparedBy, approvedBy, receivedBy } = doc;
            res.render('viewPrf.hbs', {
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

    // newPRF.save()
    //     .then(post => {
    //         console.log('PRF Successfully added' + newPRF)
    //         req.flash('success_msg', 'New PRF added.')
    //         res.redirect('/dashboard')
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })

})

module.exports = router;
