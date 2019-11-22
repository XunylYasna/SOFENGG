const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const PO = require('../model/PO')



// ROUTE FOR THE MAP AND POSTS



router.get('/', (req, res) => {
    res.render('po.hbs')
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

    newPO.save()
        .then(post => {
            console.log("PO added sucessfully " + newPO)
            req.flash('success_msg', 'New PO added.')
            res.redirect('/dashboard')
        })
        .catch(err => {
            console.log(err)

        })

})


module.exports = router;
