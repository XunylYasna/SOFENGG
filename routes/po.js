const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const PO = require('../model/PO')
const User = require('../model/User')
const file = "config\\settings.json"
const fs = require("fs");





// ROUTE FOR THE MAP AND POSTS



router.get('/', (req, res) => {
    let type = 'CO'
    let password = 'poop'
    let jsonData = JSON.parse(fs.readFileSync(file))

    User.find({ type: type }, function (err, doc) {
        if (err) {
            console.log(err)
        }

        if (doc) {
            var obj = doc
            var stringify = JSON.stringify(obj);
            var x = JSON.parse(stringify)
            console.log(x[0]['password'])
            res.render('po.hbs', { password: x[0]['password'],
                                   header: jsonData.heading})
        }
        else {
            console.log('failed')
            res.render('po.hbs', {header: jsonData.heading})
        }
    })
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

            PO.deleteOne({ _id: req.body.poID }, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.redirect(307, '/purchaseorder')
                }
            })
        }
        else {
            res.redirect(307, '/purchaseorder')
        }
    })
})


router.post('/save', (req, res) => {


    const { prfNumber, poNumber, buyer, date, names, route, description, dollar, peso, total, prepared, approved, received } = req.body;

    const newPO = new PO({
        prfNumber,
        poNumber,
        description,
        buyer: buyer,
        date: date,
        paxName: names,
        route: route,
        usAmount: dollar,
        phpAmount: peso,
        total: total,
        preparedBy: prepared,
        approvedBy: approved,
        receivedBy: received
    })

    console.log(newPO)



    newPO.save()
        .then(post => {
            console.log("PO added sucessfully " + newPO)
            req.flash('success_msg', 'New PO added.')

            let jsonData = JSON.parse(fs.readFileSync(file))
            jsonData.poNumber += 1;
            fs.writeFileSync(file, JSON.stringify(jsonData));

            req.flash('success_msg', 'New PRF added.')
            res.redirect('back')
        })
        .catch(err => {
            console.log(err)

        })

})


router.get('/view', (req, res) => {
    PO.findById(req.query.poID, function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            const { prfNumber, poNumber, buyer, date, paxNames, route, description, usAmount, phpAmount, total, preparedBy, approvedBy, receivedBy } = doc;
            res.render('po.hbs', {
                prfNumber,
                poNumber,
                buyer,
                date,
                paxNames,
                route,
                description,
                usAmount,
                phpAmount,
                total,
                preparedBy,
                approvedBy,
                receivedBy
            })
        }
    });
})

module.exports = router;
