const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const PO = require('../model/PO')
const User = require('../model/User')



// ROUTE FOR THE MAP AND POSTS



router.get('/', (req, res) => {
    let type = 'CO'
    let password = 'poop'

    User.find({type:type}, function(err, doc) {
        if(err) {
            console.log(err)
        }

        if(doc){
            var obj = doc
            var stringify = JSON.stringify(obj);
            var x = JSON.parse(stringify)
            console.log(x[0]['password'])
            res.render('prf.hbs', {password:x[0]['password']})
        }
        else{
            console.log('failed')
            res.render('prf.hbs')
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
