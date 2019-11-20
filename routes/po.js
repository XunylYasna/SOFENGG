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
        names: names,
        route: route,
        dollar: dollar,
        peso: peso,
        total: total,
        prepared: prepared,
        approved: approved,
        received: received
    })

    newPO.save()
        .then(post => {
            req.flash('success_msg', 'New PO added.')
            res.render("po.hbs", {
                message: "Successfully Saved PO #" + "number"
            })
        })
        .catch(err => {
            console.log(err)

        })

})


module.exports = router;
